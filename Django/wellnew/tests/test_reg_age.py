from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

CustomUser=get_user_model()
REGISTER_URL="/api/User_page/"

class Check_Age(APITestCase):

    def setUp(self):
        self.data={
        "username":"turner",
        "age":23,
        "email":"turner@gmail.com",
        "mob_no":"23456",
        "password":"1234"
    }

    def test_neg_age(self):
        self.data["age"]=-5

        response=self.client.post(REGISTER_URL,self.data,format="json")

        self.assertEqual(response.status_code, 400)
        self.assertEqual(CustomUser.objects.count(), 0)

