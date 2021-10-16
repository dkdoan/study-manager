from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
#Users are a one-to-many relationship since one user can have multiple sesesions but one session can only have one user


# Create your models here.
class Sessions(models.Model):
    timeSpent = models.CharField(max_length=30)
    subject = models.CharField(max_length=30)
    date = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.subject



