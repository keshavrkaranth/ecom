from rest_framework import viewsets
from .models import Product
from .serializer import ProductSerializer

class ProductViewsets(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializer