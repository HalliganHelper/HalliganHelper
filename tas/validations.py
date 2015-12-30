from django.utils.timezone import now
from tastypie.validation import Validation
from datetime import timedelta
import dateutil
from .models import Request


class RequestValidation(Validation):
    def is_valid(self, bundle, request=None):
        if not bundle.data:
            return {'__all__': 'Something is wrong'}

        errors = {}
        question = bundle.data.get('question', None)
        question_max_length = Request._meta.get_field('question').max_length
        if question is not None:
            if len(question) == 0:
                errors['question'] = 'Please provide a question'
            elif len(question) > question_max_length:
                msg = 'Your question must be less than {} characters'
                errors['question'] = msg.format(question_max_length)

        location = bundle.data.get('where_located', None)
        location_max_length = \
            Request._meta.get_field('where_located').max_length
        if location is not None:
            if len(location) == 0:
                errors['where_located'] = 'Please provide a location'
            elif len(location) > location_max_length:
                errors['where_located'] = msg.format(location_max_length)

        return errors


class OfficeHourValidation(Validation):
    def is_valid(self, bundle, request=None):
        if not bundle.data:
            return {'_all__': 'Something is wrong'}

        errors = {}

        end_time_str = bundle.data.get('end_time', None)
        if end_time_str is None:
            errors['end_time'] = 'Please provide an off duty time'
        else:
            end_time = dateutil.parser.parse(end_time_str)
            if end_time < now() - timedelta(minutes=1):
                errors['end_time'] = 'Please provide an end time in the future'

        location = bundle.data.get('location', None)
        if location is None or len(location) < 1:
            errors['location'] = 'Please provide a location'

        return errors
