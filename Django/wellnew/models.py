from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, RegexValidator

class CustomUser(AbstractUser):
    username=models.CharField(max_length=100, unique=True, validators=[RegexValidator(regex=r'^[A-Za-z ]+$', message="Name can contain only letters and spaces.")], blank=False, null=False)
    age=models.IntegerField(validators=[MinValueValidator(1)])
    mob_no=models.CharField(max_length=15, unique=True)

class achievements (models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='achievements'
    )
    name=models.CharField(max_length=50) 
    criteria=models.CharField(max_length=50)
    ex=models.TextField()
    photo=models.ImageField(upload_to="achievements/",null=True,blank=True)

class I_record (models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,   
        related_name='illness'
    )
    name=models.CharField(max_length=50) 
    month=models.CharField(max_length=50) 
    intensity=models.CharField(max_length=50) 
    duration=models.IntegerField()

class MoodLabel(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="mood_labels"
    )
    label = models.CharField(max_length=50)
    position = models.PositiveSmallIntegerField()

    class Meta:
        ordering = ["position"]
        constraints = [
            models.UniqueConstraint(
                fields=["user", "position"],
                name="unique_mood_label_position_per_user"
            ),
            models.UniqueConstraint(
                fields=["user", "label"],
                name="unique_mood_label_per_user"
            ),
            models.CheckConstraint(
                condition=models.Q(position__gte=1, position__lte=6),
                name="mood_label_position_1_to_6"
            ),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.label}"

class MoodEntry(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="mood_entries"
    )
    note = models.TextField(blank=True)
    audio = models.FileField(
        upload_to="audio/",
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)


class MoodMeasurement(models.Model):
    mood_entry = models.ForeignKey(
        MoodEntry,
        on_delete=models.CASCADE,
        related_name="measurements"
    )
    mood_label = models.ForeignKey(
        MoodLabel,
        on_delete=models.PROTECT,
        related_name="measurements"
    )
    value = models.PositiveSmallIntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["mood_entry", "mood_label"],
                name="unique_label_per_mood_entry"
            ),
            models.CheckConstraint(
                condition=models.Q(value__gte=0, value__lte=10),
                name="mood_measurement_value_0_to_10"
            ),
        ]
