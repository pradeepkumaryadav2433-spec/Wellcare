
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Mood_choose() {
    const navigate = useNavigate();

    const [count, setCount] = useState("3");
    const [labels, setLabels] = useState(["", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function changeCount(event) {
        const newCount = Number(event.target.value);

        setCount(event.target.value);

        setLabels(current => {
            if (newCount > current.length) {
                return [
                    ...current,
                    ...Array(newCount - current.length).fill("")
                ];
            }

            return current.slice(0, newCount);
        });
    }

    function changeLabel(index, value) {
        setLabels(current =>
            current.map((label, i) =>
                i === index ? value : label
            )
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const cleanedLabels = labels.map(label => label.trim());

        if (cleanedLabels.some(label => !label)) {
            setError("Please enter a label for every slider.");
            return;
        }

        const normalizedLabels = cleanedLabels.map(
            label => label.toLowerCase()
        );

        if (new Set(normalizedLabels).size !== cleanedLabels.length) {
            setError("Please use a different name for each slider.");
            return;
        }

        const token = localStorage.getItem("access");

        if (!token) {
            setError("Please log in again.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/Mood_configuration/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        labels: cleanedLabels
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail ||
                    data.labels?.[0] ||
                    "Unable to save your mood configuration."
                );
            }

            // Continue to the existing mood page.
            navigate("/mood");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-4 mb-5">
            <h2 className="text-center mb-3">
                Personalize Your Mood Tracker
            </h2>

            <p className="text-center text-muted mb-4">
                Choose what you want to track.
                Your selected labels will be used every day.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mx-auto"
                style={{ maxWidth: "600px" }}
            >
                <label htmlFor="sliderCount" className="form-label">
                    How many moods do you want to track?
                </label>

                <select
                    id="sliderCount"
                    className="form-select mb-4"
                    value={count}
                    onChange={changeCount}
                >
                    <option value="1">1 slider</option>
                    <option value="2">2 sliders</option>
                    <option value="3">3 sliders</option>
                    <option value="4">4 sliders</option>
                    <option value="5">5 sliders</option>
                    <option value="6">6 sliders</option>
                </select>

                {labels.map((label, index) => (
                    <div className="mb-3" key={index}>
                        <label
                            htmlFor={`label-${index}`}
                            className="form-label"
                        >
                            Slider {index + 1}
                        </label>

                        <input
                            id={`label-${index}`}
                            type="text"
                            className="form-control"
                            placeholder="e.g. Anxiety, Energy, Happiness"
                            value={label}
                            maxLength={50}
                            required
                            onChange={event =>
                                changeLabel(index, event.target.value)
                            }
                        />
                    </div>
                ))}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-success w-100 mt-3"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save My Preferences"}
                </button>
            </form>
        </div>
    );
}

export default Mood_choose;
