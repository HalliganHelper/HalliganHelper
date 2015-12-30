from tas.utils import get_school_admin_group_name


def test_school_admin_group_name():
    assert get_school_admin_group_name('Test School') == 'Test School Admins'
