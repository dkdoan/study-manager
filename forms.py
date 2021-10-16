from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['email', 'username', 'password1', 'password2']


#modelForm allows us to create a form that will update a model

class UserUpdateForm(forms.ModelForm): 
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['email', 'username']

