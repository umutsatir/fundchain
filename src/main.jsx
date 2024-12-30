// App.jsx
import { createRoot } from "react-dom/client";
import "./index.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Project from "./pages/Project";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Create from "./pages/Create";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDisconnect, WagmiProvider } from "wagmi";
import { config } from "./config";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { sepolia } from "wagmi/chains";
import CardSaved from "./pages/CardSaved";
import EnteringEmail from "./pages/EnteringEmail";
import ValidationEmail from "./pages/ValidationEmail";
import ForgotPassword from "./pages/ForgotPassword";
import DisplayProjects from "./pages/DisplayProjects";

const queryClient = new QueryClient();

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const cookies = new Cookies();
    const location = useLocation();
    const { disconnect } = useDisconnect();

    // Check cookie on initial load
    useEffect(() => {
        setLoggedIn(cookies.get("loggedIn") || false);
    }, []);

    const onLogin = (token, username) => {
        cookies.set("loggedIn", true);
        cookies.set("token", token);
        cookies.set("username", username);
        setLoggedIn(true); // Update state on login
    };

    const onLogout = () => {
        cookies.remove("loggedIn");
        cookies.remove("token");
        setLoggedIn(false); // Update state on logout
        disconnect(); // Disconnect from the blockchain
    };

    // Check if the current path is for login or signup
    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/error" ||
        location.pathname === "/reset-password" ||
        location.pathname === "/validation-email" ||
        location.pathname === "/forgot-password";

    return (
        <div>
            {/* Render Navbar only if not on the login or signup page */}
            {!isAuthPage && <Navbar loggedIn={loggedIn} onLogout={onLogout} />}
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/:id" element={<Project />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/error" element={<Error />} />
                    {loggedIn ? (
                        <>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/create" element={<Create />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route
                                path="/projects"
                                element={<DisplayProjects />}
                            />
                            <Route
                                path="/saved-projects"
                                element={<CardSaved />}
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/login"
                                element={<Login onLogin={onLogin} />}
                            />
                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/forgot-password"
                                element={<EnteringEmail />}
                            />
                            <Route
                                path="/validation-email"
                                element={<ValidationEmail />}
                            />
                            <Route
                                path="/reset-password"
                                element={<ForgotPassword />}
                            />
                        </>
                    )}
                    <Route
                        path="*"
                        element={<Navigate to="/error" replace />}
                    />
                </Routes>
            </div>
            {!isAuthPage && <Footer />}
        </div>
    );
};

createRoot(document.getElementById("root")).render(
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
                theme={lightTheme({
                    accentColor: "#65558f",
                    accentColorForeground: "white",
                    borderRadius: "medium",
                    fontStack: "system",
                    overlayBlur: "small",
                })}
                locale="en-US"
                initialChain={sepolia}
            >
                <Router>
                    <App />
                </Router>
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
);
