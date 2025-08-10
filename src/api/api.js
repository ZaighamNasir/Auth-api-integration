import axios from "axios";

const API_BASE = "https://os-project-server.vercel.app";

// Register
export const registerUser = async (name, email, password) => {
  const res = await axios.post(`${API_BASE}/auth/newuser`, {
    username: name,
    email,
    password,
  });
  return res.data;
};

// Login with email + password
export const loginUser = async (email, password) => {
  const res = await axios.post(`${API_BASE}/auth/existinguser`, {
    email,
    password,
  });
  return res.data;
};
