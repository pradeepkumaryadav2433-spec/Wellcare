function Login_modal({ success, message, onClose }) {
    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(5px)",
                    zIndex: 9998
                }}
            />

            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#fff",
                    padding: "25px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    zIndex: 9999,
                    minWidth: "300px"
                }}
            >
                <h3
                    style={{
                        color: success ? "#8BC34A" : "red",
                        textAlign: "center",
                        fontSize: "24px",
                        marginBottom: "10px"
                    }}
                >
                    {message}
                </h3>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center"
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            background: "white",
                            color: "black",
                            border: "1px solid",
                            borderRadius: "8px",
                            padding: "10px 20px",
                            cursor: "pointer",
                            fontSize: "15px"
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </>
    );
}
export default Login_modal;