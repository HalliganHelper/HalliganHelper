from django import forms
from imagekit import ImageSpec, register
from imagekit.processors import ResizeToFit
from imagekit.forms import ProcessedImageField


class HeadShot(ImageSpec):
    processors = [ResizeToFit(100, 100)]
    format = 'JPEG'
    options = {'quality': 60}

register.generator('tas:Headshot', HeadShot)


class TAPhotoChangeForm(forms.Form):
    image = ProcessedImageField(spec_id='tas:Headshot')


class ForgotUsernameForm(forms.Form):
    email = forms.EmailField()
