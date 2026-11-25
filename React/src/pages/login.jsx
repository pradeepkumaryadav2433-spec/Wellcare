import { useState } from "react";
import { loginUser } from "../js/login_react.js";
import Login_modal from "./login_modal.jsx";


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [modal, setModal] = useState(null);


    async function handleSubmit(e) {
        e.preventDefault();
        const result = await loginUser(username, password);
        setModal(result);
    }


    return (
        <>
            <div className="row heading my-3">
                <div className="text-center fs-3">

                    Sign{" "}

                    <b style={{ color: "#8BC34A" }}>
                        In <i className="fa-solid fa-key fa-spin"></i>
                    </b>

                    <hr className="w-25 mx-auto" />

                    <span className="fs-4">
                        Please log in with your correct userid and password. Thank you.
                    </span>

                </div>
            </div>


            <div className="row">
                <div className="col-sm-10 mx-auto">

                    <div className="row">
                        <div className="col-sm-7 mx-auto mt-3">

                            <form
                                id="userform"
                                onSubmit={handleSubmit}
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
                                        id="username"
                                        name="username"
                                        className="form-control"
                                        required
                                        placeholder="Please enter your name..."
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
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
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        required
                                        placeholder="Please enter your password..."
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3 d-block mx-auto fs-5"
                                >
                                    Login
                                </button>

                            </form>


                            {modal && (
                                <Login_modal
                                    success={modal.success}
                                    message={modal.message}
                                    onClose={() => setModal(null)}
                                />
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default Login;