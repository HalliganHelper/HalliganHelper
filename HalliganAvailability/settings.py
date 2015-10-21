# Django settings for HalliganAvailability project.
import os

PROJECT_ROOT = os.path.join(os.path.dirname(__file__), '..')

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
    'opbeat.contrib.django.middleware.OpbeatAPMMiddleware',
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
    'widget_tweaks',
    'django_extensions',
    'tastypie',
    'provider',
    'provider.oauth2',
    'djangobower',
    'imagekit',
    'manifesto',
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
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': LOG_FORMAT,
            'datefmt': '%d/%b/%Y %H:%M:%S'
        },
        'deprecation': {
            'format': 'DEPRECATION - [%(asctime)s] %(message)s',
            'datefmt': '%d/%b/%Y %H:%M:%S'
        },
        'simple': {
            'format': '[%(levelname)s] %(message)s'
        },
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'django.utils.log.NullHandler',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'deprecation': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
            'formatter': 'deprecation'
        },
        # 'deprecation': {
        #     'level': 'ERROR',
        #     'class': 'logging.FileHandler',
        #     'filename': '../logs/view_deprecation.log',
        #     'formatter': 'deprecation'
        # },
        'exception': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        }
    },
    'loggers': {
        'django.security.DisallowedHost': {
            'handlers': ['null'],
            'propagate': False
        },
        'tas.views': {
            'handlers': ['console'],
            'level': 'DEBUG'
        },
        'sockets': {
            'handlers': ['console'],
            'level': 'DEBUG'
        },
        'computers.views': {
            'handlers': ['console'],
            'level': 'DEBUG'
        },
        'api': {
            'handlers': ['console'],
            'level': 'DEBUG'
        },
        'task': {
            'handlers': ['console', 'exception'],
            'level': 'DEBUG'
        },
        'deprecated_views': {
            'handlers': ['console', 'deprecation'],
            'level': 'DEBUG'
        }
    }
}

BOWER_COMPONENTS_ROOT = os.path.join(PROJECT_ROOT, 'components')

BOWER_INSTALLED_APPS = ('foundation#5.5.2',
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


# DJANGO PIPELINE
INSTALLED_APPS += ('pipeline',)
STATICFILES_STORAGE = 'pipeline.storage.PipelineCachedStorage'

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'djangobower.finders.BowerFinder',
    'pipeline.finders.PipelineFinder',
)

PIPELINE_COMPILERS = (
    'pipeline.compilers.sass.SASSCompiler',
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

BOWER_COMPONENTS = os.path.join(BASE_DIR, '..', 'components',
                                'bower_components')

FOUNDATION_PATH = os.path.join(BOWER_COMPONENTS, 'foundation', 'scss')

PIPELINE_SASS_ARGUMENTS = '--scss --compass -E "UTF-8" -I "{}"' \
    .format(FOUNDATION_PATH)

PIPELINE_CSS = {
    'all_styles': {
        'source_filenames': (
            'HalliganAvailability/scss/extend_foundation.scss',
            os.path.join('pickadate',
                         'lib',
                         'compressed',
                         'themes',
                         'default.css'),
            os.path.join('pickadate',
                         'lib',
                         'compressed',
                         'themes',
                         'default.time.css'),
        ),
        'output_filename': 'css/styles.css',
    }
}

PIPELINE_DISABLE_WRAPPER = True

PIPELINE_JS = {
    'backbone': {
        'source_filenames': (
            'HalliganAvailability/backbone/TastyPie_Backbone_Shim.js',
            'HalliganAvailability/backbone/app.js',
            'HalliganAvailability/backbone/router.js',
            'HalliganAvailability/backbone/models/Lab.js',
            'HalliganAvailability/backbone/models/Computer.js',
            'HalliganAvailability/backbone/models/OfficeHour.js',
            'HalliganAvailability/backbone/models/Request.js',
            'HalliganAvailability/backbone/models/Room.js',
            'HalliganAvailability/backbone/models/Course.js',
            'HalliganAvailability/backbone/collections/Labs.js',
            'HalliganAvailability/backbone/collections/Computers.js',
            'HalliganAvailability/backbone/collections/OfficeHours.js',
            'HalliganAvailability/backbone/collections/Requests.js',
            'HalliganAvailability/backbone/collections/Rooms.js',
            'HalliganAvailability/backbone/views/ComputerView.js',
            'HalliganAvailability/backbone/views/ComputersView.js',
            'HalliganAvailability/backbone/views/LabView.js',
            'HalliganAvailability/backbone/views/LabsView.js',
            'HalliganAvailability/backbone/views/OfficeHourView.js',
            'HalliganAvailability/backbone/views/OfficeHoursView.js',
            'HalliganAvailability/backbone/views/QueueItemView.js',
            'HalliganAvailability/backbone/views/QueueItemsView.js',
            'HalliganAvailability/backbone/views/RoomView.js',
            'HalliganAvailability/backbone/views/RoomsView.js',
            'HalliganAvailability/backbone/views/CourseView.js',
        ),
        'output_filename': 'js/backbone.js',
    },
    'packages': {
        'source_filenames': (
            'js/ws4redis.js',
            os.path.join('jquery.cookie', 'jquery.cookie.js'),
            os.path.join('underscore', 'underscore.js'),
            os.path.join('backbone', 'backbone.js'),
            os.path.join('moment', 'min', 'moment.min.js'),
            os.path.join('livestamp', 'livestamp.min.js'),
            os.path.join('socket.io-client', 'dist', 'socket.io.min.js'),
            os.path.join('pickadate', 'lib', 'compressed', 'picker.js'),
            os.path.join('pickadate', 'lib', 'compressed', 'picker.time.js'),
        ),
        'output_filename': 'js/packages.js'
    },
    'dependencies': {
        'source_filenames': (
            os.path.join('jquery', 'dist', 'jquery.min.js'),
            'modernizr/modernizr.js',
            'fastclick/lib/fastclick.js',
            'foundation/js/foundation.min.js',
            'foundation/js/foundation/foundation.dropdown.js',
            'js/jquery.titlealert.js',
        ),
        'output_filename': 'js/dependencies.js',
    }
}

# Opbeat stuff

INSTALLED_APPS += (
    'opbeat.contrib.django',
)


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
WSGI_APPLICATION = 'ws4redis.django_runserver.application'
WS4REDIS_HEARTBEAT = '--heartbeat--'

STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'staticfiles')
STATIC_URL = '/static/'
MEDIA_ROOT = 'mediafiles/'
MEDIA_URL = '/media/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, '..', 'components', 'bower_components'),

)


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
EMAIL_USE_SSL = True
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
