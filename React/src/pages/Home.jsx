import { Link } from "react-router-dom";
import "../css/home.css"

function Home() {
    return (
        <section className="slider">

            <div className="container home-content">

                <div className="row">
                    <div className="col-12 col-lg-10 mx-auto pt-5">

                        <div className="home-title text-center text-light">
                            Welcome to Well
                            <b style={{ color: "#8BC34A" }}>Care</b>
                        </div>

                        <div className="home-description text-center text-light mt-4">
                            A place to store your emotions, thoughts, and moments.
                            Sometimes understanding yourself begins with simply noticing.
                        </div>

                        <Link
                            className="btn btn-danger register-btn d-block mx-auto mt-5 rounded-pill"
                            to="/register"
                        >
                            Register Now
                        </Link>

                    </div>
                </div>

            </div>

        </section>
    );
}

export default Home;
