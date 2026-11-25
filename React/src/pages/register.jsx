import { handleSubmit } from "../js/user_form_react.js"

function Register() {
    return (
        <>
            <div className="row heading my-3">
                <div className="text-center fs-3">
                    Sign{" "}
                    <b style={{ color: "#8BC34A" }}>
                        Up{" "}
                        <i className="fa-solid fa-user fa-spin"></i>
                    </b>

                    <hr className="w-25 mx-auto" />

                    <h4 style={{ textAlign: "center" }}>
                        Please Enter Your Details For{" "}
                        <b style={{ color: "#8BC34A" }}>
                            Registration
                        </b>
                        . Thank You.
                    </h4>
                </div>
            </div>

            {/* heading end */}

            <div className="row">
                <div className="col-sm-10 mx-auto">
                    <div className="row">
                        <div className="col-sm-7 mx-auto mt-3">

                            <form
                                method="POST"
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                            >

                                <div className="d-flex align-items-center mb-3">
                                    <label
                                        htmlFor="username"
                                        className="me-3 fs-5"
                                        style={{ width: "120px" }}
                                    >
                                        Name:
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        required
                                        placeholder="Please enter your name..."
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <label
                                        htmlFor="age"
                                        className="me-3 fs-5"
                                        style={{ width: "120px" }}
                                    >
                                        Age:
                                    </label>

                                    <input
                                        type="text"
                                        name="age"
                                        className="form-control"
                                        required
                                        placeholder="Please enter your age..."
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <label
                                        htmlFor="email"
                                        className="me-3 fs-5"
                                        style={{ width: "120px" }}
                                    >
                                        Email Id:
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        required
                                        placeholder="Please enter your email id..."
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <label
                                        htmlFor="mob_no"
                                        className="me-3 fs-5"
                                        style={{ width: "120px" }}
                                    >
                                        Mob_No:
                                    </label>

                                    <input
                                        type="number"
                                        name="mob_no"
                                        className="form-control"
                                        required
                                        placeholder="Please enter your mobile number..."
                                    />
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <label
                                        htmlFor="password"
                                        className="me-3 fs-5"
                                        style={{ width: "120px" }}
                                    >
                                        Password:
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        required
                                        placeholder="Please enter your password..."
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Submit"
                                    className="form-control"
                                    style={{ background: "#8BC34A" }}
                                />

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;