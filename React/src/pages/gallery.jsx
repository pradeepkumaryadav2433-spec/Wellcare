import { useEffect, useState } from "react";
import "../css/galleryfullscreen.css";

function Gallery() {
    const [achievements, setAchievements] = useState([]);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    useEffect(() => {
        loadAchievements();
    }, []);

    async function loadAchievements() {
        const token = localStorage.getItem("access");

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/Ach_page/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setAchievements(data);
        } catch (error) {
            console.error("Error loading achievements:", error);
        }
    }

    function closeModal() {
        setSelectedAchievement(null);
    }

    return (
        <>
            <h1>My Achievements</h1>

            <div id="gallery">
                {achievements.map((item) => {

                    if (!item.photo) return null;

                    return (
                        <div
                            className="card"
                            key={item.id}
                            onClick={() => setSelectedAchievement(item)}
                        >
                            <img
                                src={item.photo}
                                alt={item.name}
                            />

                            <h3>{item.name}</h3>
                        </div>
                    );
                })}
            </div>

            {selectedAchievement && (
                <div
                    id="imageModal"
                    className="modal"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <span
                        className="close"
                        onClick={closeModal}
                    >
                        &times;
                    </span>

                    <img
                        id="modalImage"
                        src={selectedAchievement.photo}
                        alt={selectedAchievement.name}
                    />

                    <h2 id="modalTitle">
                        {selectedAchievement.name}
                    </h2>
                </div>
            )}
        </>
    );
}

export default Gallery;