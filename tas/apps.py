from django.apps import AppConfig
from django.db.models.signals import post_save

class TAApp(AppConfig):

    name = 'TAs'
    verbose_name = 'HalliganHelper TAs'

    def ready(self):
        # type: () -> None

        # http://stackoverflow.com/questions/31179459/removedindjango19warning-model-doesnt-declare-an-explicit-app-label
        from tas.signals import (
            create_school_admin_group,
            create_student_profile_for_user,
            request_modified,
            office_hour_modified,
        )

        post_save.connect(
            receiver=create_school_admin_group,
            sender=self.get_model('School')
        )

        post_save.connect(
            receiver=create_student_profile_for_user,
            sender=self.get_model('CustomUser')
        )

        post_save.connect(
            receiver=request_modified,
            sender=self.get_model('Request')
        )

        post_save.connect(
            receiver=office_hour_modified,
            sender=self.get_model('OfficeHour')
        )
