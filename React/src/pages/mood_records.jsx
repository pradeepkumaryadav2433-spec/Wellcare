import { useEffect, useState } from "react";
import { createBarChart, createPieChart } from "../js/charts.js";

function MoodRecords() {

    const [moodsData, setMoodsData] = useState([]);
    const [showPie, setShowPie] = useState(false);

    useEffect(() => {
        loadMoods();
    }, []);

    async function loadMoods() {

        const token = localStorage.getItem("access");

        const response = await fetch("http://127.0.0.1:8000/api/Mood_entries/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const moods = await response.json();

        setMoodsData(moods);

        createBarChart(moods);
    }

    function handleShowPie() {
        setShowPie(true);
        createPieChart(moodsData);
    }

    return (
        <>
            <div className="row my-4">

                <div className="col-sm-10 mx-auto">

                    <h2 className="text-center heading">
                        My Mood Records
                    </h2>

                    <hr className="w-25 mx-auto" />

                    <div className="record-card p-4">

                        <div className="table-responsive">

                            <table className="table table-bordered table-striped align-middle">

                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Happy</th>
                                        <th>Tensed</th>
                                        <th>Angry</th>
                                        <th>Motivated</th>
                                        <th>Fear</th>
                                        <th>Relaxed</th>
                                        <th>Note</th>
                                        <th>Audio</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {moodsData.map((mood) => (
                                        <tr key={mood.id}>

                                            <td>
                                                {new Date(
                                                    mood.created_at
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>{mood.happy}</td>
                                            <td>{mood.tensed}</td>
                                            <td>{mood.angry}</td>
                                            <td>{mood.motivated}</td>
                                            <td>{mood.fear}</td>
                                            <td>{mood.relaxed}</td>

                                            <td>
                                                {mood.note}
                                            </td>

                                            <td>
                                                {mood.audio ? (
                                                    <audio controls>
                                                        <source
                                                            src={mood.audio}
                                                        />
                                                    </audio>
                                                ) : (
                                                    "No Audio"
                                                )}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>


            <div className="mt-4">

                <div className="card shadow-sm border-0 rounded-4 p-4 my-4">

                    <h5 className="mb-4">
                        📊 Mood Trends
                    </h5>

                    <div style={{ height: "450px" }}>
                        <canvas id="barChart"></canvas>
                    </div>

                </div>


                <div className="text-center">

                    <button
                        id="showPieBtn"
                        className="btn btn-primary mt-4"
                        onClick={handleShowPie}
                    >
                        Show Overall Mood Distribution
                    </button>

                </div>


                {showPie && (
                    <div id="pieContainer">

                        <div className="card shadow-sm border-0 rounded-4 p-4 mt-4">

                            <h5>
                                Overall Mood Distribution
                            </h5>

                            <div
                                style={{
                                    height: "350px",
                                    width: "350px",
                                    margin: "auto"
                                }}
                            >
                                <canvas id="pieChart"></canvas>
                            </div>

                        </div>

                    </div>
                )}

            </div>
        </>
    );
}

export default MoodRecords;