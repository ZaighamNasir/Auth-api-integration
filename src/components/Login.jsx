import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { jwtDecode } from "jwt-decode"; // ✅ fixed import

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const particles = Array.from({ length: 15 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://os-project-server.vercel.app/auth/existinguser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await res.json();
      const token = data.token;

      if (!token) {
        throw new Error("No token received from server");
      }

      // ✅ Save token
      localStorage.setItem("token", token);

      // ✅ Decode token
      let decoded;
      try {
        decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
      } catch (err) {
        throw new Error("Invalid token format");
      }

      // ✅ Redirect with decoded user data
      navigate("/dashboard", { state: { user: decoded } });

    } catch (err) {
      console.error("Login error:", err);
      alert(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] p-4"
    >
      {/* Background Glow Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.1) 0%, transparent 25%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 25%)",
          backgroundSize: "200% 200%",
          zIndex: 0,
        }}
      />

      {/* Floating Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.1 + Math.random() * 0.3,
            scale: 0.5 + Math.random(),
            backgroundColor: `rgba(14, 165, 233, ${0.3 + Math.random() * 0.3})`,
          }}
          animate={{
            y: [null, -100],
            opacity: [null, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Card container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold text-cyan-400 text-center mb-6 drop-shadow-lg"
        >
          Welcome Back
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-cyan-300 font-medium mb-1">
              Username
            </label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-center bg-black/30 rounded-lg px-3 border border-transparent focus-within:border-cyan-400 transition"
            >
              <FaUser className="text-cyan-300 opacity-80 mr-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none"
                required
              />
            </motion.div>
          </motion.div>

          {/* Password field */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-pink-300 font-medium mb-1">
              Password
            </label>
            <motion.div
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="flex items-center bg-black/30 rounded-lg px-3 border border-transparent focus-within:border-pink-400 transition"
            >
              <FaLock className="text-pink-300 opacity-80 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent text-white placeholder-gray-400 py-2 focus:outline-none"
                required
              />
            </motion.div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex justify-between text-sm text-gray-300"
          >
            <Link
              to="/change-password"
              className="hover:text-cyan-400 transition"
            >
              Forgot password?
            </Link>
            <Link to="/register" className="hover:text-pink-400 transition">
              Don’t have an account? Register now!
            </Link>
          </motion.div>

          {/* Sign In button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 12px rgba(34,211,238,0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white py-2 rounded-lg shadow-lg font-semibold transition-all"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
