import { handleSubmit } from "../js/ach_form_react.js"

function Ach(){
    return(
        <div className="ach-main">
<h4 style={{color:"#8BC34A"}}>Every <b style={{color:"#8BC34A"}}>Achievement</b>, Big or Small, Deserves to be <b style={{color:"#8BC34A"}}>Remembered</b>.</h4>

<form onSubmit={handleSubmit} id="achform" encType="multipart/form-data">

        <label htmlFor="achievementName">Achievement Name:</label>
        <input type="text" className="form-control aph" name="name" placeholder="Enter achievement name"/>

        <label htmlFor="criteria">Criteria:</label>
        <textarea name="criteria" placeholder="Enter criteria details"> </textarea>

        <label htmlFor="experience">Your Experience:</label>
        <textarea name="ex" placeholder="Share your experience"></textarea> 

        <label htmlFor="photo">Attach a Photo:</label>
        <input type="file" name="photo" accept="image/*"/>

        <button type="submit">Submit</button>
</form>
    </div>
    );
}

export default Ach;