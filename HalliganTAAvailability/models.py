from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.core.exceptions import ValidationError
import datetime
from imagekit.admin import AdminThumbnail


def not_empty_string(value):
    print len(value)
    if len(value) == 0:
        raise ValidationError("No value for field")


class Student(models.Model):
    """ A Student is the base user class for the application.
        Every User object has a Student associated with it, and these Students
        are created when the user is registered.
    """
    usr = models.OneToOneField(User)

    def __str__(self):
        return self.usr.first_name + ' ' + self.usr.last_name


admin.site.register(Student)


class Course(models.Model):
    """ A Course is the representation of an academic course.
        Requests and TAs are associated with courses.
    """
    Name = models.CharField(max_length=100,
                            help_text='The name of the course')
    department = models.CharField(max_length=50,
                                  help_text='The department the course belongs to')
    Number = models.IntegerField(help_text='The identifying course number')

    # NOTE: This is not currently used
    students = models.ForeignKey(Student,
                                 blank=True,
                                 null=True,
                                 help_text='A list of students enrolled in the course')

    def __str__(self):
        return '{} {} -- {}'.format(self.department,
                              self.Number,
                              self.Name)


    class Meta:
        ordering = ['department', 'Number']

admin.site.register(Course)


class TAAdmin(admin.ModelAdmin):
    """ An enhancement to the admin interface for TAs.
        Lists the courses they TA for as well as a thumbnail of their headshot
    """

    def list_courses(ta):
        """ Create a CSV of the courses that a TA is registered for """
        courses = map(str, ta.course.all().values_list('Number', flat=True))
        return ', '.join(courses)

    list_courses.short_description = 'Courses'

    list_display = ['__str__', 'active', list_courses, 'headshot']
    headshot = AdminThumbnail(image_field='headshot')


class TAManager(models.Manager):
    """ Enhances the default objects manager for a TA.
        Provides an 'active' query that only returns active TAs
    """
    def active(self):
        """ Returns a queryset of active TAs """
        qs = super(TAManager, self).get_query_set()
        return qs.filter(active=True)


class TA(models.Model):
    """ A representation of TA.
        TAs have the ability to resolve requests and are
        associated with a specific User
    """
    class Meta:
        verbose_name = "Teacher's Assistant"
        verbose_name_plural = "Teacher's Assistants"

    default_image = 'headshots/None/ming.jpg'

    usr = models.OneToOneField(User,
                               help_text='The user the TA is associated with.')
    course = models.ManyToManyField(Course,
                                    help_text='The courses a TA is registered to TA for')
    active = models.BooleanField(default=True,
                                 help_text='Whether or not the TA is currently active')
    headshot = models.ImageField(upload_to='headshots',
                                 default=default_image,
                                 help_text='A headshot to help students identify TAs')
    has_updated_headshot = models.BooleanField(default=False,
                                               help_text='Whether or not the TA has updated their headshot')

    objects = TAManager()

    def __str__(self):
        return self.usr.get_full_name()

    def __repr__(self):
        return self.__str__()

admin.site.register(TA, TAAdmin)


class RequestDisplayManager(models.Manager):
    """Helpful additional queries about Requests."""
    def not_resolved(self):
        """Retrieve a queryset of all queries that have not been resolved
            Does not matter when they were opened
        """
        qs = super(RequestDisplayManager, self).get_query_set()
        return qs.filter(cancelled=False, solved=False)

    def still_open(self, since_when=5):
        """ Retrieve a queryset of all open requests within the last 'since_when' hours.
            since_when defaults to 5
        """
        timeout = datetime.timedelta(hours=since_when)
        return self.get_query_set().filter(whenAsked__gte=now() - timeout,
                                           cancelled=False,
                                           solved=False)


class Request(models.Model):
    """ Requests are the corner stone of this whole shebang.
        They keep track of when a Student requests a TA for a course
    """
    course = models.ForeignKey(Course,
                               help_text='The course the request is for')
    student = models.ForeignKey(Student,
                                help_text='The student who made the request')

    question = models.CharField(max_length=51,
                                validators=[not_empty_string],
                                help_text='The question associated with the request')
    whereLocated = models.CharField(max_length=50,
                                    validators=[not_empty_string],
                                    help_text='Where the user is located')

    whenAsked = models.DateTimeField(help_text='When the request was made')
    cancelled = models.BooleanField(default=False, blank=True,
                                    help_text='Did the student cancel the request?')

    # TODO: What is this for?
    emailed = models.BooleanField(default=False,
                                  help_text='Not really sure why I included this')

    solved = models.BooleanField(default=False,
                                 help_text='Has the request been resolved?')
    whenSolved = models.DateTimeField(blank=True, null=True,
                                      help_text='When the request was resolved')
    who_solved = models.ForeignKey(TA, null=True, blank=True,
                                   help_text='The TA who resolved the request')
    checked_out = models.BooleanField(default=False,
                                      help_text='Has a TA started working on the request?')

    # TODO: Do I still use this?
    timedOut = models.BooleanField(default=False,
                                   help_text='Has the request timed out?')
    objects = RequestDisplayManager()

    def save(self, *args, **kwargs):
        """ Note that whenAsked is set to the current time if
            this is a new request
        """
        if self.pk is None:
            self.whenAsked = now()
        return super(Request, self).save(*args, **kwargs)

    def timeOut(self):
        self.timedOut = True
        self.save()

    def resolutionTime(self):
        if not self.whenSolved:
            return None
        return self.whenSolved - self.whenAsked

    def __str__(self):
        return '{0} - Comp {1}'.format(self.student.usr.first_name,
                                       self.course.Number)

admin.site.register(Request)


class OfficeHourManager(models.Manager):
    """Creates helper queries for OfficeHours. Namely, allows for easy querying
        about who is on duty
    """
    def on_duty(self):
        """Returns currently active office hours"""
        qs = self.get_query_set()
        return qs.filter(start_time__lte=now()).filter(end_time__gte=now())

    def on_duty_for_course(self, course_number):
        """Returns active office hours for the specified course"""
        qs = self.on_duty()
        return qs.filter(course__Number=course_number)


class OfficeHour(models.Model):
    """The representation of an office hour. It's associated with a course and a TA"""
    start_time = models.DateTimeField(help_text='When the TA went on duty')
    end_time = models.DateTimeField(help_text='When the TA goes off duty')
    course = models.ForeignKey(Course,
                               help_text='The course this OfficeHour is associated with')
    ta = models.ForeignKey(TA,
                           help_text='The TA on duty')
    location = models.CharField(max_length=255,
                                help_text='The home base of the TA')
    objects = OfficeHourManager()


admin.site.register(OfficeHour)
