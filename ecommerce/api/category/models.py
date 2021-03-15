from django.db import models

# Create your models here.

class Catogery(models.Model):
    name = models.CharField(max_length=50,blank=True,null=True)
    description = models.CharField(max_length=255,blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



    def __str__(self):
        return self.name
