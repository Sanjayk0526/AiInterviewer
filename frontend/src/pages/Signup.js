import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    await api.post("/auth/signup", {
      name,
      email,
      password
    });

    alert("Signup successful. Please login.");
    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <div className="card login-card">
        <h2>HR Registration</h2>

        <input
          placeholder="Full Name"
          className="mb-3"
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          className="mb-3"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={signup}>
          Create Account
        </button>

        <p className="small-text">
          Already registered?{" "}
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
