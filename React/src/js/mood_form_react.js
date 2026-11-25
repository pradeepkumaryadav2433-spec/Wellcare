export const handleSubmit = async (e, labels, values) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add the dynamically selected slider values
    const measurements = labels.map(item => ({
        label_id: item.id,
        value: values[item.id]
    }));

    formData.set("measurements", JSON.stringify(measurements));

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

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/Mood_entries/",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );

        const responseText = await response.text();

console.log("HTTP status:", response.status);
console.log("Raw server response:", responseText);

let data;

try {
    data = JSON.parse(responseText);
} catch {
    data = { detail: responseText };
}

        if (response.ok) {
            alert("Data Submitted");
            console.log(data);
        } else {
            alert("Something went wrong");
            console.log(data);
        }
    } catch (error) {
        console.error("Submission failed:", error);
        alert("Unable to connect to the server.");
    }
};