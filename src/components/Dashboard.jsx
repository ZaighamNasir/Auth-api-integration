import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (location.state?.user) {
      setUser(location.state.user);
    } else if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }

    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-black flex items-center justify-center p-8 overflow-hidden">
      {/* Loader circle animation */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 50, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "#7c3aed",
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 9999,
            }}
          />
        )}
      </AnimatePresence>

      {/* Dashboard content */}
      {!loading && (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl w-full space-y-6 text-white z-10"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
              Welcome, {user.username || user.name || "User"}!
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              Logout
            </button>
          </div>

          <p className="text-lg text-indigo-300">
            This is where your journey begins. Explore your data and customize your settings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-900 bg-opacity-70 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-3">Profile</h2>
              {Object.entries(user).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {String(value)}
                </p>
              ))}
            </div>

            <div className="bg-indigo-900 bg-opacity-70 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-3">Analytics</h2>
              <p>Review your stats and recent activities.</p>
            </div>

            <div className="bg-indigo-900 bg-opacity-70 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-3">Settings</h2>
              <p>Adjust your notifications and privacy options.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
