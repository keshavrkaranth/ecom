from rest_framework import viewsets
from .models import Catogery
from .serializer import CategorySerializer

class CatogeryViewsets(viewsets.ModelViewSet):
    queryset = Catogery.objects.all().order_by('name')
    serializer_class = CategorySerializer