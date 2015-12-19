from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from registration.models import RegistrationProfile

from .custom_user_forms import CustomUserChangeForm, CustomUserCreationForm
from .custom_user import CustomUser
from .models import (Student, OfficeHour, Course, Request,
                     School, SchoolEmailDomain)

class MySchoolsOnlyModelAdminMixin(object):
    def get_queryset(self, request):
        qs = super(MySchoolsOnlyModelAdminMixin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        groups = request.user.groups.values_list('name', flat=True)
        school_names = [g.rstrip(' Admins') for g in groups]
        schools = School.objects.filter(name__in=school_names)
        return qs.filter(school__in=schools)


class SchoolEmailDomainInline(admin.TabularInline):
    model = SchoolEmailDomain
    extra = 1


class SchoolAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super(SchoolAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        groups = request.user.groups.values_list('name', flat=True)
        school_names = [g.rstrip(' Admins') for g in groups]
        return qs.filter(name__in=school_names)

    inlines = [
        SchoolEmailDomainInline,
    ]


class CourseAdmin(MySchoolsOnlyModelAdminMixin, admin.ModelAdmin):
    list_filter = (
        ('school', admin.RelatedOnlyFieldListFilter),
    )

    def get_queryset(self, request):
        return super(CourseAdmin, self)\
            .get_queryset(request).prefetch_related('school')

    def formfield_for_foreignkey(self, db_field, request, **kwargs):

        if db_field.name == 'school' and not request.user.is_superuser:
            groups = request.user.groups.values_list('name', flat=True)
            school_names = [g.rstrip(' Admins') for g in groups]
            kwargs['queryset'] = School.objects.filter(name__in=school_names)

        return super(CourseAdmin, self)\
            .formfield_for_foreignkey(db_field, request, **kwargs)


class StudentAdmin(MySchoolsOnlyModelAdminMixin, admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if not request.user.is_superuser:
            groups = request.user.groups.values_list('name', flat=True)
            school_names = [g.rstrip(' Admins') for g in groups]
            schools = School.objects.filter(name__in=school_names)

            if db_field.name == 'school':
                kwargs['queryset'] = schools
            if db_field.name == 'user':
                kwargs['queryset'] = CustomUser.objects.filter(student__school__in=schools)

        return super(StudentAdmin, self)\
            .formfield_for_foreignkey(db_field, request, **kwargs)

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if not request.user.is_superuser:
            groups = request.user.groups.values_list('name', flat=True)
            school_names = [g.rstrip(' Admins') for g in groups]
            schools = School.objects.filter(name__in=school_names)

            if db_field.name == 'courses':
                kwargs['queryset'] = Course.objects.filter(school__in=schools)

        return super(StudentAdmin, self)\
            .formfield_for_manytomany(db_field, request, **kwargs)


class OfficeHourAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super(OfficeHourAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        groups = request.user.groups.values_list('name', flat=True)
        school_names = [g.rstrip(' Admins') for g in groups]
        return qs.filter(course__school__name__in=school_names)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if not request.user.is_superuser:
            groups = request.user.groups.values_list('name', flat=True)
            school_names = [g.rstrip(' Admins') for g in groups]
            schools = School.objects.filter(name__in=school_names)

            if db_field.name == 'course':
                kwargs['queryset'] = Course.objects.filter(school__in=schools)
            if db_field.name == 'ta':
                kwargs['queryset'] = Student.objects.filter(school__in=schools)

        return super(OfficeHourAdmin, self)\
            .formfield_for_foreignkey(db_field, request, **kwargs)


class RequestAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super(RequestAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        groups = request.user.groups.values_list('name', flat=True)
        school_names = [g.rstrip(' Admins') for g in groups]
        return qs.filter(course__school__name__in=school_names)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'who_solved':
            kwargs['queryset'] = \
                Student.objects.filter(ta_jobs__ta__active=True)
        if not request.user.is_superuser:
            groups = request.user.groups.values_list('name', flat=True)
            school_names = [g.rstrip(' Admins') for g in groups]
            schools = School.objects.filter(name__in=school_names)

            if db_field.name == 'course':
                kwargs['queryset'] = Course.objects.filter(school__in=schools)
            if db_field.name == 'requestor':
                kwargs['queryset'] = Student.objects.filter(school__in=schools)
            if db_field.name == 'who_solved':
                kwargs['queryset'] = kwargs['queryset'].filter(school__in=schools)

        return super(RequestAdmin, self)\
            .formfield_for_foreignkey(db_field, request, **kwargs)


class StudentInline(admin.StackedInline):
    model = Student
    max_num = 1
    can_delete = False


class RegistrationProfileInline(admin.StackedInline):
    model = RegistrationProfile
    max_num = 1
    can_delete = False


class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm

    inlines = [StudentInline, RegistrationProfileInline]

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff',
                                    'is_superuser', 'groups',
                                    'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', )})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
         ),
    )

    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

    def get_queryset(self, request):
        qs = super(CustomUserAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        groups = request.user.groups.values_list('name', flat=True)
        school_names = [g.rstrip(' Admins') for g in groups]
        return qs.filter(student__school__name__in=school_names)


admin.site.register(Request, RequestAdmin)
admin.site.register(OfficeHour, OfficeHourAdmin)
# admin.site.register(Student, StudentAdmin)
admin.site.register(School, SchoolAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
