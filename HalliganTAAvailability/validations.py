from django.utils.timezone import now
from tastypie.validation import Validation
from datetime import timedelta
import dateutil


class RequestValidation(Validation):
    def is_valid(self, bundle, request=None):
        if not bundle.data:
            return {'__all__': 'Something is wrong'}

        errors = {}
        question = bundle.data.get('question', None)
        if question is not None and len(question) == 0:
            errors['question'] = 'Please provide a question'

        location = bundle.data.get('whereLocated', None)
        if location is not None and len(location) == 0:
            errors['whereLocated'] = 'Please provide a location'

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
