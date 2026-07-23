"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SignUp() {
  const [role, setRole] = useState("tenant");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    setLoading(false);

    if (error) {
      setStatus({ type: "error", message: error.message });
    } else {
      setStatus({
        type: "success",
        message:
          "Account created. Check your email to confirm, then sign in.",
      });
    }
  }

  return (
    <div className="container">
      <nav>
        <a href="/" className="logo">Nestly</a>
      </nav>

      <div className="form-wrap">
        <h1>Create your account</h1>
        <p className="form-subtitle">Choose how you'll be using Nestly.</p>

        <div className="role-toggle">
          <button
            type="button"
            className={role === "tenant" ? "role-btn active" : "role-btn"}
            onClick={() => setRole("tenant")}
          >
            I'm a tenant
          </button>
          <button
            type="button"
            className={role === "landlord" ? "role-btn active" : "role-btn"}
            onClick={() => setRole("landlord")}
          >
            I'm a landlord
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

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
            minLength={6}
            required
          />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {status && (
          <p className={status.type === "error" ? "form-error" : "form-success"}>
            {status.message}
          </p>
        )}

        <p className="form-footer">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}
