from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from .models import Order
from .serializer import OrderSerializer






def validate_user_session(id,token):
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesnotExist:
        return False


@csrf_exempt
def add(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({"error":"please re login","code":'1'})
    if request.method == 'POST':
        user_id  = id
        transction_id = request.POST['transaction_id']
        amount = request.POST['amount']
        products = request.POST['products']

        total_product = len(products.split(","[:-1]))
        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(pk=user_id)


        except UserModel.DoesnotExist:
            return JsonResponse({"error": "User doesnot exist"})

        order = Order(user=user,
                      product_name=products,
                      total_products=total_product,
                      transaction_id=transction_id,
                      total_amount=amount)
        order.save()
        return JsonResponse({'sucesss':True,'error':False,'msg':'order placed sucessfully'})

class OrderViewsets(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer
