import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/logout.css";

export function Logout() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    function openLogoutModal() {
        setShowModal(true);
    }

    function cancelLogout() {
        setShowModal(false);
    }

    function confirmLogout() {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");

        window.dispatchEvent(new Event("logout"));

        setShowModal(false);

        navigate("/login");
    }

    return (
        <>
         <button onClick={openLogoutModal} className="outbtn">
            Logout
        </button>

            {/* This function is passed to Navbar button */}
            {showModal && (
                <>
                    <div className="logout-overlay"></div>

                    <div className="logout-card">
                        <h3>Are you sure you want to log out?</h3>

                        <div className="logout-buttons">
                            <button
                                className="logout-no"
                                onClick={cancelLogout}
                            >
                                No
                            </button>

                            <button
                                className="logout-yes"
                                onClick={confirmLogout}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}