import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/upload");
  };

  return (
    <div className="login-wrapper">
      <div className="card login-card">
        <h2>HR Login</h2>

        <input
          placeholder="Email"
          className="mb-3"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
