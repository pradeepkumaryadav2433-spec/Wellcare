import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Ach_records() {

    const [records, setRecords] = useState([]);

    useEffect(() => {
        loadAchRecords();
    }, []);


    async function loadAchRecords() {

        const token = localStorage.getItem("access");

        const response = await fetch("http://127.0.0.1:8000/api/Ach_page/", {
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
                        My Achievement Records
                    </h2>

                    <hr className="w-25 mx-auto" />

                    <div className="record-card p-4">

                        <div className="table-responsive">

                            <table className="table table-bordered table-striped align-middle">

                                <thead>
                                    <tr>
                                        <th>Achievement Name</th>
                                        <th>Criteria</th>
                                        <th>Your Experience</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {records.map((record) => (
                                        <tr key={record.id}>
                                            <td>{record.name}</td>
                                            <td>{record.criteria}</td>
                                            <td>{record.ex}</td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    </div>

                </div>
            </div>


            <div className="text-center">

                <Link
                    to="/gallery"
                    className="photo-btn"
                >
                    Your Photos
                </Link>

            </div>
        </>
    );
}

export default Ach_records;