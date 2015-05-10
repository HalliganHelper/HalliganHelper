from django.contrib.auth.models import User
from django.utils.timezone import now
from tastypie.test import ResourceTestCase
from provider.oauth2.models import Client, AccessToken
import datetime
from .models import Course, TA, Request, Student


class BasicTestData(object):
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

    def _setup_super_session(self):
        self.api_client.client.login(username=self.super_username,
                                     password=self.password)

    def _setup_basic_session(self):
        self.api_client.client.login(username=self.basic_username,
                                     password=self.password)

    def _break_session(self):
        self.api_client.client.logout()


class CourseResourceTestData(BasicTestData):
    def set_vars(self):
        super(CourseResourceTestData, self).set_vars()
        self.get_url = '/api/v2/course/'
        self.get_single_url = '/api/v2/course/{}/'
        self.authorization_header = ''


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
        expected_keys = ['Name', 'Number', 'department', 'resource_uri', 'id']
        self.assertKeys(clean_response, expected_keys)

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
        expected_keys = ['Name', 'Number', 'department', 'resource_uri', 'id']
        self.assertKeys(clean_response, expected_keys)

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


class TAResourceTestData(BasicTestData):
    def set_vars(self):
        super(TAResourceTestData, self).set_vars()
        self.get_url = '/api/v2/ta/'
        self.get_single_url = '/api/v2/ta/{}/'
        self.authorization_header = ''
        self.ta = TA(usr=self.user)
        self.ta.save()
        self.deactive_ta = TA(usr=self.super_user, active=False)
        self.deactive_ta.save()


class TAResourceSessionTest(TAResourceTestData, ResourceTestCase):
    def setUp(self):
        super(TAResourceTestData, self).setUp()
        self.set_vars()

    def test_get_active_tas_unauthorized(self):
        self._break_session()
        self.assertHttpUnauthorized(self.api_client.get(self.get_url,
                                                        format='json'))

    def test_get_active_tas_basic_user(self):
        self._setup_basic_session()
        response = self.api_client.get(self.get_url,
                                       format='json')
        self.assertHttpOK(response)
        self.assertValidJSONResponse(response)

        clean_response = self.deserialize(response)
        objects = clean_response['objects']
        self.assertEquals(len(objects), 1)

    def test_get_single_ta_unauthorized(self):
        self._break_session()
        response = self.api_client.get(self.get_single_url.format(self.ta.pk),
                                       format='json')
        self.assertHttpUnauthorized(response)

    def test_get_single_ta_basic_user(self):
        self._setup_basic_session()
        response = self.api_client.get(self.get_single_url.format(self.ta.pk),
                                       format='json')
        self.assertHttpOK(response)
        self.assertValidJSONResponse(response)

        ta = self.deserialize(response)
        self.assertKeys(ta, ['active', 'headshot', 'full_name', 'resource_uri'])
        self.assertEqual(ta['headshot'].split('/')[-1],
                         str(self.ta.headshot).split('/')[-1])

        self.assertEqual(ta['full_name'], self.ta.usr.get_full_name())
        self.assertEqual(ta['active'], self.ta.active)


class RequestResourceTestData(BasicTestData):
    def set_vars(self):
        super(RequestResourceTestData, self).set_vars()
        self.get_url = '/api/v2/request/'
        self.single_url = '/api/v2/request/{}/'
        self.authorization_header = ''
        self.ta = TA.objects.create(usr=self.super_user)


