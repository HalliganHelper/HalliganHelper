# This is merely a template for the secret.py file that should contain all of
# your secret or device specific settings.


DEBUG = False
TEMPLATE_DEBUG = DEBUG
EMAIL_HOST_USER = 'INSERT_EMAIL_HERE'
EMAIL_HOST_PASSWORD = 'INSERT_EMAIL_PASSWORD_HERE'
EMAIL_HOST = 'INSERT_EMAIL_HOST_HERE'
EMAIL_PORT = 666
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
SECRET_KEY = 'INSERT_SECRET_KEY_HERE'

ALLOWED_HOSTS = ['*']

PIPELINE_ENABLED = False

# Static asset configuration
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'staticfiles')
STATIC_URL = '/static/'
MEDIA_ROOT = 'mediafiles/'
MEDIA_URL = '/media/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, '..', 'components', 'bower_components'),

)

BOWER_COMPONENTS = os.path.join(BASE_DIR, '..', 'components',
                                'bower_components')

FOUNDATION_PATH = os.path.join(BOWER_COMPONENTS, 'foundation',
                               'scss')


# This is a dummy database setup. You'll need to insert your own
# database name and passwords
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'halliganhelper',
        'USER': 'halliganhelper',
        'PASSWORD': 'halliganhelper',
        'HOST': 'localhost'
    }
}


WS4REDIS_CONNECTION = {
    'password': 'some_complicated_password'
}
