import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Health_records() {

    const [records, setRecords] = useState([]);

    useEffect(() => {
        loadhealthRecords();
    }, []);


    async function loadhealthRecords() {

        const token = localStorage.getItem("access");

        const response = await fetch("http://127.0.0.1:8000/api/Rec_page/", {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const records = await response.json();

        setRecords(records);
    }

    return (
        <>
            <div className="row my-4">
                <div className="col-sm-10 mx-auto">

                    <h2 className="text-center heading">
                        My Health Records
                    </h2>

                    <hr className="w-25 mx-auto" />

                    <div className="record-card p-4">

                        <div className="table-responsive">

                            <table className="table table-bordered table-striped align-middle">

                                <thead>
                                    <tr>
                                        <th>Illness</th>
                                        <th>Month</th>
                                        <th>Intensity</th>
                                        <th>Duration (Days)</th>
                                    </tr>
                                </thead>

                                <tbody id="illnessTableBody">
                                </tbody>

                            </table>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Health_records;