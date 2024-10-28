from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    giris, profil, duyurular, izinler,
    AnnouncementViewSet, LeaveRequestViewSet, logout_view, raporlar,destek
)

# Router ayarları
router = DefaultRouter()
router.register(r'announcements', AnnouncementViewSet)
router.register(r'leave-requests', LeaveRequestViewSet)

urlpatterns = [
    path('', giris, name='giris'),  # Kök URL için ana sayfa
    path('profil/', profil, name='profil'),
    path('duyurular/', duyurular, name='duyurular'),
    path('izinler/', izinler, name='izinler'),
    path('cikis/', logout_view, name='logout'),  # Çıkış yapma yolu
    path('raporlar/', raporlar,name='raporlar'),
    path('destek/',destek,name='destek'),
    path('api/', include(router.urls)),
]
