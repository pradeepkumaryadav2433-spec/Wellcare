
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteAccount } from "../js/del_acc_react.js";
import { Logout } from "../pages/logout.jsx";
import "../css/dropdown.css";
import "../css/nav.css";

function Navbar() {

    const [showRecords, setShowRecords] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Close the mobile menu and dropdowns
    const closeMenu = () => {
        setMenuOpen(false);
        setShowRecords(false);
        setShowOptions(false);
    };

    return (
        <div className="row menubar">

            <div className="col-sm-10 mx-auto">

                {/* Hamburger button */}
                <button
                    className="hamburger"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    aria-controls="main-navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Main navigation */}
                <nav
                    className={`main-nav ${menuOpen ? "show" : ""}`}
                    id="main-navigation"
                >

                    <Link className="nav-item" to="/home" onClick={closeMenu}>
                        Home
                    </Link>

                    <Link className="nav-item" to="/mood" onClick={closeMenu}>
                        Today's Mood
                    </Link>

                    <Link className="nav-item" to="/health" onClick={closeMenu}>
                        Health
                    </Link>

                    <Link className="nav-item" to="/ach_route" onClick={closeMenu}>
                        Achievements
                    </Link>

                    <div className="records-menu">

                        <button
                            className="nav-item"
                            onClick={() => setShowRecords(!showRecords)}
                        >
                            Data Records
                        </button>

                        {showRecords && (
                            <div className="records-dropdown">
                                <Link to="/mood_records" onClick={closeMenu}>
                                    Mood Records
                                </Link>

                                <Link to="/ach_records" onClick={closeMenu}>
                                    Achievements Records
                                </Link>

                                <Link to="/health_records" onClick={closeMenu}>
                                    Health Records
                                </Link>
                            </div>
                        )}

                    </div>

                    <Link className="nav-item" to="/aboutus" onClick={closeMenu}>
                        About Us
                    </Link>

                    <div className="records-menu">

                        <button
                            className="nav-item"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            Account
                        </button>

                        {showOptions && (
                            <div className="records-dropdown">
                                <Link to="/login" onClick={closeMenu}>
                                    Login
                                </Link>

                                <div onClick={closeMenu}>
                                    <Logout />
                                </div>

                                <Link to="/profile" onClick={closeMenu}>
                                    Profile
                                </Link>

                                <button className="act_del"
                                    onClick={() => {
                                        closeMenu();
                                        deleteAccount();
                                    }}
                                >
                                    Acc. Deletion
                                </button>
                            </div>
                        )}

                    </div>

                </nav>

            </div>

        </div>
    );
}

export default Navbar;
