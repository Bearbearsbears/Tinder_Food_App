import React, { useState } from "react";

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    console.log({ notifications, darkMode, autoUpdate });
    alert("Settings saved (logged to console)");
  }

  return (
    <div style={{ maxWidth: 700, margin: "24px auto", padding: 16 }}>
      <h1>Settings</h1>
      <form onSubmit={handleSave} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Enable notifications</span>
          <input type="checkbox" checked={notifications} onChange={() => setNotifications(v => !v)} />
        </label>

        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Dark mode</span>
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(v => !v)} />
        </label>

        <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Auto-update</span>
          <input type="checkbox" checked={autoUpdate} onChange={() => setAutoUpdate(v => !v)} />
        </label>

        <button type="submit" style={{ padding: "10px 14px" }}>
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default Settings;