from tastypie.exceptions import Unauthorized
from tastypie.authorization import Authorization
from .models import TA


class AuthorizationMethods(object):
    def _superuser_or_group(self, object_list, bundle):
        user = bundle.request.user
        if not user.is_superuser or not user.is_active:
            raise Unauthorized("You are not authorized!")

    def _authenticated_active_user(self, object_list, bundle):
        user = bundle.request.user
        if not user.is_authenticated() or not user.is_active:
            raise Unauthorized("You are not authorized!")


class NoEditAuthorization(Authorization, AuthorizationMethods):
    def read_list(self, object_list, bundle):
        self._authenticated_active_user(object_list, bundle)
        return object_list

    def read_detail(self, object_list, bundle):
        self._authenticated_active_user(object_list, bundle)
        return True

    def create_list(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def create_detail(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def update_list(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def update_detail(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def delete_list(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")


class RequestAuthorization(Authorization, AuthorizationMethods):
    def read_list(self, object_list, bundle):
        self._authenticated_active_user(object_list, bundle)
        return object_list

    def read_detail(self, object_list, bundle):
        self._authenticated_active_user(object_list, bundle)
        return True

    def create_list(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def create_detail(self, object_list, bundle):
        self._authenticated_active_user(object_list, bundle)
        return True

    def update_list(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

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

    def delete_list(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")


class OfficeHourAuthorization(Authorization, AuthorizationMethods):
    def _is_active_ta(self, object_list, bundle):
        self._authenticated_active_user(object_list, bundle)
        try:
            is_active = bundle.request.user.ta.active
        except TA.DoesNotExist:
            raise Unauthorized("You are not authorized!")
        if not is_active:
            raise Unauthorized("You are not authorized!")

    def read_list(self, object_list, bundle):
        self._authenticated_active_user(object_list, bundle)
        return object_list

    def read_detail(self, object_list, bundle):
        self._authenticated_active_user(object_list, bundle)
        return True

    def create_list(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def create_detail(self, object_list, bundle):
        self._is_active_ta()
        return True

    def update_list(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def update_detail(self, object_list, bundle):
        if bundle.obj.ta.usr.pk == bundle.request.user.pk:
            return True
        raise Unauthorized("You are not authorized!")

    def delete_list(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")

    def delete_detail(self, object_list, bundle):
        raise Unauthorized("You are not authorized!")
