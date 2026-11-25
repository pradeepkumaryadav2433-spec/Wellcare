import { BrowserRouter, Routes, Route } from "react-router-dom";

/*Importing Components*/
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

/*Importing Pages*/
import Home from "./pages/Home.jsx";
import Aboutus from "./pages/Aboutus.jsx";
import Ach from "./pages/Ach.jsx";
import Mood from "./pages/Mood.jsx";
import Health from "./pages/Health.jsx";
import MoodRecords from "./pages/mood_records.jsx";
import Login from "./pages/login.jsx";
import Ach_records from "./pages/Ach_records.jsx";
import Health_records from "./pages/health_records.jsx";
import Profile from "./pages/profile.jsx";
import Register from "./pages/register.jsx";
import Gallery from "./pages/gallery.jsx";
import Login_required from "./pages/login_required.jsx";
import Auth_guard from "./pages/auth_guard.jsx";
import Page_transition from "./pages/page_trans.jsx";
import Mood_choose from "./pages/mood_choose.jsx";

/*Importing CSS*/
import "./App.css";
import "./css/body.css";
import "./css/button.css";
import "./css/data.css";
import "./css/fade.css";
import "./css/form.css";
import "./css/input.css";
import "./css/label.css";
import "./css/message.css";

function App(){
  return(
    <div className="app-layout">
      <Page_transition />
      <Header />
      <Navbar />

      <div className="row-content">
        <div className="col-sm-12">
          <Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/aboutus" element={<Aboutus />}/>
            <Route path="/ach_route" element={<Auth_guard><Ach /></Auth_guard>}/>
            <Route path="/mood" element={<Auth_guard><Mood /></Auth_guard>}/>
            <Route path="/health" element={<Auth_guard><Health /></Auth_guard>}/>
            <Route path="/mood_records" element={<Auth_guard><MoodRecords /></Auth_guard>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/ach_records" element={<Auth_guard><Ach_records /></Auth_guard>}/>
            <Route path="/health_records" element={<Auth_guard><Health_records /></Auth_guard>}/>
            <Route path="/profile" element={<Auth_guard><Profile /></Auth_guard>}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/gallery" element={<Auth_guard><Gallery /></Auth_guard>}/>
            <Route path="/login_required" element={<Login_required />}/>
            <Route path="/mood_choose" element={<Mood_choose />}/>
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;