class RequestResourceSessionTest(RequestResourceTestData, ResourceTestCase):
    fixtures = ['courses.json']

    def setUp(self):
        super(RequestResourceSessionTest, self).setUp()
        self.set_vars()
        self.s = Student.objects.create(usr=self.user)
        self.second_user = User.objects.create_user('user_two',
                                                    'jim@jim.com',
                                                    'password')
        self.s2 = Student.objects.create(usr=self.second_user)
        self.request = Request.objects.create(course=Course.objects.all()[0],
                                              student=self.s,
                                              question='Dummy Question',
                                              whereLocated='Dummy Location')

    def test_single_request_basic_user(self):
        self._setup_basic_session()
        response = self.api_client.get(self.single_url.format(self.request.pk),
                                       format='json')
        self.assertHttpOK(response)
        self.assertValidJSONResponse(response)
        data = self.deserialize(response)
        expected_keys = ['whenAsked', 'first_name', 'last_name', 'course',
                         'whereLocated', 'question', 'checked_out', 'id',
                         'solved', 'cancelled', 'resource_uri', 'allow_edit',
                         'allow_resolve']

        self.assertKeys(data, expected_keys)

    def test_single_request_unauthenticated(self):
        self._break_session()

        response = self.api_client.get(self.single_url.format(self.request.pk),
                                       format='json')

        self.assertHttpUnauthorized(response)

    def test_get_all_requests_unauthenticated(self):
        self._break_session()
        self.assertHttpUnauthorized(self.api_client.get(self.get_url,
                                                        format='json'))

    def test_get_all_requests_basic_user(self):
        self._setup_basic_session()
        response = self.api_client.get(self.get_url,
                                       format='json')
        self.assertHttpOK(response)
        self.assertValidJSONResponse(response)
        data = self.deserialize(response)
        self.assertEqual(len(data['objects']), Request.objects.all().count())

    def test_unauthorized_cant_change(self):
        self._break_session()
        url = self.single_url.format(self.request.pk)
        new_data = {'question': 'new question'}
        response = self.api_client.patch(url, format='json',
                                         data=new_data)
        self.assertHttpUnauthorized(response)

    def test_non_owner_can_not_update(self):
        self._break_session()
        self.api_client.client.login(username='user_two',
                                     password='password')

        url = self.single_url.format(self.request.pk)
        new_data = {'question': 'should not happen'}
        response = self.api_client.patch(url, format='json',
                                         data=new_data)
        self.assertHttpUnauthorized(response)
        request = Request.objects.get(pk=self.request.pk)
        self.assertNotEqual(request, new_data['question'])

    def test_owner_can_update(self):
        self._break_session()
        person = User.objects.create_user('kate',
                                          'kate@kate.com',
                                          'thisismypassword')
        s = Student.objects.create(usr=person)
        request = Request.objects.create(course=Course.objects.all()[0],
                                         student=s,
                                         question='q',
                                         whereLocated='w')
        self.api_client.client.login(username='kate',
                                     password='thisismypassword')

        url = self.single_url.format(request.pk)
        new_data = {'question': 'new question'}
        response = self.api_client.patch(url, format='json',
                                         data=new_data)
        self.assertHttpAccepted(response)

        modded_request = Request.objects.get(pk=request.pk)
        self.assertEqual(modded_request, request)
        self.assertEqual(modded_request.question, 'new question')

    def test_ta_can_resolve(self):
        self._setup_super_session()
        url = self.single_url.format(self.request.pk)
        data = {
            'solved': True,
            'checked_out': True
        }
        response = self.api_client.patch(url,
                                         format='json',
                                         data=data)
        self.assertHttpAccepted(response)

        modded_request = Request.objects.get(pk=self.request.pk)
        self.assertEqual(modded_request, self.request)
        self.assertEqual(modded_request.solved, True)
        self.assertEqual(modded_request.checked_out, True)
        self.assertAlmostEqual(modded_request.whenSolved,
                               now(),
                               delta=datetime.timedelta(seconds=10))

    def test_owner_can_not_resolve(self):
        self._setup_basic_session()
        request = Request.objects.create(course=Course.objects.all()[0],
                                         student=self.s,
                                         question='Dummy Question',
                                         whereLocated='Dummy Location')

        url = self.single_url.format(request.pk)
        new_data = {'solved': True}
        response = self.api_client.patch(url, format='json',
                                         data=new_data)
        self.assertHttpUnauthorized(response)
        modded_request = Request.objects.get(pk=request.pk)
        self.assertNotEqual(modded_request.solved, True)

    def test_can_not_resolve_again(self):
        rq = Request.objects.create(course=Course.objects.all()[0],
                                    student=self.s,
                                    question='Dummy Question 2',
                                    whereLocated='Dummy Location 2')

        self._setup_super_session()
        response = self.api_client.patch(self.single_url.format(rq.pk),
                                         format='json',
                                         data={'solved': True})

        self.assertHttpAccepted(response)
        first_solved = Request.objects.get(pk=rq.pk).whenSolved

        response = self.api_client.patch(self.single_url.format(rq.pk),
                                         format='json',
                                         data={'solved': True})
        second_solved = Request.objects.get(pk=rq.pk).whenSolved

        self.assertEqual(first_solved, second_solved)

    def test_create_request(self):
        self._setup_basic_session()
        course = Course.objects.first()

        post_data = {
            'question': 'Hello There',
            'whereLocated': 'Up There',
            'course': '/api/v2/course/{}/'.format(course.pk),
            'allow_edit': False
        }

        response = self.api_client.post(self.get_url,
                                        format='json',
                                        data=post_data)

        self.assertHttpCreated(response)

    def test_other_student_cant_edit(self):
        rq = Request.objects.create(course=Course.objects.first(),
                                    student=self.s,
                                    question='Dummy Question 2',
                                    whereLocated='Dummy Location 2')

        self.api_client.client.login(username=self.second_user.username,
                                     password=self.password)
        response = self.api_client.patch(self.single_url.format(rq.pk),
                                         format='json',
                                         data={'whereLocated': 'there'})

        self.assertHttpUnauthorized(response)
