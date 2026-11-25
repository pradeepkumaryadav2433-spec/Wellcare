from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

CustomUser=get_user_model()
REGISTER_URL="/api/User_page/"

class Check_password(APITestCase):

    def setUp(self):
        self.data={
        "username":"turner",
        "age":23,
        "email":"turner@gmail.com",
        "mob_no":"23456",
        "password":"1234"
    }

    def test_password(self):
        response=self.client.post(REGISTER_URL, self.data, format="json")

        user=CustomUser.objects.get(username="turner")
        pass1=self.data["password"]

        self.assertNotEqual(user.password, pass1)
        self.assertTrue(user.check_password(pass1), True)