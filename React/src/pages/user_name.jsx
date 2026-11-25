import {useState, useEffect} from "react";

export function User_name() {
    const [username, setUsername]=useState(localStorage.getItem("username"));

    useEffect(()=>{

        const handleLogin=()=>{
            setUsername(localStorage.getItem("username"));
        }
        const handleLogout=()=>{
            setUsername(null);
        };

        window.addEventListener("login", handleLogin);
        window.addEventListener("logout", handleLogout);

        return ()=>{
            window.removeEventListener("login", handleLogin);
            window.removeEventListener("logout", handleLogout);
        };
    }, []);

    if (!username) {
        return null;
    }

    return (
        <h1 className="wel-text">
            Welcome, <span className="username">{username}</span>
        </h1>
    );
}