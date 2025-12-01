// src/App.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/client";

import { PLACES } from "./places.js";
import Login from "./Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const current = PLACES[index];

  const handleSwipe = (dir) => {
    if (!current) return;
    console.log(`Pressed ${dir} on`, current.name);
    setIndex((i) => i + 1);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700"
      >
        Sign out
      </button>

      {current ? (
        <>
          <div className="w-80 bg-zinc-800 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={current.img}
              alt={current.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{current.name}</h2>
              <p className="text-sm text-zinc-400">{current.cuisine}</p>
              <p className="text-sm text-zinc-400">
                {current.price} • ⭐ {current.rating}
              </p>
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
  );
}
