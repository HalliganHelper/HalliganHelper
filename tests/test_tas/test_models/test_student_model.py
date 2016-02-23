import pytest

from tas.models import Student, School


@pytest.fixture
def user(django_user_model):
    user, _ = django_user_model.objects.get_or_create(first_name='first_name',
                                                      last_name='last_name',
                                                      email='test@example.com',
                                                      password='password')
    return user


@pytest.fixture
def school(user):
    school, _ = School.objects.get_or_create(name='Test School',
                                             administrator=user,
                                             max_course_count=10)
    return school


class TestStudentModel:

    def test_verbose_name(self):
        assert str(Student._meta.verbose_name) == 'student'

    def test_verbose_name_plural(self):
        assert str(Student._meta.verbose_name_plural) == 'students'

    @pytest.mark.django_db
    def test_student_representations(self, school, user):
        student = Student.objects.create(user=user,
                                         school=school)

        assert str(student) == user.get_full_name()
        expected_repr = '<Student ({}) at {}>'.format(user.get_full_name(),
                                                      id(student))
        assert repr(student) == expected_repr

    @pytest.mark.django_db
    def test_no_courses_initially(self, school, user):
        student = Student.objects.create(user=user,
                                         school=school)

        assert student.courses.all().count() == 0

    @pytest.mark.django_db
    def test_no_ta_jobs_initially(self, school, user):
        student = Student.objects.create(user=user,
                                         school=school)

        assert student.ta_jobs.all().count() == 0

    @pytest.mark.django_db
    def test_headshot_default_name_initially(self, school, user):
        student = Student.objects.create(user=user,
                                         school=school)

        assert student.headshot.name == Student.default_image
