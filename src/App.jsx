import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import useSwipe from "./swipe.js";
import Login from "./Login";

// Yelp API Key
const YELP_API_KEY = "lpNiV557Qvw3rchNjF0I-Xrfdsj31w8yzu8_pP5tTOYak1KofQ0s4ueHNoWrbZ8RmYoTHQhgeeZ18QIOzTu6tIag7_VR52q-dFFJIIeR8DkDhv6BxFVO9CfjU7EsaXYx";

// CORS Proxy
const YELP_BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

export default function App() {
  // Firebase Login State
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Yelp / Location State
  const [zip, setZip] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [error, setError] = useState("");

  // Swipe / Favorites State
  const [index, setIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const current = restaurants[index] || null;

  // Firebase Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // Yelp Fetch
  const fetchRestaurants = async () => {
    if (!zip) {
      setError("Enter a ZIP code.");
      return;
    }

    try {
      setError("");
      setLoadingRestaurants(true);
      setIndex(0);

      const res = await fetch(
        `${YELP_BASE_URL}?location=${encodeURIComponent(
          zip
        )}&categories=restaurants&limit=8`, // ask Yelp for 8
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log("Yelp data:", data);

      if (!res.ok || data.error) {
        throw new Error(
          data?.error?.description ||
            data?.error?.code ||
            "Failed to fetch restaurants"
        );
      }

      const mapped = data.businesses.map((b) => ({
        id: b.id,
        name: b.name,
        img: b.image_url,
        cuisine: b.categories?.map((c) => c.title).join(", ") || "Restaurant",
        price: b.price || "$$",
        rating: b.rating,
        desc: b.location?.address1 || "No description",
      }));

      // capped to 8 restaurants
      setRestaurants(mapped.slice(0, 8));
    } catch (err) {
      console.error(err);
      setError(err.message);
      setRestaurants([]);
    } finally {
      setLoadingRestaurants(false);
    }
  };

  // Swipe handler
  const handleSwipe = (dir) => {
    if (!current) return;

    console.log(`Swiped ${dir} on`, current.name);

    if (dir === "right") {
      setFavorites((prev) => {
        if (prev.some((p) => p.id === current.id)) return prev;
        return [...prev, current];
      });
    }

    setIndex((i) => i + 1);
  };

  // Hook up swipe.js
  const swipeHandlers = useSwipe(
    () => handleSwipe("left"),
    () => handleSwipe("right")
  );

  // Logout
  const logOut = async () => {
    await signOut(auth);
  };

  // Auth loading screen
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Loading…
      </div>
    );
  }

  // If not logged in, show Login component
  if (!user) {
    return <Login />;
  }

  // Main App after login
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-zinc-900 text-white p-6">
      {/* Navigation */}
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

      {showFavorites ? ( // This shows the favorites page
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Your Favorites</h1>

          {favorites.length === 0 ? (
            <p className="text-zinc-400 text-center">No favorites yet</p>
          ) : (
            <div className="flex flex-col gap-4">
              {favorites.map((item, i) => (
                <div
                  key={item.id || i}
                  className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg select-none"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                    draggable={false}
                  />
                  <div className="p-4 select-none">
                    <h2 className="text-xl font-bold">{item.name}</h2>
                    <p className="text-sm text-zinc-400">{item.cuisine}</p>
                    <p className="text-sm text-zinc-400">
                      {item.price} • ⭐ {item.rating}
                    </p>
                    <p className="text-sm mt-2">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="w-full max-w-md mb-6 flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-800 text-white"
              placeholder="Enter ZIP code..."
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              // Shows the input box to search zip codes
            />

            <button
              onClick={fetchRestaurants}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
              Search
            </button>
          </div>

          {error && ( // Error message
            <p className="text-sm text-rose-400 mb-4 text-center max-w-md">
              {error}
            </p>
          )}

          {loadingRestaurants && ( // Shows a loading message
            <p className="text-zinc-400 mb-4">Loading restaurants…</p>
          )}

          {current ? ( // Shows the main swiping card
            <>
              <div
                className="
                  w-80 bg-zinc-800 rounded-2xl overflow-hidden shadow-lg
                  select-none cursor-grab active:cursor-grabbing
                "
                {...swipeHandlers}
              >
                <img
                  src={current.img}
                  alt={current.name}
                  className="w-full h-60 object-cover"
                  draggable={false}
                />
                <div className="p-4 select-none">
                  <h2 className="text-xl font-bold">{current.name}</h2>
                  <p className="text-sm text-zinc-400">{current.cuisine}</p>
                  <p className="text-sm text-zinc-400">
                    {current.price} • ⭐ {current.rating}
                  </p>
                  <p className="text-sm mt-2">{current.desc}</p>
                </div>
              </div>

              {/* This shows the swipe buttons */}
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
                  ✅
                </button>
              </div>
            </>
          ) : (
            <p className="text-zinc-400 mt-10 text-center">
              {restaurants.length === 0
                ? "Enter a ZIP code and press Search."
                : "No more restaurants. Try another ZIP!"}
            </p>
          )}
        </>
      )}
    </div>
  );
}
