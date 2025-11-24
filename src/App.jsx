import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

import { PLACES } from "./places.js";
import Login from "./Login";

export default function App() {
  // Firebase Login State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Restaurant Swiping State ---
  const [index, setIndex] = useState(0);                 // current card index
  const [favorites, setFavorites] = useState([]);        // list of liked restaurants
  const [showFavorites, setShowFavorites] = useState(false); // toggle Favorites page

  const current = PLACES[index]; // restaurant currently being shown

  // Firebase Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Loading…
      </div>
    );
  }

  // If not logged in show Login
  if (!user) return <Login />;

  // Handle Swipe Logic
  const handleSwipe = (dir) => {
    console.log(`Pressed ${dir} on`, current.name);

    // If swipes right then adds to favorites
    if (dir === "right") {
      setFavorites((prev) => [...prev, current]);
    }

    // Move to next restaurant
    setIndex((i) => i + 1);
  };

  // Logouts
  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-zinc-900 text-white p-6">

      {/* Top Navigation Buttons */}
      <div className="w-full flex justify-between mb-6">
        <button
          onClick={() => setShowFavorites(false)}
          className="px-4 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600"
        >
          Home
        </button>

        <button
          onClick={() => setShowFavorites(true)}
          className="px-4 py-2 bg-emerald-700 rounded-lg hover:bg-emerald-600"
        >
          Favorites ({favorites.length})
        </button>

        <button
          onClick={logOut}
          className="px-4 py-2 bg-rose-700 rounded-lg hover:bg-rose-600"
        >
          Log Out
        </button>
      </div>

      {/* Favorites Page */}
      {showFavorites ? (
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Your Favorites</h1>

          {favorites.length === 0 ? (
            <p className="text-zinc-400 text-center">No favorites yet 😔</p>
          ) : (
            <div className="flex flex-col gap-4">
              {favorites.map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg"
                >
                  <img src={item.img} alt={item.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-sm text-zinc-400">{item.cuisine}</p>
                    <p className="text-sm text-zinc-400">{item.price} • ⭐ {item.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      ) : (
        // Main Swiping Card
        <>
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

              {/* Swipe Buttons */}
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
            <p className="text-zinc-400 mt-20">No more restaurants</p>
          )}
        </>
      )}
    </div>
  );
}
