

from django.contrib import admin
from .models import Announcement, LeaveRequest, UserProfile



@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'created_at')

@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ('user','start_date', 'end_date', 'status', 'created_at')
    list_filter = ('status', 'user')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'department', 'position', 'join_date')
    search_fields = ('user__username', 'department', 'position')