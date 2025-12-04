import React, { useState } from "react";
export function ProfileScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  function handleSave(e) {
    e.preventDefault();

    const profileData = {
      firstName,
      lastName,
      email,
      bio,
    };

    console.log("Profile data:", profileData);
    setMessage("Profile saved");

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
            Profile
          </h1>
          <p
            style={{
              color: "#cccccc",
              fontSize: "0.9rem",
              marginTop: "0.5rem",
              fontWeight: 600,
            }}
          >
            Update your BiteSwipe info so we know who&apos;s swiping.
          </p>
        </div>


        {message && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "0.7rem 0.9rem",
              borderRadius: "0.75rem",
              backgroundColor: "#041307",
              border: "1px solid #2ecc71",
              color: "#c8f7dc",
              fontSize: "0.86rem",
              fontWeight: 700,
            }}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSave}
          style={{
            display: "grid",
            gap: "0.85rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
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
                First name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First"
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
                Last name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
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
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Foods you love? Allergies?"
              rows={4}
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
                resize: "vertical",
              }}
            />
          </div>

       
          <button
            type="submit"
            style={{
              marginTop: "0.6rem",
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
            Save profile
          </button>
        </form>
      </div>
    </div>
  );
}
