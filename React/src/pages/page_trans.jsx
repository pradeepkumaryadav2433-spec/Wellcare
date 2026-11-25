import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    startBlur,
    endBlur
} from "../js/fade_load.js";

function Page_transition() {
    const location = useLocation();

    useEffect(() => {
        startBlur();
        const timer = setTimeout(() => {
            endBlur();
        }, 180);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    return null;
}
export default Page_transition;