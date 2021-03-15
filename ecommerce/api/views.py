from django.http import JsonResponse

# Create your views here.

def Home(request):
    data = {
        'Course' : 'Django with React(Ecommerce website)',
        'Name':'Keshav R Karanth'
    }
    return JsonResponse(data)