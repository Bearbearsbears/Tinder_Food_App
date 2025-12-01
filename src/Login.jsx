// src/Login.jsx
import { useState } from "react";
import { auth, googleProvider } from "./firebase/client";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [creating, setCreating] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignIn = async () => {
    setError("");
    if (!email || !pass) {
      setError("Please enter both email and password.");
      return;
    }
    setSigningIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setSigningIn(false);
    }
  };

  const handleCreateAccount = async () => {
    setError("");
    if (!email || !pass) {
      setError("Please enter both email and password.");
      return;
    }
    setCreating(true);
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      console.error("Create account error:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google sign in error:", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000, #330000, #000000)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily:
          "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#0b0b0f",
          borderRadius: "1.25rem",
          padding: "2.25rem 2.5rem",
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 18px 40px rgba(0,0,0,0.9)",
          border: "1px solid #ff1a1a88",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "999px",
              margin: "0 auto 1rem",
              border: "2px solid #ff1b2f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(255, 27, 47, 0.8)",
              fontWeight: 900,
              fontSize: "1.6rem",
              color: "#ff1b2f",
              backgroundColor: "#140005",
              letterSpacing: "0.15em",
            }}
          >
            
          </div>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "1.9rem",
              margin: 0,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 900,
            }}
          >
            Eater&apos;s Hack
          </h1>
          <p
            style={{
              color: "#cccccc",
              fontSize: "0.9rem",
              marginTop: "0.5rem",
              fontWeight: 600,
            }}
          >
            Log in or create an account to start swiping places nearby.
          </p>
        </div>

        {/* Error box */}
        {error && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "0.7rem 0.9rem",
              borderRadius: "0.75rem",
              backgroundColor: "#3b0006",
              border: "1px solid #ff4d5e",
              color: "#ffccd3",
              fontSize: "0.86rem",
              fontWeight: 700,
            }}
          >
            {error}
          </div>
        )}

        {/* Inputs */}
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            marginBottom: "1.1rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                color: "#f4f4f4",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 800,
              }}
            >
              Email
            </label>
            <input
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem 0.9rem",
                borderRadius: "0.7rem",
                border: "1px solid #3a3a3f",
                backgroundColor: "#050509",
                color: "#ffffff",
                fontSize: "0.95rem",
                fontWeight: 600,
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.25rem",
                color: "#f4f4f4",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 800,
              }}
            >
              Password
            </label>
            <input
              placeholder="••••••••"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={{
                width: "100%",
                padding: "0.8rem 0.9rem",
                borderRadius: "0.7rem",
                border: "1px solid #3a3a3f",
                backgroundColor: "#050509",
                color: "#ffffff",
                fontSize: "0.95rem",
                fontWeight: 600,
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Sign in button */}
        <button
          type="button"
          onClick={handleSignIn}
          disabled={signingIn}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "0.8rem",
            padding: "0.85rem 1rem",
            background:
              "linear-gradient(135deg, #ff1b2f, #b30011, #ff1b2f)",
            color: "#ffffff",
            fontSize: "0.98rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            cursor: signingIn ? "default" : "pointer",
            marginBottom: "0.5rem",
            boxShadow: "0 14px 26px rgba(255, 27, 47, 0.6)",
            opacity: signingIn ? 0.7 : 1,
          }}
        >
          {signingIn ? "Signing in..." : "Sign in"}
        </button>

        {/* Create account button */}
        <button
          type="button"
          onClick={handleCreateAccount}
          disabled={creating}
          style={{
            width: "100%",
            borderRadius: "0.8rem",
            padding: "0.8rem 1rem",
            backgroundColor: "#111119",
            border: "1px solid #3f3f4a",
            color: "#f4f4f4",
            fontSize: "0.9rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            cursor: creating ? "default" : "pointer",
            marginBottom: "0.9rem",
          }}
        >
          {creating ? "Creating..." : "Create account"}
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.85rem",
          }}
        >
          <div
            style={{ flex: 1, height: 1, backgroundColor: "#2d2d33" }}
          ></div>
          <span
            style={{
              color: "#8b8b96",
              fontSize: "0.76rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontWeight: 800,
            }}
          >
            or
          </span>
          <div
            style={{ flex: 1, height: 1, backgroundColor: "#2d2d33" }}
          ></div>
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={googleLoading}
          style={{
            width: "100%",
            borderRadius: "0.8rem",
            padding: "0.85rem 1rem",
            backgroundColor: "#191820",
            border: "1px solid #3f3f4a",
            color: "#ffffff",
            fontSize: "0.9rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            cursor: googleLoading ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
          }}
        >
          <span
            style={{
              backgroundColor: "#ffffff",
              color: "#db4437",
              borderRadius: "999px",
              width: "1.5rem",
              height: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              fontWeight: 900,
            }}
          >
            
          </span>
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}

