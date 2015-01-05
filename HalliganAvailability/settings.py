# Django settings for HalliganAvailability project.
import os
from secret import *

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

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'djangobower.finders.BowerFinder',
    'compressor.finders.CompressorFinder',
)

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.request',
    'django.contrib.auth.context_processors.auth',
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

# TEMPLATE_DIRS = (
#     os.path.join(PROJECT_ROOT, 'templates').replace('\\', '/'),
# )
TEMPLATE_DIRS = (os.path.join(os.path.dirname(__file__), 'templates').replace('\\','/'),)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
    # 'django.contrib.admindocs',
    'HalliganComputerAvailability',
    'HalliganTAAvailability',
    'registration',
    'widget_tweaks',
    'django_extensions',
    'south',
    'tastypie',
    'provider',
    'provider.oauth2',
    'djangobower',
    'compressor',
    'imagekit',
)


SESSION_SERIALIZER = 'django.contrib.sessions.serializers.JSONSerializer'

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


def get_cache():
    import os
    try:
        os.environ['MEMCACHE_SERVERS'] = os.environ['MEMCACHIER_SERVERS'].replace(',', ';')
        os.environ['MEMCACHE_USERNAME'] = os.environ['MEMCACHIER_USERNAME']
        os.environ['MEMCACHE_PASSWORD'] = os.environ['MEMCACHIER_PASSWORD']
        return {
            'default': {
                'BACKEND': 'django_pylibmc.memcached.PyLibMCCache',
                'TIMEOUT': 500,
                'BINARY': True,
                'OPTIONS': {'tcp_nodelay': True}
            }
        }
    except:
        return {
            'default': {
                'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'
            }
        }

CACHES = get_cache()

ACCOUNT_ACTIVATION_DAYS = 7
REGISTRATION_OPEN = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': '[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s',
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
        'exception': {
            'level': 'ERROR',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        }
    },
    'loggers': {
        'HalliganTAAvailability.views': {
            'handlers': ['console'],
            'level': 'DEBUG'
        },
        'sockets': {
            'handlers': ['console'],
            'level': 'DEBUG'
        },
        'HalliganComputerAvailability.views': {
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
    }
}

BOWER_COMPONENTS_ROOT = os.path.join(PROJECT_ROOT, 'components')

BOWER_INSTALLED_APPS = ('foundation#5.3.3',
                        'jquery-placeholder#2.0.8',
                        'modernizr#2.8.3',
                        'jquery#2.1.1',
                        'fastclick#1.0.3',
                        'jquery.cookie#1.4.1')

COMPRESS_PRECOMPILERS = (
    ('text/x-sass', 'sass --compass -E "UTF-8" "{infile}" "{outfile}"'),
    ('text/x-scss', 'sass --scss --compass -E "UTF-8" -I "%s/bower_components/foundation/scss" "{infile}" "{outfile}"' % BOWER_COMPONENTS_ROOT),
)

COMPRESS_CSS_FILTERS = [
    'compressor.filters.cssmin.CSSMinFilter'
]

COMPRESS_JS_FILTERS = [
    'compressor.filters.jsmin.JSMinFilter'
]

# COMPRESS_OFFLINE = True

# PIPELINE_JS = {
#     'backbone': {
#         'source_filenames': (
#             'HalliganComputerAvailability/backbone/models/*',
#             'HalliganComputerAvailability/backbone/collections/*',
#             'HalliganComputerAvailability/backbone/views/*',
#         ),
#         'output_filename': 'js/backbone.js'
#     }
# }

# COMPRESS_URL = '/static/'

TASTYPIE_DEFAULT_FORMATS = ['json']

LOGIN_URL = 'login_or_register'
LOGIN_REDIRECT_URL = '/'
BROKER_URL = 'redis://localhost:6379/0'
BROKER_TRANSPORT_OPTIONS = {'visibility_timeout': 10850}
