export async function refreshAccessToken() {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
        return false;
    }

    try {
        const response = await fetch(
            "http://localhost:8000/api/token/refresh/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    refresh: refresh
                })
            }
        );

        if (!response.ok) {
            return false;
        }

        const data = await response.json();

        localStorage.setItem("access", data.access);

        return true;

    } catch (error) {
        console.log("Token refresh error:", error);
        return false;
    }
}


export async function checkUser() {

    let token = localStorage.getItem("access");

    if (!token) {
        return false;
    }

    try {
        let response = await fetch(
            "http://localhost:8000/api/User_page/",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Access token expired
        if (response.status === 401) {

            const refreshed = await refreshAccessToken();

            if (!refreshed) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                return false;
            }

            // Get new access token
            token = localStorage.getItem("access");

            // Try API request again
            response = await fetch(
                "http://localhost:8000/api/User_page/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }

        if (!response.ok) {
            console.log("Something went wrong.");
            return false;
        }

        const data = await response.json();
        console.log(data);
        return true;

    } catch (error) {
        console.log("Authentication request failed:", error);
        return false;
    }
}