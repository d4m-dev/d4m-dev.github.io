import React, { useState } from "react";
import { api } from "../api.js";

export default function Upload({ onDone }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(""); setOk("");
    if (!file) { setErr("Chọn ảnh trước."); return; }
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("caption", caption);

      await api.post("/api/posts", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setOk("Upload thành công!");
      setCaption("");
      setFile(null);
      setTimeout(() => onDone?.(), 500);
    } catch (e2) {
      setErr(e2?.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Create post</h2>
      <form className="grid" onSubmit={submit}>
        <input className="input" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <textarea className="textarea" placeholder="Caption..." value={caption} onChange={(e) => setCaption(e.target.value)} />
        {err && <div style={{ color: "#ff7b7b" }}>{err}</div>}
        {ok && <div style={{ color: "#7bffb0" }}>{ok}</div>}
        <button className="btn" disabled={loading}>{loading ? "..." : "Post"}</button>
      </form>
    </div>
  );
}