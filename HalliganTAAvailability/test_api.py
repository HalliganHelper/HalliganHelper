from django.test import TestCase
from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from provider.oauth2.models import Client, AccessToken
from .models import Course

class CourseResourceTestData(object):
    def set_vars(self):
        self.basic_username = 'john'
        self.super_username = 'super'
        self.password = 'password'

        self.user = User.objects.create_user(self.basic_username,
                                             'john@example.com',
                                             self.password)

        self.super_user = User.objects.create_superuser(self.super_username,
                                                        'john@example.com',
                                                        self.password)

        self.get_url = '/api/v2/course/'
        self.get_single_url = '/api/v2/course/{}/'
        self.authorization_header = ''

    def _setup_basic_session(self):
        self.api_client.client.login(username=self.basic_username,
                                     password=self.password)

    def _break_session(self):
        self.api_client.client.logout()


class CourseResourceSessionTest(CourseResourceTestData, ResourceTestCase):
    fixtures = ['courses.json']
    def setUp(self):
        super(CourseResourceSessionTest, self).setUp()
        self.set_vars()

    def test_get_all_courses_unauthorized(self):
        self._break_session()
        self.assertHttpUnauthorized(self.api_client.get(self.get_url,
                                                        format='json'))

    def test_get_all_courses_basic_user(self):
        self._setup_basic_session()
        response = self.api_client.get(self.get_url, format='json')
        self.assertHttpOK(response)
        self.assertValidJSONResponse(response)

        clean_response = self.deserialize(response)
        objects = clean_response['objects']
        self.assertEqual(Course.objects.all().count(), len(objects))

    def test_get_single_course_unauthorized(self):
        self._break_session()
        course = Course.objects.all()[0]
        response = self.api_client.get(self.get_single_url.format(course.pk),
                                       format='json')
        self.assertHttpUnauthorized(response)

    def test_get_single_course_basic_user(self):
        self._setup_basic_session()
        course = Course.objects.all()[0]
        response = self.api_client.get(self.get_single_url.format(course.pk),
                                       format='json')
        self.assertHttpOK(response)
        self.assertValidJSONResponse(response)
        clean_response = self.deserialize(response)
        self.assertKeys(clean_response,
                        ['Name', 'Number', 'Professor', 'resource_uri'])

    def test_post_not_allowed_unauthorized(self):
        self._break_session()
        response = self.api_client.post(self.get_url)
        self.assertHttpMethodNotAllowed(response)

    def test_post_not_allowed_basic_user(self):
        self._setup_basic_session()
        response = self.api_client.post(self.get_url)
        self.assertHttpMethodNotAllowed(response)

    def test_put_not_allowed_unathorized(self):
        self._break_session()
        response = self.api_client.put(self.get_url)
        self.assertHttpMethodNotAllowed(response)

    def test_put_not_allowed_basic_user(self):
        self._setup_basic_session()
        response = self.api_client.put(self.get_url)
        self.assertHttpMethodNotAllowed(response)

    def test_patch_not_allowed_unathorized(self):
        self._break_session()
        course = Course.objects.all()[0]
        response = self.api_client.patch(self.get_single_url.format(course.pk),
                                         data={})
        self.assertHttpMethodNotAllowed(response)

    def test_patch_not_allowed_basic_user(self):
        self._setup_basic_session()
        course = Course.objects.all()[0]
        response = self.api_client.patch(self.get_single_url.format(course.pk),
                                         data={})
        self.assertHttpMethodNotAllowed(response)


class CourseResourceTokenTest(CourseResourceTestData, ResourceTestCase):
    fixtures = ['courses.json']
    def setUp(self):
        super(CourseResourceTokenTest, self).setUp()
        self.set_vars()

        self.c = Client(user=self.super_user, name="test client",
                        client_type=1, url='https://www.example.com')
        self.c.save()
        self.client_id = self.c.client_id
        self.client_secret = self.c.client_secret

        self.access_token = AccessToken(user=self.super_user,
                                        client=self.c)
        self.access_token.save()
        header_str = "OAuth {}"
        self.auth_header = header_str.format(self.access_token.token)

    def test_get_all_courses_unauthorized(self):
        self._break_session()
        response = self.api_client.get(self.get_url,
                                       HTTP_AUTHORIZATION='')
        self.assertHttpUnauthorized(response)

    def test_get_all_courses_basic_user(self):
        self._break_session()
        response = self.api_client.get(self.get_url, format='json',
                                       HTTP_AUTHORIZATION=self.auth_header)
        self.assertHttpOK(response)
        self.assertValidJSONResponse(response)

        clean_response = self.deserialize(response)
        objects = clean_response['objects']
        self.assertEqual(Course.objects.all().count(), len(objects))

    def test_get_single_course_unauthorized(self):
        self._break_session()
        course = Course.objects.all()[0]
        response = self.api_client.get(self.get_single_url.format(course.pk),
                                       format='json',
                                       HTTP_AUTHORIZATION='')
        self.assertHttpUnauthorized(response)

    def test_get_single_course_basic_user(self):
        self._break_session()
        course = Course.objects.all()[0]
        response = self.api_client.get(self.get_single_url.format(course.pk),
                                       format='json',
                                       HTTP_AUTHORIZATION=self.auth_header)
        self.assertHttpOK(response)
        self.assertValidJSONResponse(response)
        clean_response = self.deserialize(response)
        self.assertKeys(clean_response,
                        ['Name', 'Number', 'Professor', 'resource_uri'])

    def test_post_not_allowed_unauthorized(self):
        self._break_session()
        response = self.api_client.post(self.get_url,
                                        HTTP_AUTHORIZATION='')
        self.assertHttpMethodNotAllowed(response)

    def test_post_not_allowed_basic_user(self):
        self._break_session()
        response = self.api_client.post(self.get_url,
                                        HTTP_AUTHORIZATION=self.auth_header)
        self.assertHttpMethodNotAllowed(response)

    def test_put_not_allowed_unathorized(self):
        self._break_session()
        response = self.api_client.put(self.get_url,
                                       HTTP_AUTHORIZATION='')
        self.assertHttpMethodNotAllowed(response)

    def test_put_not_allowed_basic_user(self):
        self._break_session()
        response = self.api_client.put(self.get_url,
                                       HTTP_AUTHORIZATION=self.auth_header)
        self.assertHttpMethodNotAllowed(response)

    def test_patch_not_allowed_unathorized(self):
        self._break_session()
        course = Course.objects.all()[0]
        response = self.api_client.patch(self.get_single_url.format(course.pk),
                                         data={},
                                         HTTP_AUTHORIZATION='')
        self.assertHttpMethodNotAllowed(response)

    def test_patch_not_allowed_basic_user(self):
        self._break_session()
        course = Course.objects.all()[0]
        response = self.api_client.patch(self.get_single_url.format(course.pk),
                                         data={},
                                         HTTP_AUTHORIZATION=self.auth_header)
        self.assertHttpMethodNotAllowed(response)
