import mock
import pytest


class TestHeadshotName:

    def test_starts_with_headshots(self, test_user):
        from tas.models import determine_headshot_name
        path = determine_headshot_name(test_user.student, '')
        assert path.startswith('headshots/')

    def test_hashes_email_and_pk(self):
        import hashlib
        from tas.models import determine_headshot_name

        email = 'email_address'
        pk = 1
        student = mock.Mock()

        student.user.email = email
        student.user.pk = pk
        hash_string = '{}-{}-headshot'.format(email, pk)
        digest = hashlib.sha224(hash_string).hexdigest()

        path = determine_headshot_name(student, '')

        assert path == 'headshots/{}'.format(digest)


class TestStudentModel:

    def test_verbose_name(self):
        from tas.models import Student
        assert str(Student._meta.verbose_name) == 'student'

    def test_verbose_name_plural(self):
        from tas.models import Student
        assert str(Student._meta.verbose_name_plural) == 'students'

    @pytest.mark.django_db
    def test_student_representations(self, test_school, test_user):
        from tas.models import Student
        student, _  = Student.objects.get_or_create(user=test_user,
                                                    school=test_school)

        assert str(student) == test_user.get_full_name()
        expected_repr = '<Student ({}) at {}>'.format(test_user.get_full_name(),
                                                      id(student))
        assert repr(student) == expected_repr

    @pytest.mark.django_db
    def test_no_courses_initially(self, test_school, test_user):
        from tas.models import Student
        student, _ = Student.objects.get_or_create(user=test_user,
                                                   school=test_school)

        assert student.courses.all().count() == 0

    @pytest.mark.django_db
    def test_no_ta_jobs_initially(self, test_school, test_user):
        from tas.models import Student
        student, _ = Student.objects.get_or_create(user=test_user,
                                                   school=test_school)

        assert student.ta_jobs.all().count() == 0

    @pytest.mark.django_db
    def test_headshot_default_name_initially(self, test_school, test_user):
        from tas.models import Student
        student, _ = Student.objects.get_or_create(user=test_user,
                                                   school=test_school)

        assert student.headshot.name == Student.default_image

    @pytest.mark.django_db
    @mock.patch('tas.models.SchoolEmailDomain')
    def test_create_profile_does_nothing_when_not_new(self, SED, test_user):
        from tas.models import create_student_profile_for_user
        create_student_profile_for_user(test_user, created=False)

        assert not SED.objects.get.called
