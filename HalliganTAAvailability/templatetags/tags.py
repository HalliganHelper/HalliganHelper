from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.filter(name='gumbify')
@stringfilter
def gumbify(field, data=None):
    """
        data will be in the format "cssClass | type | placeholder".
        The '|' seperator allows to have multiple strings in each item.
    """

    print type(field)
    if data is None:
        print "No Data"
        return field.as_widget()

    arg_list = data.split('|')
    cssClass = ''
    fieldType = ''
    placeholder = ''
    try:
        cssClass = ''.join(arg_list[0])
        fieldType = ''.join(arg_list[1])
        placeholder = ''.join(arg_list[2])
    except IndexError as e:
        #This means that we were not given everything we asked for
        pass

    print field

    return field.as_widget(attr={
        'class': cssClass,
        'type': fieldType,
        'placeholder': placeholder
    })
