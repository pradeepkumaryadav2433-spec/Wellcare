import { handleSubmit } from "../js/health_form_react.js"

function Health() {

    function updateRangeValue(event) {
        const value = document.getElementById("intensityValue");
        value.textContent = event.target.value;
    }

    return (
        <>
            <br />

            <h4 style={{ textAlign: "center" }}>
                Your{" "}
                <b style={{ color: "#8BC34A" }}>Health</b> Is Part Of The Story.{" "}
                <b style={{ color: "#8BC34A" }}>Record</b> It One Entry at a Time.
            </h4>

            <form id="recform" onSubmit={handleSubmit}>

                <label htmlFor="illnessName">
                    Illness Name:
                </label>

                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter illness name"
                />

                <label htmlFor="occurrenceTime">
                    Time of Occurrence:
                </label>

                <input
                    type="text"
                    id="month"
                    name="month"
                    placeholder="Enter time of occurrence"
                />

                <label htmlFor="intensity">
                    How much you will scale your illness's intensity?
                    <span id="intensityValue" className="range-value">
                        5
                    </span>
                </label>

                <input
                    type="range"
                    id="intensity"
                    name="intensity"
                    min="1"
                    max="10"
                    defaultValue="5"
                    onInput={updateRangeValue}
                />

                <label htmlFor="duration">
                    Duration (days):
                </label>

                <input
                    type="number"
                    id="duration"
                    name="duration"
                    min="1"
                    placeholder="Enter duration in days"
                />

                <button type="submit">
                    Submit
                </button>

            </form>
        </>
    );
}

export default Health;