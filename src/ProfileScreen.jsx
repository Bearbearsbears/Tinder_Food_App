import React, { useState } from "react";

export function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  function handleSave(e) {
    e.preventDefault();
    console.log({ name, email, bio });
    alert("Profile saved (logged to console)");
  }

  return (
    <div style={{ maxWidth: 700, margin: "24px auto", padding: 16 }}>
      <h1>Profile</h1>
      <form onSubmit={handleSave} style={{ display: "grid", gap: 12 }}>
        <label>
          Display name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            style={{ display: "block", width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Bio
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short bio"
            style={{ display: "block", width: "100%", padding: 8 }}
            rows={4}
          />
        </label>

        <button type="submit" style={{ padding: "10px 14px" }}>
          Save Profile
        </button>
      </form>
    </div>
  );
}