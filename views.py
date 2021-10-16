from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import Sessions
import json
from django.views.generic import ListView
from django.contrib.auth.mixins import LoginRequiredMixin
# Create your views here.


#list of dictionaries containing different users info can be passed in
#posts = [{'author':' 'Danny', 'age': 15}, {'author':'John', 'age': 15}]



def home(request):

    if request.method == 'POST':        
        sessionDict = json.loads(request.body)
        newSession = Sessions()
        newSession.subject = sessionDict['subject']
        newSession.timeSpent = sessionDict['timeSpent']
        newSession.author = request.user    
        newSession.save()


        
    else:
        pass
    return render(request, 'pomodoro/pomodoro_timer.html')

def about(request):
    return render(request, 'pomodoro/pomodoro_about.html')

  

@login_required
def sessions(request):

    context = {'Sessions': Sessions.objects.filter(author=request.user).all()}
    paginate_by = 5    
    
    return render(request, 'pomodoro/sessions.html', context)


class SessionListView(LoginRequiredMixin, ListView):
    model = Sessions
    template_name = 'pomodoro/sessions.html'
    context_object_name = "Sessions"
    paginate_by = 50
    ordering = ['-date_created']

    def get_queryset(self):
        return self.model.objects.filter(author=self.request.user).order_by('-date')