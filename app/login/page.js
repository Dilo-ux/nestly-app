"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setStatus({ type: "error", message: error.message });
    } else {
      window.location.href = "/listings";
    }
  }

  return (
    <div className="container">
      <nav>
        <a href="/" className="logo">Nestly</a>
      </nav>

      <div className="form-wrap">
        <h1>Sign in</h1>
        <p className="form-subtitle">Welcome back.</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {status && <p className="form-error">{status.message}</p>}

        <p className="form-footer">
          Don't have an account? <a href="/signup">Create one</a>
        </p>
      </div>
    </div>
  );
}
