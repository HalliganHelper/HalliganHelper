import logging
from datetime import timedelta

from django.utils.timezone import now
from django.contrib.auth import authenticate, login

from rest_framework import serializers, validators

from ..models import (School,
                      Course,
                      CustomUser,
                      SchoolEmailDomain,
                      Student,
                      Request,
                      OfficeHour,
                      TA)

from ..utils import get_administrators_for_school

logger = logging.getLogger(__name__)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate_email(self, email):
        if not CustomUser.objects.filter(email=email).exists():
            msg = 'There is no account for the email address {}'
            raise serializers.ValidationError(msg.format(email))

        return email

    def validate_password(self, password):
        email = self.initial_data.get('email')

        # If the email isn't valid, we don't want to bother attempting to
        # to validate the password. But we don't want to bubble the
        # ValidationError for the email inside the password validation,
        # so abort password validation if email validation fails.
        try:
            self.validate_email(email)
        except serializers.ValidationError:
            return

        user = authenticate(email=email, password=password)

        if user is None or not user.is_active:
            msg = 'The email/password combo is invalid'
            raise serializers.ValidationError(msg)

        request = self.context.get('request')
        if request:
            login(request, user)

        return password


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(
        validators=[
            validators.UniqueValidator(
                queryset=CustomUser.objects.all(),
                message='An account with this email already exists'
            )
        ]
    )
    password = serializers.CharField(min_length=7, max_length=255)
    password_confirm = serializers.CharField(min_length=7, max_length=255)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)

    def validate_email(self, email):
        domain = email.split('@')[-1]
        if not SchoolEmailDomain.objects.filter(domain=domain).exists():

            msg = 'There is no school associated with \'{}\'. Please use your '
            msg += 'school email address'

            raise serializers.ValidationError(msg.format(domain))

        return email

    def validate_password_confirm(self, password_confirm):
        password = self.initial_data.get('password')
        if password_confirm != password:
            raise serializers.ValidationError('Your password does not match')

        return password_confirm


class UserSerializer(serializers.ModelSerializer):
    headshot_url = serializers.ImageField(source='student.headshot',
                                          read_only=True)

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'headshot_url',)


class CourseSerializer(serializers.ModelSerializer):
    identifier = serializers.CharField(source='get_identifier')
    active_ta_count = serializers.SerializerMethodField()
    current_request_count = serializers.SerializerMethodField()

    def get_active_ta_count(self, course):
        return OfficeHour.objects.filter(course=course,
                                         end_time__gte=now()).count()

    def get_current_request_count(self, course):
        when_asked_cutoff = now() - timedelta(hours=Request.EXPIRE_IN_HOURS)
        requests = Request.objects.filter(course=course,
                                          solved=False,
                                          cancelled=False,
                                          when_asked__gte=when_asked_cutoff)
        return requests.count()



    class Meta:
        model = Course
        fields = ('id', 'name', 'identifier',
                  'active_ta_count', 'current_request_count',)


class RequestorSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    headshot_url = serializers.ImageField(source='headshot',
                                          read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'headshot_url', 'first_name', 'last_name',)


class OfficeHourSerializer(serializers.ModelSerializer):
    ta = RequestorSerializer(read_only=True)

    class Meta:
        model = OfficeHour
        fields = ('id', 'location', 'start_time', 'end_time', 'ta',)


class RequestSerializer(serializers.ModelSerializer):
    requestor = RequestorSerializer(read_only=True)
    owned_by_me = serializers.SerializerMethodField()
    can_ta_for = serializers.SerializerMethodField()

    def get_owned_by_me(self, student_request):
        web_request = self.context.get('request', None)
        if web_request is None:
            return False

        return web_request.user.student == student_request.requestor

    def get_can_ta_for(self, student_request):
        web_request = self.context.get('request', None)
        if web_request is None:
            return False

        course = student_request.course
        student = web_request.user.student

        return TA.objects.filter(student=student,
                                 course=course,
                                 active=True).exists()

    class Meta:
        model = Request
        fields = ('id', 'question', 'where_located', 'when_asked',
                  'cancelled', 'checked_out', 'solved', 'requestor',
                  'expired', 'owned_by_me', 'can_ta_for',)


class SchoolAdminSerializer(serializers.ModelSerializer):
    headshot_url = serializers.ImageField(source='student.headshot',
                                          read_only=True)
    full_name = serializers.CharField(source='get_full_name',
                                      read_only=True)
    is_head_admin = serializers.SerializerMethodField()

    def get_is_head_admin(self, user):
        return hasattr(user, 'school')

    class Meta:
        model = CustomUser
        fields = ('email', 'headshot_url', 'is_head_admin', 'full_name')


class SchoolSerializer(serializers.ModelSerializer):
    courses = CourseSerializer(many=True, read_only=True)
    administrators = serializers.SerializerMethodField()

    def get_administrators(self, school):
        admins = get_administrators_for_school(school)
        return SchoolAdminSerializer(admins, many=True).data

    class Meta:
        model = School
        fields = ('name', 'administrators', 'courses',)
