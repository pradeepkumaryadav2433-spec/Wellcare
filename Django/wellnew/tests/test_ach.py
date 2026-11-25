from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

CustomUser=get_user_model()
REGISTER_URL="/api/Ach_page/"

class Check_ach(APITestCase):

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
            "name":"I learned django.",
            "criteria":"Project",
            "ex":"It was a long jurney but i made it through."
        }

        self.data_b={
            "name":"I learned react",
            "criteria":"Project",
            "ex":"It felt tricky and complicated at first but i managed to do it."
        }

        response_a=self.client_a.post(REGISTER_URL, self.data_a, format="json")
        response_b=self.client_b.post(REGISTER_URL, self.data_b, format="json")

        self.assertEqual(response_a.data["name"], "I learned django.")    
        

    def test_rec_api(self):

        self.data_a={
            "name":"I learned django.",
            "criteria":"Project",
            "ex":"It was a long jurney but i made it through."
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

    

        