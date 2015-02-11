from tastypie.exceptions import Unauthorized
from tastypie.authorization import ReadOnlyAuthorization
from .models import TA
import logging
logger = logging.getLogger('api')


class RequestAuthorization(ReadOnlyAuthorization):

    def create_list(self, object_list, bundle):
        return object_list

    def create_detail(self, object_list, bundle):
        return True

    def update_detail(self, object_list, bundle):
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

    def create_detail(self, object_list, bundle):
        try:
            is_active = bundle.request.user.ta.active
        except TA.DoesNotExist:
            raise Unauthorized("You are not authorized!")
        if not is_active:
            raise Unauthorized("You are not authorized!")
        return True

    def update_detail(self, object_list, bundle):
        try:
            if bundle.obj.ta.usr.pk == bundle.request.user.pk:
                return True
        except TA.DoesNotExist:
            raise Unauthorized("You are not authorized!")

        raise Unauthorized("You are not authorized!")
