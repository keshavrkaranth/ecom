from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import braintree
# Create your views here.

gateway = braintree.BraintreeGateway(
  braintree.Configuration(
    environment=braintree.Environment.Sandbox,
    merchant_id='dqz5g3dgwgkvc8zd',
    public_key='jncs8q5scmb7jw8y',
    private_key='d2e4a6c093e7c1c4437c372e8c29af33'
  )
)

def validate_user_session(id,token):
    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token==token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

@csrf_exempt
def generate_token(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error':'invalid session,Please login again'})

    return JsonResponse({'clientToken':gateway.client_token.generate(),'sucess':True})

@csrf_exempt
def process_payment(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error':'invalid session,Please login again'})
    nonce_from_client = request.post['paymentMethodNonce']
    amount_from_the_client = request.post['amoount']
    result = gateway.transaction.sale(
        {
            "amount":amount_from_the_client,
            "payment_method_nonce":nonce_from_client,
            'options':{
                "submit_for_settlement": True
            }
        }
    )
    if result.is_success:
        return JsonResponse({
            "Sucess":result.is_success,
            "trasaction":{
                'id':result.transaction.id,
                'amount':result.transaction.amount
            }
        })
    else:
        return JsonResponse({'error':True,'sucess':False})