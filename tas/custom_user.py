from django.db import models
from django.core.mail import send_mail
from django.utils import timezone
from django.contrib.auth.models import (AbstractBaseUser,
                                        PermissionsMixin,
                                        BaseUserManager)

class CustomUserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **kwargs):
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email,
                          is_staff=is_staff,
                          is_active=True,
                          is_superuser=is_superuser,
                          last_login=now,
                          date_joined=now,
                          **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **kwargs):
        return self._create_user(email, password, False, False, **kwargs)

    def create_superuser(self, email, password=None, **kwargs):
        return self._create_user(email, password, True, True, **kwargs)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('Email Address',
                              max_length=254,
                              unique=True,
                              help_text='User Identifier')


    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    is_staff = models.BooleanField('Staff Status',
                                   default=False,
                                   help_text='Whether or not the user can login to the admin site')
    is_active = models.BooleanField('Active',
                                    default=True,
                                    help_text='If the user is active or not')

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def get_full_name(self):
        return '{} {}'.format(self.first_name,
                            self.last_name)

    def get_short_name(self):
        return '{} {}.'.format(self.first_name,
                             self.last_name[0])

    def email_user(self, subject, message, from_email=None):
        send_mail(subject, message, from_email, [self.email])


