from django.db import IntegrityError
import pytest

from tas.models import SchoolEmailDomain


class TestSchoolEmailDomainModel:

    def test_verbose_name(self):
        expected_name = 'school email domain'
        assert str(SchoolEmailDomain._meta.verbose_name) == expected_name

    def test_verbose_name_plural(self):
        expected_name = 'school email domains'
        assert str(SchoolEmailDomain._meta.verbose_name_plural) == expected_name

    @pytest.mark.django_db
    def test_creation(self, test_school):
        SchoolEmailDomain.objects.create(domain='example.com',
                                         school=test_school)

    @pytest.mark.django_db
    def test_domains_are_unique(self, test_school):
        with pytest.raises(IntegrityError):
            SchoolEmailDomain.objects.create(domain='example.com',
                                             school=test_school)
            SchoolEmailDomain.objects.create(domain='example.com',
                                             school=test_school)
