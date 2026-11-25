function Profile() {
    return (
        <>
            <div className="row heading my-3">
                <div className="text-center fs-3">
                    My{" "}
                    <b style={{ color: "#8BC34A" }}>
                        Profile{" "}
                        <i className="fa-solid fa-user fa-spin"></i>
                    </b>

                    <hr className="w-25 mx-auto" />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-8 mx-auto bg-light shadow-lg p-5 my-4">

                    <div className="card mb-3 border-0 p-3">

                        <div className="row g-0">

                            <div className="col-md-4">
                                <div
        className="rounded-start"
        style={{
            height: "250px",
            backgroundColor: "#f0f0f0"
        }}
    >
    </div>
                            </div>

                            <div className="col-md-8">

                                <div className="card-body">

                                    <h1
                                        className="card-title fs-1"
                                        style={{ fontFamily: "monotype corsiva" }}
                                        id="welcome"
                                    >
                                    </h1>

                                    <p className="card-text fs-5">
                                        Age :<br />
                                        Email id :<br />
                                        Mobile no :<br />
                                    </p>

                                    <p className="card-text">
                                        <small className="text-body-secondary">
                                            <i className="fa-solid fa-calendar"></i>{" "}
                                            <b>Registration date :</b>
                                        </small>
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Profile;