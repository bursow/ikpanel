from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login,authenticate,logout
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Announcement, LeaveRequest
from .serializers import AnnouncementSerializer, LeaveRequestSerializer
from django.http import JsonResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import LeaveRequest
from django.db.models import Count
import calendar

@login_required
def my_leaves(request):
    user = request.user
    # Kullanıcının izinlerini aylık olarak gruplayın
    data = LeaveRequest.objects.filter(user=user).values('start_date__month').annotate(leave_count=Count('id'))
    
    # Veriyi JSON formatında döndürün
    response_data = [
        {
            'month': calendar.month_name[item['start_date__month']],
            'leave_count': item['leave_count']
        }
        for item in data
    ]
    return JsonResponse(response_data, safe=False)


# View fonksiyonları


def giris(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('profil')
        else:
            return render(request, 'home/giris.html', {'error': 'Geçersiz e-posta veya şifre'})
    return render(request, 'home/giris.html')


@login_required
def raporlar(request):
    leave_requests = LeaveRequest.objects.filter(user=request.user)
    return render(request, 'home/rapor.html', {'leave_requests': leave_requests})


@login_required
def profil(request):
    user = request.user
    context = {
        'user': user,
    }
    return render(request, 'home/profil.html', context)

def logout_view(request):
    logout(request)  
    return redirect('giris')  


@login_required
def duyurular(request):
    announcements = Announcement.objects.all()
    return render(request, 'home/duyurular.html', {'announcements': announcements})

@login_required
def izinler(request):
    leave_requests = LeaveRequest.objects.filter(user=request.user)
    return render(request, 'home/izinler.html', {'leave_requests': leave_requests})

# API ViewSet'ler

@login_required
def destek(request):
    return render(request,'home/destek.html')


class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return LeaveRequest.objects.filter(user=user)
        return LeaveRequest.objects.none()
