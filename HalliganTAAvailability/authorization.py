from tastypie.exceptions import Unauthorized
from tastypie.authorization import Authorization


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
