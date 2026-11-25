from rest_framework.viewsets import ModelViewSet
from .models import achievements, I_record, CustomUser, MoodLabel, MoodEntry
from .serializers import UserSerializer, AchSerializer, RecSerializer, MoodLabelSerializer, MoodConfigSerializer, MoodEntrySerializer, MoodEntryReadSerializer
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
import json
# from mood_ai import prepare_mood_data

class UserView(ModelViewSet):
    queryset=CustomUser.objects.all()
    serializer_class=UserSerializer

class AchView(ModelViewSet):
    queryset=achievements.objects.all()
    serializer_class=AchSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return achievements.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RecView(ModelViewSet):
    queryset=I_record.objects.all()
    serializer_class=RecSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return I_record.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

#Username View        

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "username": request.user.username
        })     
    
#Account Deletion View

class DelAccount(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        request.user.delete()
        return Response(
            {"message": "Account deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )


class MoodConfigurationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        labels = MoodLabel.objects.filter(
            user=request.user
        ).order_by("position")

        return Response({
            "configured": labels.exists(),
            "labels": MoodLabelSerializer(
                labels, many=True
            ).data
        })

    def post(self, request):
        # Configuration can be created only once for now.
        if MoodLabel.objects.filter(
            user=request.user
        ).exists():
            return Response(
                {"detail": "Mood labels are already configured."},
                status=status.HTTP_409_CONFLICT
            )

        serializer = MoodConfigSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            labels = [
                MoodLabel(
                    user=request.user,
                    label=label,
                    position=position
                )
                for position, label in enumerate(
                    serializer.validated_data["labels"],
                    start=1
                )
            ]

            MoodLabel.objects.bulk_create(labels)

        saved_labels = MoodLabel.objects.filter(
            user=request.user
        ).order_by("position")

        return Response(
            {
                "configured": True,
                "labels": MoodLabelSerializer(
                    saved_labels, many=True
                ).data
            },
            status=status.HTTP_201_CREATED
        )


class MoodEntryView(ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ["get", "post", "head", "options"]

    def get_queryset(self):
        return (
            MoodEntry.objects
            .filter(user=self.request.user)
            .prefetch_related("measurements__mood_label")
            .order_by("-created_at")
        )

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return MoodEntryReadSerializer
        return MoodEntrySerializer

    def create(self, request, *args, **kwargs):
        data = request.data.dict()

        measurements = data.get("measurements", "[]")

        if isinstance(measurements, str):
            try:
                data["measurements"] = json.loads(measurements)
            except (TypeError, ValueError):
                return Response(
                    {"measurements": ["Invalid JSON."]},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = self.get_serializer(data=data)

        serializer.is_valid(raise_exception=True)
        entry = serializer.save()

        return Response(
            MoodEntryReadSerializer(
                entry, context=self.get_serializer_context()
            ).data,
            status=status.HTTP_201_CREATED
        )

# class moodai_view(ModelViewSet):
#     def moodai(request):
#         entries=MoodEntry.objects.filter(user=request.user)
#         prepared_data=prepare_mood_data(entries)

#         return Response({
#             "message":"Mood Data Processed Successfully.",
#             "data":prepared_data
#         })