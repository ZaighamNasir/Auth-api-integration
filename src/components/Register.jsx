import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api"; // ✅ Import API

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const particles = Array.from({ length: 15 });

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser(name, email, password);
      console.log("Registration successful:", res);
      alert("Account created successfully!");
      navigate("/"); // Redirect to login
    } catch (err) {
      console.error("Register error:", err.response?.data || err);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
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
            "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.05) 0%, transparent 20%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.2 + Math.random() * 0.5,
            scale: 0.5 + Math.random(),
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

      {/* Register Card */}
      <motion.div
        className="bg-white/10 p-8 rounded-2xl shadow-lg backdrop-blur-md w-96 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg"
          onClick={handleRegister} // ✅ wired up
        >
          Register
        </motion.button>

        <p className="text-gray-300 text-sm text-center mt-4">
          Already have an account?{" "}
          <button
            className="text-purple-400 hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
}
