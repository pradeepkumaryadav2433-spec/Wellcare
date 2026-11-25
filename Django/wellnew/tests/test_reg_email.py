from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

Custom_user=get_user_model()
REGISTER_URL="/api/User_page/"

class Check_email(APITestCase):

    def setUp(self):
        self.data={
            "username":"Turner",
            "age":23,
            "email":"turner@gmail.com",
            "mob_no":"234345",
            "password":"1234"
        }

    def test_invalid_email(self):
        self.data["email"]="not-an-email"

        response=self.client.post(REGISTER_URL, self.data, format="json")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(Custom_user.objects.count(), 0)    