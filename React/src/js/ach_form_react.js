export const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("access");

        function isTokenExpired(token){

            if (!token){
                return true;
            }

            const payload=JSON.parse(atob(token.split(".")[1]));
            const expTime=payload.exp*1000;

            return Date.now()>=expTime
        }

        async function refreshAccessToken(){
            const refresh = localStorage.getItem("refresh");

            if (!refresh){
                return null;
            }

            const response=await fetch("http://127.0.0.1:8000/api/token/refresh/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({refresh:refresh})
            })

            if (!response.ok){
                return null;
            }

            const data = await response.json();
            localStorage.setItem("access", data.access);

            return data.access;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        if(isTokenExpired(token)){
            console.log("Token has expired. Refreshing...");

            token=await refreshAccessToken();

            if (!token){
                console.log("Session has expired. Please log-in again.")
                return
            }
        }

        const response = await fetch("http://127.0.0.1:8000/api/Ach_page/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Data Submitted");
            console.log(data);
        } else {
            alert("Something went wrong");
            console.log(data);
        }
    };