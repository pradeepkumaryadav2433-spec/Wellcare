function Aboutus() {
    return (
        <div className="about-us">

            <div className="text-center fs-3 m-2">
                About <b className="text-mycolor1">Us</b>
            </div>

            <div className="row">
                <div className="col-12 col-sm-10 mx-auto">

                    <div className="row align-items-center">

                        <div className="col-12 col-md-6">
                            <img
                                src="/images/mind_rose.jpeg"
                                className="img-thumbnail"
                                alt="WellCare"
                            />
                        </div>

                        <div className="col-12 col-md-6">
                            <p className="px-3">
                                Often, the person we neglect the most is
                                ourselves—<b style={{color:"#8BC34A"}}>our health,
                                our emotions, and our well-being.</b>
                            </p>

                            <p className="px-3">
                                WellCare is a small reminder to pause and check
                                in with yourself. While emotions can never be
                                fully captured in numbers, <b style={{color:"#8BC34A"}}>
                                recording your moods, thoughts, achievements,
                                and challenges</b> can help you recognize
                                patterns and better <b style={{color:"#8BC34A"}}>
                                understand yourself</b>.
                            </p>

                            <p className="px-3">
                                It's simply a step toward
                                <b style={{color:"#8BC34A"}}> self-exploration</b>.
                            </p>

                            <p className="px-3 fs-3">
                                Thank you for being here—for yourself.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Aboutus;