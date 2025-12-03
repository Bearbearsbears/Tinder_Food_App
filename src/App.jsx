import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import { PLACES } from "./places.js";
import Login from "./Login";

import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ProfileScreen } from "./ProfileScreen";
import { SettingsScreen } from "./SettingsScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Loading…
      </div>
    );
  }

  if (!user) return <Login />;
}  
export default function App() {
  const [index, setIndex] = useState(0)
  const current = PLACES[index]

  const handleSwipe = (dir) => {
    console.log(`Pressed ${dir} on`, current.name)
    setIndex((i) => i + 1)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
      {current ? (
        <>
          <div className="w-80 bg-zinc-800 rounded-2xl overflow-hidden shadow-lg">
            <img src={current.img} alt={current.name} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{current.name}</h2>
              <p className="text-sm text-zinc-400">{current.cuisine}</p>
              <p className="text-sm text-zinc-400">{current.price} • ⭐ {current.rating}</p>
              <p className="text-sm mt-2">{current.desc}</p>
            </div>
          </div>

          <div className="flex gap-8 mt-6">
            <button
              onClick={() => handleSwipe("left")}
              className="h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center text-2xl shadow-lg"
            >
              ✖
            </button>
            <button
              onClick={() => handleSwipe("right")}
              className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-2xl shadow-lg"
            >
              ✅️
            </button>
          </div>
        </>
      ) : (
        <p className="text-zinc-400">No more restaurants</p>
      )}
    </div>
  )
}
export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12 }}>
        <Link to="/profile" style={{ marginRight: 12 }}>Profile</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<div style={{padding:20}}>Open <Link to="/profile">Profile</Link> or <Link to="/settings">Settings</Link></div>} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}