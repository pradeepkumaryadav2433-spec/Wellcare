import { handleSubmit } from "../js/mood_form_react.js"
import { useState, useEffect } from "react";
import { handleAI } from "../js/mood_AI.js"
import "../css/info.css"

function Mood(){
    function updateRangeValue(event, valueId) {
        document.getElementById(valueId).textContent = event.target.value;
    }

const [labels, setLabels] = useState([]);
const [values, setValues] = useState({});
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [showInfo, showInfoFunc]=useState(false)

useEffect(() => {
    async function fetchLabels() {
        const token = localStorage.getItem("access");

        if (!token) {
            setError("Please log in again.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/Mood_configuration/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Unable to load mood labels."
                );
            }

            if (!data.configured) {
                setError("Please configure your mood tracker first.");
                return;
            }

            setLabels(data.labels);

            setValues(
                Object.fromEntries(
                    data.labels.map(item => [item.id, 5])
                )
            );
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    fetchLabels();
}, []);

    return(
        <div className="main-mood">
            <div
                id="recording-message"
                style={{
                    display: "none",
                    position: "fixed",
                    top: "10px",
                    left: "10px",
                    background: "#dc3545",
                    color: "white",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    zIndex: 1000
                }}
            >
                🎤 Recording in progress, you can speak now.
            </div>

            <br />

            <h4 style={{ textAlign: "center" }}>
                Every Day Tells a{" "}
                <b style={{ color: "#8BC34A" }}>Story</b>. Capture How Today{" "}
                <b style={{ color: "#8BC34A" }}>Felt</b> And Be{" "}
                <b style={{ color: "#8BC34A" }}>Honest</b> With Yourself.
            </h4>
        
            <div className="info-div">
            <form id="moodform" onSubmit={(e) => handleSubmit(e, labels, values)} encType="multipart/form-data">

                
{loading ? (
    <p>Loading your mood tracker...</p>
) : error ? (
    <p className="text-danger">{error}</p>
) : (
    labels.map(item => (
        <div key={item.id} className="mb-3">
            <label
                htmlFor={`mood-${item.id}`}
                className="form-label"
            >
                {item.position}. How would you rate your{" "}
                {item.label.toLowerCase()} today?{" "}
                <span className="range-value">
                    {values[item.id] ?? 5}
                </span>
            </label>

            <input
                type="range"
                className="range"
                id={`mood-${item.id}`}
                min="0"
                max="10"
                value={values[item.id] ?? 5}
                onChange={event =>
                    setValues(current => ({
                        ...current,
                        [item.id]: Number(event.target.value)
                    }))
                }
            />
        </div>
    ))
)}


                <label htmlFor="note">
                    Write about your day:
                </label>

                <textarea
                    id="note"
                    name="note"
                    placeholder="Share your thoughts..."
                ></textarea>

                <p id="recording-status">Not recording</p>

                <button
                    type="button"
                    id="start"
                    className="btn btn-success mb-2"
                >
                    Start Recording
                </button>

                <button
                    type="button"
                    id="stop"
                    className="btn btn-danger mb-2"
                    disabled
                >
                    Stop Recording
                </button>

                <audio id="player" controls></audio>

                <br />

                <button
                    type="submit"
                    className="btn btn-primary mt-3 d-block mx-auto fs-5"
                >
                    Save
                </button>

            </form>
            <button className="info-btn" onClick={()=>showInfoFunc(!showInfo)}>?</button>

            {showInfo && (
                <div>
                <b><p>Calm yourself and think about your day and how you are feeling.</p></b>
                <b><p>Be honest with your emotions.</p></b>
                <ul>
                    <li><b>0-Absent</b>(I am not feeling that emotion much.)</li>
                    <li><b>1-2-Very Faint</b>(I can barely feel it.)</li>
                    <li><b>3-4-Mild</b>(I feel it but it is not very strong.)</li>
                    <li><b>5-6-Moderate</b>(It is clearly present and noticiable.)</li>
                    <li><b>7-8-Strong</b>(It is prominent in my current experience.)</li>
                    <li><b>9-10-Very Intense</b>(It is extremely strong and dominates my experience.)</li>
                </ul>
                </div>
            )}
            </div>
        

            <button onClick={handleAI}>Talk To AI</button>
        </div>
    );
}

export default Mood;