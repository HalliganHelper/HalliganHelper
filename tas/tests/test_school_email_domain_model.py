from django.db import IntegrityError
import pytest

from tas.models import School, SchoolEmailDomain


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


class TestSchoolEmailDomainModel:

    def test_verbose_name(self):
        expected_name = 'school email domain'
        assert str(SchoolEmailDomain._meta.verbose_name) == expected_name

    def test_verbose_name_plural(self):
        expected_name = 'school email domains'
        assert str(SchoolEmailDomain._meta.verbose_name_plural) == expected_name

    @pytest.mark.django_db
    def test_creation(self, school):
        SchoolEmailDomain.objects.create(domain='example.com', school=school)

    @pytest.mark.django_db
    def test_domains_are_unique(self, school):
        with pytest.raises(IntegrityError):
            SchoolEmailDomain.objects.create(domain='example.com',
                                            school=school)
            SchoolEmailDomain.objects.create(domain='example.com',
                                            school=school)
