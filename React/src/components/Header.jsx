import { User_name } from "../pages/user_name.jsx";
import "../css/name_style.css";
import "../css/header.css";
import {useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faFacebook,
    faXTwitter,
    faWhatsapp,
    faYoutube,
    faLinkedin,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import {
    faPhone,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";

function Header() {

    const [menuOpen, setMenuOpen]=useState(false);
    return (
        <>
        <div className="header">

            <div className="row align-items-center">

                {/* Logo and brand */}
                <div className="col-12 col-md-3 header-brand">

                    <img
                        src="/images/mindroseic.png"
                        alt="WellCare"
                        className="header-logo"
                    />

                    <div className="fs-2">
                        <span style={{ color: "#8BC34A" }}>Well</span>
                        <span style={{ color: "#000000" }}>Care</span>
                    </div>

                </div>

                
                <button className="contact-us" onClick={()=>setMenuOpen(!menuOpen)}>Contact Us</button>
            

                {/* Contact and social information */}
                
                <div className={`social-info col-12 col-md-9 ${menuOpen ? "show" : ""}`}>

    <div className="row align-items-center">

        <div className="col-12 col-sm-6 col-lg-3 contact-item">

            <div className="contact-icon">
                <FontAwesomeIcon icon={faEnvelope} className="ic" />
            </div>

            <div className="contact-details">
                <b>Mail Us</b>
                <span className="contact-value">
                    wellcare@gmail.com
                </span>
            </div>

        </div>

        <div className="col-12 col-sm-6 col-lg-3 contact-item">

            <div className="contact-icon">
                <FontAwesomeIcon icon={faPhone} className="ic" />
            </div>

            <div className="contact-details">
                <b>Call Us</b>
                <span className="contact-value">
                    91+ xxxxxxxxxx
                </span>
            </div>

        </div>

                        <div className="col-12 col-lg-6 social-section">

                            <div className="social-icons">
                                <FontAwesomeIcon icon={faFacebook} className="ic" />
                                <FontAwesomeIcon icon={faXTwitter} className="ic" />
                                <FontAwesomeIcon icon={faWhatsapp} className="ic" />
                                <FontAwesomeIcon icon={faYoutube} className="ic" />
                                <FontAwesomeIcon icon={faLinkedin} className="ic" />
                                <FontAwesomeIcon icon={faInstagram} className="ic" />
                            </div>

                            <div className="username">
                                <User_name />
                            </div>
                            

                        </div>

                    </div>

                </div>

            </div>

        </div>
        </>
    );
}

export default Header;