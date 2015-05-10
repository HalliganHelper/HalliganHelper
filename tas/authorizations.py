from tastypie.exceptions import Unauthorized
from tastypie.authorization import ReadOnlyAuthorization
from .models import TA
import logging
logger = logging.getLogger('api')


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
        if bundle.obj.student.usr.pk == bundle.request.user.pk:
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
            if bundle.obj.ta.usr.pk == bundle.request.user.pk:
                return True
        except TA.DoesNotExist:
            raise Unauthorized("You are not authorized!")

        raise Unauthorized("You are not authorized!")
