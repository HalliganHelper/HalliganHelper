import pytest


class TestCourseModel:

    def test_verbose_name(self):
        from tas.models import Course
        assert str(Course._meta.verbose_name) == 'course'

    def test_verbose_name_plural(self):
        from tas.models import Course
        assert str(Course._meta.verbose_name_plural) == 'courses'

    @pytest.mark.django_db
    def test_representations(self, test_school):
        from tas.models import Course
        course = Course.objects.create(school=test_school,
                                       name='Test Course Representation',
                                       department='TESTS',
                                       number=11)
        assert str(course) == '{}: {}'.format(test_school.name,
                                              'Test Course Representation')

    @pytest.mark.django_db
    def test_get_identifier(self, test_school):
        from tas.models import Course
        course = Course.objects.create(school=test_school,
                                       name='Test Course Identifier',
                                       department='TESTS',
                                       number=11)
        identifier = course.get_identifier()
        assert identifier == 'Tests 11'

    @pytest.mark.django_db
    def test_date_created_auto_updated(self, test_school):
        from tas.models import Course
        from django.utils import timezone
        course = Course.objects.create(school=test_school,
                                       name='Test Course Identifier',
                                       department='TESTS',
                                       number=11)

        assert course.date_created is not None
        assert course.date_created <= timezone.now()

    @pytest.mark.django_db
    def test_ordering(self, test_school):
        from tas.models import Course

        courses = []
        for i in range(10):
            c = Course(school=test_school,
                       name='Test Course {}'.format(i),
                       department='TESTS',
                       number=1)
            courses.append(c)

        other_course = Course(school=test_school,
                              name='Other Test Course',
                              department='A',
                              number=40)
        courses.append(other_course)

        Course.objects.bulk_create(courses)

        assert Course.objects.all().count() == 11
        assert Course.objects.first().name == 'Other Test Course'
