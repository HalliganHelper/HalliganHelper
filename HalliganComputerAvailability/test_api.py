from django.contrib.auth.models import User
from tastypie.test import ResourceTestCase
from .models import Computer


class ComputerResourceSessionTest(ResourceTestCase):
    fixtures = ['computers.json']

    def setUp(self):
        super(ComputerResourceSessionTest, self).setUp()
        self.basic_username = 'john'
        self.password = 'pass'
        self.super_username = 'super'
        self.user = User.objects.create_user(self.basic_username,
                                             'john@example.com',
                                             self.password)

        self.super_user = User.objects.create_superuser(self.super_username,
                                                        'john@example.com',
                                                        self.password)

        self.computer_one = Computer.objects.get(number='116A')
        self.get_url = '/api/v2/computer/'
        self.detail_url = '/api/v2/computer/{0}/'.format(self.computer_one.pk)

        self.put_new_data = {
            'number': '116Z',
            'room_number': 116,
            'status': 'OFF',
            'used_for': 'comp11'
        }

        self.put_exists_data = {
            'number': '116A',
            'room_number': 116,
            'status': 'OFF',
            'used_for': 'comp11'
        }

        put_url = '/api/v2/computer/{0}/'
        self.put_new_url = put_url.format(self.put_new_data['number'])
        self.put_exists_url = put_url.format(self.put_exists_data['number'])

    def _setup_basic_session(self):
        self.api_client.client.login(username=self.basic_username,
                                     password=self.password)

    def _setup_super_session(self):
        self.api_client.client.login(username=self.super_username,
                                     password=self.password)

    def _break_session(self):
        self.api_client.client.logout()

    def _put_exists(self):
        response = self.api_client.put(self.put_exists_url,
                                       data=self.put_exists_data,
                                       format='json')
        return response

    def _put_new(self):
        response = self.api_client.put(self.put_new_url,
                                       data=self.put_new_data,
                                       format='json')
        return response

    def _post_data(self):
        response = self.api_client.post(self.put_exists_url,
                                        data=self.put_exists_data,
                                        format='json')
        return response

    def test_get_list_unauthorized(self):
        self._break_session()
        self.assertHttpUnauthorized(self.api_client.get(self.get_url,
                                                        format='json'))

    def test_get_list_json(self):
        self._setup_basic_session()
        response = self.api_client.get(self.get_url, format='json')
        self.assertValidJSONResponse(response)

        self.assertEqual(len(self.deserialize(response)['objects']),
                         Computer.objects.all().count())

        response_dict = self.deserialize(response)['objects'][0]

        self.assertEqual(response_dict['number'],
                         self.computer_one.number)

        self.assertEqual(response_dict['room_number'],
                         self.computer_one.room_number)

        self.assertEqual(response_dict['status'],
                         self.computer_one.status)

        self.assertEqual(response_dict['used_for'],
                         self.computer_one.used_for)

        self.assertEqual(response_dict['resource_uri'],
                         '/api/v2/computer/{0}/'.format(self.computer_one.pk))

    def test_get_detail_unauthenticated(self):
        self._break_session()
        self.assertHttpUnauthorized(self.api_client.get(self.detail_url,
                                                        format='json'))

    def test_get_detail_json(self):
        self._setup_basic_session()
        response = self.api_client.get(self.detail_url, format='json')
        self.assertValidJSONResponse(response)

        self.assertKeys(self.deserialize(response),
                        ['number', 'room_number', 'status',
                         'used_for', 'last_update', 'resource_uri'])

        self.assertEqual(self.deserialize(response)['number'],
                         self.computer_one.number)

    def test_put_new_computer_unauthorized(self):
        self._break_session()
        response = self._put_new()
        self.assertHttpUnauthorized(response)

    def test_put_exists_computer_unauthorized(self):
        self._break_session()
        response = self._put_exists()
        self.assertHttpUnauthorized(response)

    def test_put_new_computer_basic_user(self):
        self._setup_basic_session()
        response = self._put_new()
        self.assertHttpUnauthorized(response)

    def test_put_exists_computer_basic_user(self):
        self._setup_basic_session()
        response = self._put_exists()
        self.assertHttpUnauthorized(response)

    def test_put_new_computer_super_user(self):
        self._setup_super_session()
        response = self._put_new()
        self.assertHttpCreated(response)

    def test_put_exists_computer_super_user(self):
        self._setup_super_session()
        response = self._put_exists()
        self.assertEqual(response.status_code, 204)  # 204 means No-Content

    def test_post_fails_unauthorized(self):
        self._break_session()
        response = self._post_data()
        self.assertHttpMethodNotAllowed(response)

    def test_post_fails_basic_user(self):
        self._setup_basic_session()
        response = self._post_data()
        self.assertHttpMethodNotAllowed(response)

    def test_post_fails_super_user(self):
        self._setup_super_session()
        response = self._post_data()
        self.assertHttpMethodNotAllowed(response)
