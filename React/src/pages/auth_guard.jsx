import { useEffect, useState } from "react";
import { checkUser } from "../js/auth_react.js";
import Login_required from "./login_required.jsx";

function Auth_guard({ children }) {

    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        checkUser().then(result => {
            setAuthenticated(result);
        });

    }, []);

    if (authenticated === null) {
        return <p>Checking authentication...</p>;
    }

    if (!authenticated) {
        return <Login_required />;
    }
    return children;
}
export default Auth_guard;