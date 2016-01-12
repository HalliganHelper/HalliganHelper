# Django settings for HalliganAvailability project.
import os

PROJECT_ROOT = os.path.join(os.path.dirname(__file__), '..')
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ADMINS = (
    ('Tyler Lubeck', 'Tyler@tylerlubeck.com'),
    ('Tyler Lubeck', 'halliganhelper@tylerlubeck.com'),
)

MANAGERS = ADMINS

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/New_York'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True


# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.request',
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.static',
    'ws4redis.context_processors.default',
)

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)

MIDDLEWARE_CLASSES = (
    'htmlmin.middleware.HtmlMinifyMiddleware',
    'htmlmin.middleware.MarkRequestMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'HalliganAvailability.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'HalliganAvailability.wsgi.application'

TEMPLATE_DIRS = (
    os.path.join(os.path.dirname(__file__), 'templates').replace('\\', '/'),
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    # 'django.contrib.admindocs',
    'computers',
    'tas',
    'registration',
    'django_extensions',
    'djangobower',
    'imagekit',
)

TEST_RUNNER = 'django.test.runner.DiscoverRunner'

SESSION_SERIALIZER = 'django.contrib.sessions.serializers.JSONSerializer'

AUTH_USER_MODEL = 'tas.CustomUser'

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'
    }
}

ACCOUNT_ACTIVATION_DAYS = 7
REGISTRATION_OPEN = True

LOG_FORMAT = '[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s'
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': LOG_FORMAT,
            'datefmt': '%d/%b/%Y %H:%M:%S'
        }
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'logging.NullHandler',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'halliganhelper.log',
            'formatter': 'verbose'
        },
        'authentication_file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'halliganhelper-auth.log',
            'formatter': 'verbose'
        }
    },
    'loggers': {
        'django.security.DisallowedHost': {
            'handlers': ['null'],
            'propagate': False
        },
        'HalliganAvailability': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG'
        },
        'tas': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG'
        },
        'computers': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG'
        },
        'HalliganAvailability.authentication': {
            'handlers': ['console', 'authentication_file'],
            'level': 'DEBUG',
            'propagate': False
        }
    }
}

BOWER_COMPONENTS_ROOT = os.path.join(PROJECT_ROOT, 'components')

BOWER_INSTALLED_APPS = ('foundation-sites#6.1.1',
                        'jquery-placeholder#2.0.8',
                        'modernizr#2.8.3',
                        'jquery#2.1.4',
                        'fastclick#1.0.6',
                        'jquery.cookie#1.4.1',
                        'pickadate#3.5.6',
                        'underscore#1.8.3',
                        'backbone#1.2.3',
                        'moment#2.10.6',
                        'livestamp#1.1.2',
                        )

TASTYPIE_DEFAULT_FORMATS = ['json']

LOGIN_URL = 'login_or_register'
LOGIN_REDIRECT_URL = '/'
BROKER_URL = 'redis://localhost:6379/0'
BROKER_TRANSPORT_OPTIONS = {'visibility_timeout': 10850}


ALLOWED_REGISTRATION_DOMAINS = ('tufts.edu', 'cs.tufts.edu')


# Websocket-for-Redis stuff

INSTALLED_APPS += (
    'ws4redis',
)

WEBSOCKET_URL = '/ws/'
WS4REDIS_PREFIX = 'hh'
TEMPLATE_CONTEXT_PROCESSORS += (
    'ws4redis.context_processors.default',
)
# WSGI_APPLICATION = 'ws4redis.django_runserver.application'
WS4REDIS_HEARTBEAT = '--heartbeat--'


# This is a dummy database setup. You'll need to insert your own
# database name and passwords
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'halliganhelper',
        'USER': 'postgres',
        'PASSWORD': '',
        'HOST': 'localhost'
    }
}

EMAIL_HOST_USER = 'halliganhelper@tylerlubeck.com'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

try:
    from secret import *
except ImportError:
    WS4REDIS_CONNECTION = {
        'password': ''
    }
    DEBUG = False
    TEMPLATE_DEBUG = DEBUG
    EMAIL_HOST_PASSWORD = ''
    SECRET_KEY = 'secret_key'
    ALLOWED_HOSTS = ['*']

if DEBUG:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

if DEBUG:
    pass
    # INSTALLED_APPS += (
    #     'debug_toolbar',
    # )

# Django Rest Framework
INSTALLED_APPS += (
    'rest_framework',
)

DEFAULT_RENDERER_CLASSES = (
    'rest_framework.renderers.JSONRenderer',
)

if DEBUG:
    DEFAULT_RENDERER_CLASSES += (
        'rest_framework.renderers.BrowsableAPIRenderer',
    )

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': DEFAULT_RENDERER_CLASSES
}

# Static Assets
STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'staticfiles')
STATIC_URL = '/static/'
MEDIA_ROOT = 'mediafiles/'
MEDIA_URL = '/media/'

STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, 'assets'),
)

# Django Webpack Loader
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(PROJECT_ROOT, 'webpack-stats.json'),
    },
}

INSTALLED_APPS += (
    'webpack_loader',
)
