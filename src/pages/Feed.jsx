import React, { useEffect, useState } from "react";
import { api } from "../api.js";
import PostCard from "../components/PostCard.jsx";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.get("/api/posts/feed");
      setPosts(data);
    } catch (e) {
      setErr(e?.response?.data?.error || "Load feed failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="grid">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>Feed</h2>
        <button className="btn2" onClick={load} disabled={loading}>{loading ? "..." : "Refresh"}</button>
      </div>

      {err && <div className="card" style={{ borderColor: "#ff7b7b" }}>{err}</div>}
      {!err && posts.length === 0 && !loading && <div className="card">Chưa có bài nào.</div>}

      {posts.map((p) => (
        <PostCard key={p._id} post={p} onChanged={load} />
      ))}
    </div>
  );
}