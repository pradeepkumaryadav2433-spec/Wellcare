from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase

REGISTER_URL="/api/User_page/"
Custom_user=get_user_model()

class Check_register(APITestCase):

    def setUp(self):
        self.data={
            "username":"turner",
            "age":22,
            "email":"turner101@gmail.com",
            "mob_no":"21234",
            "password":"1234"
        }

    def test_register(self):
        response=self.client.post(REGISTER_URL, self.data, format="json")

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Custom_user.objects.filter(username="turner").exists(), True)