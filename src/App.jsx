import React, { useEffect, useMemo, useState } from "react";
import { setAuthToken } from "./api.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Feed from "./pages/Feed.jsx";
import Upload from "./pages/Upload.jsx";

function getSavedAuth() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  return { token, username };
}

export default function App() {
  const [route, setRoute] = useState("feed"); // feed | upload | login | register
  const [auth, setAuth] = useState(() => getSavedAuth());

  const isAuthed = useMemo(() => !!auth.token, [auth.token]);

  useEffect(() => {
    setAuthToken(auth.token || null);
  }, [auth.token]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuth({ token: null, username: null });
    setRoute("login");
  }

  return (
    <>
      <div className="topbar">
        <div className="nav">
          <strong style={{ cursor: "pointer" }} onClick={() => setRoute("feed")}>
            Instagram MVP
          </strong>

          <div className="row">
            {isAuthed ? (
              <>
                <span className="muted">@{auth.username}</span>
                <button className="btn2" onClick={() => setRoute("upload")}>Upload</button>
                <button className="btn2" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <button className="btn2" onClick={() => setRoute("login")}>Login</button>
                <button className="btn2" onClick={() => setRoute("register")}>Register</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {!isAuthed && route === "login" && (
          <Login onSuccess={(a) => { setAuth(a); setRoute("feed"); }} onGoRegister={() => setRoute("register")} />
        )}

        {!isAuthed && route === "register" && (
          <Register onSuccess={(a) => { setAuth(a); setRoute("feed"); }} onGoLogin={() => setRoute("login")} />
        )}

        {isAuthed && route === "upload" && <Upload onDone={() => setRoute("feed")} />}

        {isAuthed && route === "feed" && <Feed />}
        {!isAuthed && route === "feed" && (
          <div className="card">
            <div>Bạn chưa đăng nhập.</div>
            <div className="spacer" />
            <button className="btn" onClick={() => setRoute("login")}>Đi tới Login</button>
          </div>
        )}
      </div>
    </>
  );
}