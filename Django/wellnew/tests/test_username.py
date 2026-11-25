from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

CustomUser=get_user_model()
REGISTER_URL="/api/User_page/"

class Check_username(APITestCase):

    def setUp(self):
        self.data={
            "username":"Turner",
            "age":23,
            "email":"abc@gmail.com",
            "mob_no":"12365",
            "password":"1234"
        }

    def test_missing_username(self):
        self.data.pop("username")

        response=self.client.post(REGISTER_URL, self.data, format="json")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(CustomUser.objects.count(), 0)

    def test_blank_spaces(self):
        self.data["username"]="Turner Santure"

        response=self.client.post(REGISTER_URL, self.data, format="json")

        self.assertEqual(response.status_code, 201)

    def test_special_character(self):
        self.data["username"]="Turner@$1"

        response=self.client.post(REGISTER_URL, self.data, format="json")

        self.assertEqual(response.status_code, 201)            