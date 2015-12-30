import pytest
import mock

from django.db import IntegrityError
from django.contrib.auth.models import Group

from tas.models import School


@pytest.fixture
def user(django_user_model):
    user, _ = django_user_model.objects.get_or_create(first_name='first_name',
                                                      last_name='last_name',
                                                      email='test@example.com',
                                                      password='password')
    return user


class TestSchoolModel:

    def test_verbose_name(self):
        assert str(School._meta.verbose_name) == 'school'

    def test_verbose_name_plural(self):
        assert str(School._meta.verbose_name_plural) == 'schools'

    @pytest.mark.django_db
    def test_representations(self, user):
        school = School.objects.create(name='Test School',
                                       administrator=user,
                                       max_course_count=5)

        assert str(school) == 'Test School'

    @pytest.mark.django_db
    def test_no_duplicate_school_names(self, user):
        with pytest.raises(IntegrityError):
            School.objects.create(name='Test School',
                                  administrator=user,
                                  max_course_count=5)
            School.objects.create(name='Test School',
                                  administrator=user,
                                  max_course_count=5)

    @pytest.mark.django_db
    def test_group_created_signal(self, user):
        school = School.objects.create(name='Test School',
                                       administrator=user,
                                       max_course_count=5)
        assert Group.objects.filter(name='Test School Admins').exists()






