export async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("http://127.0.0.1:8000/api/User_page/", {
            method: 'POST',
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
    } catch (error) {
        console.log(error);
        alert("Network Error");
    }
}