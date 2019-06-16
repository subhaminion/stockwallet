from django.db import models
from django.contrib.auth.models import User

class Balance(models.Model):
    user = models.ForeignKey(User, on_delete='CASCADE')
    curr_balance = models.IntegerField()

    def __str__(self):
        return str(self.curr_balance)