function Login_required() {

    const goToLogin = () => {
        window.location.href = "/login/";
    };

    const goHome = () => {
        window.location.href = "/";
    };

    return (
        <>
            <div className="login-overlay"></div>

            <div className="login-card">

                <h3>Login Required!</h3>

                <p>Please login to continue.</p>

                <div className="login-buttons">

                    <button onClick={goToLogin}>
                        Login
                    </button>

                    <button onClick={goHome}>
                        Home
                    </button>

                </div>

            </div>
        </>
    );
}

export default Login_required;