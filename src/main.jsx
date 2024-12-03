// App.jsx
import { createRoot } from "react-dom/client";
import "./index.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
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
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { sepolia } from "wagmi/chains";

const queryClient = new QueryClient();

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const cookies = new Cookies();
    const location = useLocation();

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
    };

    // Check if the current path is for login or signup
    const isAuthPage =
        location.pathname === "/login" || location.pathname === "/signup";

    return (
        <div>
            {/* Render Navbar only if not on the login or signup page */}
            {!isAuthPage && <Navbar loggedIn={loggedIn} onLogout={onLogout} />}
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/:id" element={<Project />} />
                    <Route path="/search" element={<Search />} />

                    {/* ROUTE DÜZELT */}
                    <Route path="/error" element={<Error />} />
                    <Route path="/create" element={<Create />} />
                    {loggedIn ? (
                        <>
                            <Route path="/profile" element={<Profile />} />
                            {/* <Route path="/create" element={<Create />} /> */}
                            <Route path="/settings" element={<Settings />} />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/login"
                                element={<Login onLogin={onLogin} />}
                            />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}
                    <Route path="*" element={<Error />} />
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
