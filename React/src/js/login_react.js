export async function loginUser(username, password) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: "Invalid Credentials"
            };
        }

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("username", username);

        window.dispatchEvent(new Event("login"));

        return {
            success: true,
            message: "You Are Logged-In!"
        };

    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Network Error"
        };
    }
}