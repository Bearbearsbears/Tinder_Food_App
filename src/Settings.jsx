import React, { useState } from "react";
export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    console.log({ notifications, darkMode, autoUpdate });
    alert("Settings saved");
  }

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
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 18px 40px rgba(0,0,0,0.9)",
          border: "1px solid #ff1a1a88",
        }}
      >

        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
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
            Settings
          </h1>
          <p
            style={{
              color: "#cccccc",
              fontSize: "0.9rem",
              marginTop: "0.5rem",
              fontWeight: 600,
            }}
          >
            Tweak how BiteSwipe behaves on your device.
          </p>
        </div>


        <form
          onSubmit={handleSave}
          style={{
            display: "grid",
            gap: "0.9rem",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 0.5rem",
              borderRadius: "0.75rem",
              backgroundColor: "#090911",
              border: "1px solid #262633",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  color: "#f4f4f4",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                Enable notifications
              </span>
              <span
                style={{
                  display: "block",
                  color: "#9a9aa5",
                  fontSize: "0.8rem",
                  marginTop: "0.15rem",
                }}
              >
                Get alerts about new matches and suggestions.
              </span>
            </div>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications((v) => !v)}
              style={{ width: 18, height: 18 }}
            />
          </div>


          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 0.5rem",
              borderRadius: "0.75rem",
              backgroundColor: "#090911",
              border: "1px solid #262633",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  color: "#f4f4f4",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                Dark mode
              </span>
              <span
                style={{
                  display: "block",
                  color: "#9a9aa5",
                  fontSize: "0.8rem",
                  marginTop: "0.15rem",
                }}
              >
                Match the app with your night-time browsing.
              </span>
            </div>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode((v) => !v)}
              style={{ width: 18, height: 18 }}
            />
          </div>


          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 0.5rem",
              borderRadius: "0.75rem",
              backgroundColor: "#090911",
              border: "1px solid #262633",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  color: "#f4f4f4",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                Enable Favorites Tab
              </span>
              <span
                style={{
                  display: "block",
                  color: "#9a9aa5",
                  fontSize: "0.8rem",
                  marginTop: "0.15rem",
                }}
              >
                Save favorited restaurants.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoUpdate}
              onChange={() => setAutoUpdate((v) => !v)}
              style={{ width: 18, height: 18 }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "0.8rem",
              width: "100%",
              border: "none",
              borderRadius: "0.8rem",
              padding: "0.9rem 1rem",
              background:
                "linear-gradient(135deg, #ff1b2f, #b30011, #ff1b2f)",
              color: "#ffffff",
              fontSize: "0.98rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              cursor: "pointer",
              boxShadow: "0 14px 26px rgba(255, 27, 47, 0.6)",
            }}
          >
            Save settings
          </button>
        </form>
      </div>
    </div>
  );
}
export default Settings;
