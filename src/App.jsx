import { useState } from "react"
import { PLACES } from "./places.js"
import useSwipe from "./swipe.js"

export default function App() {
  const [index, setIndex] = useState(0)
  const current = PLACES[index]

  const handleSwipe = (dir) => {
    console.log(`Pressed ${dir} on`, current.name)
    setIndex((i) => i + 1)
  }

  const swipeHandlers = useSwipe(
    () => handleSwipe("left"),  
    () => handleSwipe("right")  
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white"
      {...swipeHandlers}>
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
