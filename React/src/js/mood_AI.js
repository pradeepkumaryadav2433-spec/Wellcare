export async function handleAI() {
    const token = localStorage.getItem("access");

    if (!token) {
        throw new Error("Authentication token is missing");
    }

    const response = await fetch(
        "http://127.0.0.1:8000/api/ai/mood/",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: "Help me understand my mood data."
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to get an AI response");
    }

    return await response.json();
}