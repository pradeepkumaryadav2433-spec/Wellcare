export async function deleteAccount() {

    const confirmDelete = confirm(
        "WARNING!\n\nDeleting your account will permanently remove:\n\n" +
        "- Mood records\n" +
        "- Illness records\n" +
        "- Achievements\n" +
        "- Recommendations\n\n" +
        "This action cannot be undone.\n\n" +
        "Do you want to continue?"
    );

    if (!confirmDelete) {
        return;
    }

    const token = localStorage.getItem("access");

    const response = await fetch("http://127.0.0.1:8000/api/del_account/", {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        alert("Your account has been deleted.");

        window.location.href = "/";
    }
    else {
        alert("Unable to delete account.");
    }
}