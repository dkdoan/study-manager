from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from .forms import UserRegisterForm, UserUpdateForm
from django.contrib.auth.decorators import login_required
# Create your views here.
 
def register(request):

    if request.method == "POST": #if we get a post request
        form = UserRegisterForm(request.POST) #instantiate a form with data
        if form.is_valid():
            form.save() #will add the user to the database
            username = form.cleaned_data.get('username')
            message = messages.success(request, f"welcome {username}! you've sucessfully made an account. you can now sign-in")
            return redirect('login')
    else:
        form = UserRegisterForm #instantiate an empty form
    
    return render(request, 'users/register.html', {'form': form  })



@login_required
def profile(request):


    if request.method == 'POST':
        updateForm = UserUpdateForm(request.POST, instance=request.user)
        context = {"updateForm": updateForm}

        if updateForm.is_valid():
            updateForm.save()
            message = messages.success(request, f"your profile has now been updated!")
            return redirect('profile')

    else:
        updateForm = UserUpdateForm(instance=request.user)
    context = {"updateForm": updateForm}
    return render(request, 'users/profile.html', context) 