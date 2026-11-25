from rest_framework import serializers
from .models import CustomUser, achievements, I_record, MoodLabel, MoodEntry, MoodMeasurement
from django.db import transaction

class UserSerializer(serializers.ModelSerializer):
    username=serializers.CharField(min_length=3)
    password=serializers.CharField(write_only=True)
    class Meta:
        model=CustomUser
        fields=['username','email','age','mob_no','password']

    def create(self, validated_data):
        print("CREATE METHOD CALLED")
        user = CustomUser.objects.create_user(
            **validated_data
        )
        return user        

class AchSerializer(serializers.ModelSerializer):
    class Meta:
        model=achievements
        exclude = ['user']

class RecSerializer(serializers.ModelSerializer):
    class Meta:
        model=I_record
        exclude = ['user']


class MoodLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoodLabel
        fields = ["id", "label", "position"]


class MoodConfigSerializer(serializers.Serializer):
    labels = serializers.ListField(
        child=serializers.CharField(
            max_length=50,
            allow_blank=False,
            trim_whitespace=True
        ),
        min_length=1,
        max_length=6
    )

    def validate_labels(self, labels):

        # Prevent duplicates, ignoring capitalization.
        normalized = [label.casefold() for label in labels]

        if len(normalized) != len(set(normalized)):
            raise serializers.ValidationError(
                "Each label must be unique."
            )

        return labels


class MoodMeasurementInputSerializer(serializers.Serializer):
    label_id = serializers.IntegerField(min_value=1)
    value = serializers.IntegerField(min_value=0, max_value=10)


class MoodEntrySerializer(serializers.ModelSerializer):
    measurements = MoodMeasurementInputSerializer(
        many=True,
        write_only=True
    )

    class Meta:
        model = MoodEntry
        fields = [
            "id",
            "note",
            "audio",
            "created_at",
            "measurements",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_measurements(self, measurements):
        request = self.context["request"]

        configured_ids = set(
            MoodLabel.objects.filter(
                user=request.user
            ).values_list("id", flat=True)
        )

        return measurements

    def create(self, validated_data):
        measurements_data = validated_data.pop("measurements")
        request = self.context["request"]

        with transaction.atomic():
            entry = MoodEntry.objects.create(
                user=request.user,
                **validated_data
            )

            MoodMeasurement.objects.bulk_create([
                MoodMeasurement(
                    mood_entry=entry,
                    mood_label_id=item["label_id"],
                    value=item["value"]
                )
                for item in measurements_data
            ])

        return entry

class MoodMeasurementReadSerializer(serializers.ModelSerializer):
    label = serializers.CharField(
        source="mood_label.label",
        read_only=True
    )
    position = serializers.IntegerField(
        source="mood_label.position",
        read_only=True
    )

    class Meta:
        model = MoodMeasurement
        fields = ["label", "position", "value"]


class MoodEntryReadSerializer(serializers.ModelSerializer):
    measurements = MoodMeasurementReadSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = MoodEntry
        fields = [
            "id",
            "note",
            "audio",
            "created_at",
            "measurements",
        ]