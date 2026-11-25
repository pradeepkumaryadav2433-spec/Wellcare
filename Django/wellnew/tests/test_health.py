from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

CustomUser=get_user_model()
REGISTER_URL="/api/Rec_page/"

class Check_health(APITestCase):

    def setUp(self):
        self.user_a=CustomUser.objects.create_user(
            username="Turner",
            age=23,
            email="turner@gmail.com",
            mob_no="123456",
            password="1234"
        )

        self.user_b=CustomUser.objects.create_user(
            username="Santure",
            age=23,
            email="santure@gmail.com",
            mob_no="1234567",
            password="1234"
        )

        #Token generation
        self.token_a=RefreshToken.for_user(self.user_a).access_token
        self.token_b=RefreshToken.for_user(self.user_b).access_token

        #Client Creation
        self.client_a=APIClient()
        self.client_b=APIClient()

        #Client Credentials

        self.client_a.credentials(HTTP_AUTHORIZATION = f"Bearer {self.token_a}")
        self.client_b.credentials(HTTP_AUTHORIZATION=f"Bearer {self.token_b}")

    def test_data_isolation(self):

        self.data_a={
            "name":"Fever",
            "month":"February",
            "intensity":6,
            "duration":3
        }

        self.data_b={
            "name":"Cough",
            "month":"January",
            "intensity":5,
            "duration":4
        }

        response_a=self.client_a.post(REGISTER_URL, self.data_a, format="json")
        response_b=self.client_b.post(REGISTER_URL, self.data_b, format="json")

        self.assertEqual(response_a.data["name"], "Fever")    
        

    def test_rec_api(self):

        self.data_a={
            "name":"Fever",
            "month":"February",
            "intensity":6,
            "duration":3
        }

        response=self.client_a.post(REGISTER_URL, self.data_a, format="json")

        self.assertEqual(response.status_code, 201)

        #Retrieving Data

        response1=self.client_a.get("/api/Rec_page/")

        self.assertEqual(response.status_code, 201)
        print(response1.data)

    def test_unauthorized_access(self):

        self.client=APIClient()

        response=self.client.get("/api/Rec_page/")

        self.assertEqual(response.status_code, 401)  

    

        