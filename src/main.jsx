// App.jsx
import { createRoot } from "react-dom/client";
import "./index.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    useNavigate,
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
import { useRef, useEffect, useState } from "react";
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
import Notification from "./components/Notification/Notification";
import { mainUrl } from "./api_url";

const queryClient = new QueryClient();

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // New loading state
    const cookies = new Cookies();
    const location = useLocation();
    const { disconnect } = useDisconnect();
    const notificationRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = cookies.get("loggedIn") || false;
        setLoggedIn(isLoggedIn);
        setLoading(false); // Authentication check complete
    }, []);

    const onLogin = (token, username) => {
        cookies.set("loggedIn", true, { path: "/", domain: mainUrl });
        cookies.set("token", token, { path: "/", domain: mainUrl });
        cookies.set("username", username, { path: "/", domain: mainUrl });
        setLoggedIn(true);
    };

    const onLogout = () => {
        navigate("/");
        cookies.remove("loggedIn", { path: "/", domain: mainUrl });
        cookies.remove("token", { path: "/", domain: mainUrl });
        cookies.remove("username", { path: "/", domain: mainUrl });
        setLoggedIn(false);
        disconnect();
    };

    function handleNotification(msg, type) {
        notificationRef.current.addNotification(msg, type);
    }

    const isAuthPage = [
        "/login",
        "/signup",
        "/error",
        "/reset-password",
        "/validation-email",
        "/forgot-password",
    ].includes(location.pathname);

    if (loading) {
        return <div>Loading...</div>; // Optional loading indicator
    }

    return (
        <div>
            <Notification ref={notificationRef} />
            {!isAuthPage && <Navbar loggedIn={loggedIn} onLogout={onLogout} />}
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/project/:id"
                        element={
                            <Project handleNotification={handleNotification} />
                        }
                    />
                    <Route path="/search" element={<Search />} />
                    <Route path="/error" element={<Error />} />
                    {loggedIn ? (
                        <>
                            <Route
                                path="/profile"
                                element={
                                    <Profile
                                        handleNotification={handleNotification}
                                    />
                                }
                            />
                            <Route
                                path="/create"
                                element={
                                    <Create
                                        handleNotification={handleNotification}
                                    />
                                }
                            />
                            <Route
                                path="/settings"
                                element={
                                    <Settings
                                        handleNotification={handleNotification}
                                    />
                                }
                            />
                            <Route
                                path="/projects"
                                element={
                                    <DisplayProjects
                                        handleNotification={handleNotification}
                                    />
                                }
                            />
                            <Route
                                path="/saved-projects"
                                element={
                                    <CardSaved
                                        handleNotification={handleNotification}
                                    />
                                }
                            />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/login"
                                element={
                                    <Login
                                        onLogin={onLogin}
                                        handleNotification={handleNotification}
                                    />
                                }
                            />
                            <Route
                                path="/signup"
                                element={
                                    <Signup
                                        handleNotification={handleNotification}
                                    />
                                }
                            />
                            <Route
                                path="/forgot-password"
                                element={
                                    <EnteringEmail
                                        handleNotification={handleNotification}
                                    />
                                }
                            />
                            <Route
                                path="/validation-email"
                                element={
                                    <ValidationEmail
                                        handleNotification={handleNotification}
                                    />
                                }
                            />
                            <Route
                                path="/reset-password"
                                element={
                                    <ForgotPassword
                                        handleNotification={handleNotification}
                                    />
                                }
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
