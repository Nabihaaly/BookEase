// AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import api from "../utils/api";
import { setAccessToken, getAccessToken } from "../utils/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check auth on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Only check if we have a token
                const token = getAccessToken();
                if (!token) {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const res = await api.get("/Auth/profile");
                if (res.data.status) {
                    setUser(res.data.data);
                } else {
                    setUser(null);
                    setAccessToken(null); // Clear invalid token
                }
            }
            catch (err) {
                console.error("Auth check failed", err);
                setUser(null);
                setAccessToken(null); // Clear invalid token
                
                // If it's a 401 or network error, just set user to null
                // Don't redirect here - let the routing handle it naturally
            }
            finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post("/Auth/login", { email, password });
            if (res.data.status) {
                setAccessToken(res.data.data.accessToken);
                
                // Use user data from login response (no extra API call needed)
                setUser(res.data.data.user);
                    toast.success("Welcome back! Login successful.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    return { success: true, user: res.data.data.user };
            } else {
                setUser(null);
                setAccessToken(null);
                toast.error(res.data.statusMessage || "Login failed", {
                    position: "top-right",
                    autoClose: 5000,
                });
                return { success: false, message: res.data.statusMessage };
            }
        } catch (error) {
            console.error("Login error:", error);

            // Read backend's statusMessage properly
            const errorMessage =
                error.response?.data?.statusMessage || // from your C# API
                error.response?.data?.message ||      // fallback
                "Something went wrong during login";

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
            });

            return { success: false, message: errorMessage };
        }
    };

    const signup = async (name, email, password, role) => {
        try {
            const res = await api.post("/Auth/register", { name, email, password, role });
            if (res.data.status) {
                setAccessToken(res.data.data.accessToken);
                
                // Use user data from signup response (no extra API call needed)
                setUser(res.data.data.user);
                    toast.success("Account created successfully! Welcome to BookingPro.", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    return { success: true };
            } else {
                setUser(null);
                setAccessToken(null);
                toast.error(res.data.statusMessage || "Signup failed", {
                    position: "top-right",
                    autoClose: 5000,
                });
                return { success: false, message: res.data.statusMessage };
            }
        } catch (error) {
            console.error("Signup error:", error);
            const errorMessage = error.response?.data?.message || "Something went wrong during signup";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
            });
            return { success: false, message: errorMessage };
        }
    };

    const logout = async () => {
        try {
            await api.post("/Auth/logout");
            toast.success("Logged out successfully", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Error during logout", {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setAccessToken(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};