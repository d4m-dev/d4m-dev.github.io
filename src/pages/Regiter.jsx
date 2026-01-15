import React, { useState } from "react";
import { api, setAuthToken } from "../api.js";

export default function Register({ onSuccess, onGoLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", { username, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      setAuthToken(data.token);
      onSuccess({ token: data.token, username: data.username });
    } catch (e2) {
      setErr(e2?.response?.data?.error || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Register</h2>
      <form className="grid" onSubmit={submit}>
        <input className="input" placeholder="username (>=3 ký tự)" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {err && <div style={{ color: "#ff7b7b" }}>{err}</div>}
        <button className="btn" disabled={loading}>{loading ? "..." : "Create account"}</button>
      </form>
      <div className="spacer" />
      <button className="btn2" onClick={onGoLogin}>Đã có tài khoản? Login</button>
    </div>
  );
}