import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useSwipe from "./swipe.js";
import Login from "./Login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ProfileScreen } from "./ProfileScreen";
import Settings from "./Settings";
import Sort from "./sort";

// Yelp API Key
const YELP_API_KEY =
  "lpNiV557Qvw3rchNjF0I-Xrfdsj31w8yzu8_pP5tTOYak1KofQ0s4ueHNoWrbZ8RmYoTHQhgeeZ18QIOzTu6tIag7_VR52q-dFFJIIeR8DkDhv6BxFVO9CfjU7EsaXYx";

// Yelp Search endpoint
const YELP_SEARCH_URL =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

// HOME SCREEN (main app UI)
function HomeScreen({ user, favorites, setFavorites }) {
  const [zip, setZip] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);

  // Meal filter state
  const [filter, setFilter] = useState("all");

  // Map filter → Yelp category string
  const getCategoriesForFilter = (filter) => {
    switch (filter) {
      case "Breakfast":
        return "breakfast_brunch,cafes,coffee,donuts,bagels,bakeries";
      case "Lunch":
        return "sandwiches,burgers,pizza,mexican,salad,vegan,vegetarian,hotdogs,chinese,japanese,thai";
      case "Dinner":
        return "restaurants";
      default: // "all"
        return "restaurants";
    }
  };

  // Current restaurant card
  const current = restaurants[index] || null;

  // Save entire favorites array to Firestore
  const saveFavoritesToFirestore = async (items) => {
    if (!user) return;
    try {
      const ref = doc(db, "favorites", user.uid);
      console.log("Saving favorites to Firestore:", items);
      await setDoc(ref, { items });
    } catch (err) {
      console.error("Error saving favorites to Firestore:", err);
    }
  };

  // Reset favorites (state + Firestore only)
  const resetFavorites = async () => {
    if (!user) return;
    const empty = [];
    setFavorites(empty);
    await saveFavoritesToFirestore(empty);
  };

  //Filter Items
  const filterResturaunts = (cat) => {
    const NewRest=
    
  }

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

      const categoriesParam = getCategoriesForFilter(filter);

      const res = await fetch(
        `${YELP_SEARCH_URL}?location=${encodeURIComponent(
          zip
        )}&categories=${categoriesParam}&limit=8`,
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

      const businesses = data.businesses || [];

      const mapped = businesses.map((b) => {
        const fullAddress =
          b.location?.display_address?.join(", ") ||
          b.location?.address1 ||
          "Address not available";

        return {
          id: b.id,
          name: b.name,
          img: b.image_url,
          cuisine:
            b.categories?.map((c) => c.title).join(", ") || "Restaurant",
          price: b.price || "$$",
          rating: b.rating,
          address: fullAddress,
          mealType: filter === "all" ? null : filter,
        };
      });

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

        const updated = [...prev, current];
        // Save full updated array to Firestore (non-blocking)
        saveFavoritesToFirestore(updated);
        return updated;
      });
    }

    setIndex((i) => i + 1);
  };

  const swipeHandlers = useSwipe(
    () => handleSwipe("left"),
    () => handleSwipe("right")
  );

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start text-white p-6"
      style={{
        background: "linear-gradient(135deg, #000000, #330000, #000000)",
        fontFamily:
          "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="w-full flex justify-between mb-6">
        <button
          onClick={() => setShowFavorites((prev) => !prev)}
          className={
            showFavorites
              ? "px-4 py-2 bg-zinc-700 rounded-lg hover:bg-zinc-600"
              : "px-4 py-2 bg-emerald-700 rounded-lg hover:bg-emerald-600"
          }
        >
          {showFavorites ? "Home" : `Favorites (${favorites.length})`}
        </button>

        <button
          onClick={logOut}
          className="px-4 py-2 bg-rose-700 rounded-lg hover:bg-rose-600"
        >
          Log Out
        </button>
      </div>

      {showFavorites ? (
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Your Favorites</h1>

          {favorites.length === 0 ? (
            <p className="text-zinc-300 text-center">No favorites yet</p>
          ) : (
            <>
              <div className="flex justify-end mb-3">
                <button
                  onClick={resetFavorites}
                  className="px-3 py-1 text-sm bg-zinc-700 hover:bg-zinc-600 rounded-lg"
                >
                  Reset Favorites
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {favorites.map((item, i) => (
                  <div
                    key={item.id || i}
                    className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg select-none"
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
                      <p className="text-sm text-zinc-400 mt-1">
                        {item.address}
                      </p>
                      {item.mealType && (
                        <p className="text-xs text-zinc-500 mt-1">
                          {item.mealType}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="w-full max-w-md mb-4 flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 text-white"
              placeholder="Enter ZIP code..."
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />

            <button
              onClick={fetchRestaurants}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
              Search
            </button>
          </div>

          {/* Sort buttons (Breakfast / Lunch / Dinner / All) */}
          <div className="w-full max-w-md mb-4">
            <Sort onFilterChange={setFilter} />
          </div>

          {error && (
            <p className="text-sm text-rose-400 mb-4 text-center max-w-md">
              {error}
            </p>
          )}

          {loadingRestaurants && (
            <p className="text-zinc-300 mb-4">Loading restaurants…</p>
          )}

          {current ? (
            <>
              <div
                className="
                  w-96 bg-zinc-900 rounded-2xl overflow-hidden shadow-lg
                  select-none cursor-grab active:cursor-grabbing
                "
                {...swipeHandlers}
              >
                <img
                  src={current.img}
                  alt={current.name}
                  className="w-full h-80 object-cover"
                  draggable={false}
                />
                <div className="p-4 select-none">
                  <h2 className="text-xl font-bold">{current.name}</h2>
                  <p className="text-sm text-zinc-400">{current.cuisine}</p>
                  <p className="text-sm text-zinc-400">
                    {current.price} • ⭐ {current.rating}
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">
                    {current.address}
                  </p>
                  {current.mealType && (
                    <p className="text-xs text-zinc-500 mt-1">
                      {current.mealType}
                    </p>
                  )}
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
                  ✅
                </button>
              </div>
            </>
          ) : (
            <p className="text-zinc-300 mt-10 text-center">
              {restaurants.length === 0
                ? "Enter a ZIP code, pick a meal, and press Search."
                : "No more restaurants. Try another ZIP or change the filter!"}
            </p>
          )}
        </>
      )}
    </div>
  );
}

// MAIN APP (auth + router + favorites state)
export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [favorites, setFavorites] = useState([]);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  // Load favorites from Firestore whenever user logs in
  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      try {
        const ref = doc(db, "favorites", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          console.log("Loaded favorites from Firestore:", data);
          setFavorites(data.items || []);
        } else {
          console.log("No favorites doc yet for this user");
          setFavorites([]);
        }
      } catch (err) {
        console.error("Error loading favorites from Firestore:", err);
      }
    };

    loadFavorites();
  }, [user]);

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{
          background: "linear-gradient(135deg, #000000, #330000, #000000)",
          fontFamily:
            "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <nav className="w-full bg-zinc-900 text-white px-6 py-3 flex justify-center gap-10 shadow-md">
        <Link to="/" className="hover:text-zinc-300">
          Home
        </Link>
        <Link to="/profile" className="hover:text-zinc-300">
          Profile
        </Link>
        <Link to="/settings" className="hover:text-zinc-300">
          Settings
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen
              user={user}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
