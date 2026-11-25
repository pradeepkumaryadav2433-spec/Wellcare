from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import UserView, AchView, RecView, CurrentUserView, DelAccount,MoodEntryView, MoodConfigurationView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router=DefaultRouter()
router.register('User_page', UserView)
router.register('Ach_page', AchView)
router.register('Rec_page', RecView)
router.register('Mood_entries', MoodEntryView, basename='mood-entry')

urlpatterns=[
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/current-user/', CurrentUserView.as_view()),
    path("api/del_account/", DelAccount.as_view()),
    path('api/Mood_configuration/', MoodConfigurationView.as_view(), name='mood-configuration'),
    # path('api/Mood_AI/', moodai_view),
]
