import { createRoot } from "react-dom/client";
import "./index.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

createRoot(document.getElementById("root")).render(
    <Router>
        <Navbar />
        <div className="content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/project/:id" element={<Project />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </div>
        <Footer />
    </Router>
);
