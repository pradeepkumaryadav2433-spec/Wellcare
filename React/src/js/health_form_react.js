export const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        let token = localStorage.getItem("access");

        function isTokenExpired(token){
        if (!token){
            return true
        }

        const payload=JSON.parse(atob(token.split(".")[1]));
        const expTime=payload.exp*1000;

        return Date.now()>=expTime
        }

        async function refreshAccessToken(){
            const refresh=localStorage.getItem("refresh");

            const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({refresh:refresh})
            });

            if (!response.ok){
                return null;
            }

            const data=await response.json();
            localStorage.setItem("access", data.access)

            return data.access;
        }

        if (isTokenExpired(token)){
            console.log("Access Token Expired. Refreshing...");

            token=await refreshAccessToken()

            if (!token){
                alert("Session Expired. Please log-in again.")
                return
            }
        }

        const response = await fetch("http://127.0.0.1:8000/api/Rec_page/", {
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