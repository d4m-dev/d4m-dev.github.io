import React, { useMemo, useState } from "react";
import { api } from "../api.js";

export default function PostCard({ post, onChanged }) {
  const [comment, setComment] = useState("");
  const [busy, setBusy] = useState(false);

  const myUsername = useMemo(() => localStorage.getItem("username"), []);
  const likesCount = post.likes?.length || 0;

  async function toggleLike() {
    setBusy(true);
    try {
      await api.post(`/api/posts/${post._id}/like`);
      onChanged?.();
    } finally {
      setBusy(false);
    }
  }

  async function addComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    setBusy(true);
    try {
      await api.post(`/api/posts/${post._id}/comment`, { text: comment.trim() });
      setComment("");
      onChanged?.();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <strong>@{post.username}</strong>
          <div className="muted small">{new Date(post.createdAt).toLocaleString()}</div>
        </div>
        <button className="btn2" onClick={toggleLike} disabled={busy}>
          ❤️ Like ({likesCount})
        </button>
      </div>

      <div className="spacer" />
      <img className="post-img" src={post.imageUrl} alt="post" />
      <div className="spacer" />

      {post.caption && <div className="small"><span className="muted">@{post.username}</span> {post.caption}</div>}

      <div className="spacer" />
      <div className="muted">Comments</div>
      <div className="spacer" />

      <form className="row" onSubmit={addComment}>
        <input
          className="input"
          placeholder={`Comment as @${myUsername || "you"}...`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="btn" disabled={busy}>Send</button>
      </form>

      <div className="spacer" />
      <div className="grid">
        {(post.comments || []).slice(0, 6).map((c) => (
          <div key={c._id} className="small">
            <strong>@{c.username}</strong> <span className="muted">{c.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}