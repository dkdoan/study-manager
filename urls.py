from django.urls import path
from . import views
from .views import SessionListView

urlpatterns = [
    path('', views.home, name="pomodoro-timer"),
    path('about/', views.about, name="pomodoro-about"),
    path('sessions/', SessionListView.as_view()  , name="pomodoro-sessions")
    


]
