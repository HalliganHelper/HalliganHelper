from tastypie.exceptions import Unauthorized
from tastypie.authorization import ReadOnlyAuthorization
from .models import TA
import logging
logger = logging.getLogger(__name__)


class RequestAuthorization(ReadOnlyAuthorization):
    """Determines who should be able to create or modify a Request"""

    def create_list(self, object_list, bundle):
        """ Any authenticated user can create a Request """
        return object_list

    def create_detail(self, object_list, bundle):
        """ Any authenticated user can create a Request """
        return True

    def update_detail(self, object_list, bundle):
        """ Only the student who created the request or a TA should be able
        to update the request
        """
        if bundle.obj.student.user.pk == bundle.request.user.pk:
            return True
        try:
            if bundle.request.user.ta.active:
                return True
            else:
                raise Unauthorized("You are not authorized!")
        except TA.DoesNotExist:
            raise Unauthorized("You are not authorized!")
        raise Unauthorized("You are not authorized!")


class OfficeHourAuthorization(ReadOnlyAuthorization):
    """Defines the authorization checks necessary to
        create an OfficeHour object"""

    def create_detail(self, object_list, bundle):
        """Only active TAs are allowed to create a new OfficeHour"""
        try:
            if not bundle.request.user.ta.active:
                raise Unauthorized("You are not authorized!")
        except TA.DoesNotExist:
            raise Unauthorized("You are not authorized!")

        return True

    def update_detail(self, object_list, bundle):
        """ Only the TA that created the OfficeHour can update it"""
        try:
            if bundle.obj.ta.user.pk == bundle.request.user.pk:
                return True
        except TA.DoesNotExist:
            raise Unauthorized("You are not authorized!")

        raise Unauthorized("You are not authorized!")


class UserAuthorization(ReadOnlyAuthorization):
    """Determines if you're allowed to see a user object"""
    def read_detail(self, object_list, bundle):
        return bundle.obj == bundle.request.user

    def read_list(self, object_list, bundle):
        return object_list.filter(pk=bundle.request.user.pk)

    def update_detail(self, object_list, bundle):
        return bundle.obj == bundle.request.user
