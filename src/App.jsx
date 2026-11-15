// Routes for every page, plus the picks state they all share
import { useCallback, useEffect, useRef, useState } from "react"
import { Routes, Route, Outlet, useLocation, useNavigate } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AppetizerPage from "./pages/AppetizerPage"
import RicePage from "./pages/RicePage"
import ProteinPage from "./pages/ProteinPage"
import SidePage from "./pages/SidePage"
import DessertPage from "./pages/DessertPage"
import OrderPage from "./pages/OrderPage"
import SpoonCursor from "./components/SpoonCursor"
import RotatePrompt from "./components/RotatePrompt"
import useIsTouch from "./hooks/useIsTouch"
import { clearProgress, loadProgress, saveProgress } from "./utils/progressStorage"
import { applyTouchScale } from "./utils/touchScale"

// Wraps the course pages: adds the spoon cursor and shares setSpoonSrc,
// bounceSpoon, selections and setSelection through useOutletContext()
function CoursePagesLayout({ selections, setSelection }) {
  const [spoonSrc, setSpoonSrc] = useState(null)
  const [spoonBounces, setSpoonBounces] = useState(0)
  const bounceSpoon = useCallback(() => setSpoonBounces((count) => count + 1), [])

  return (
    <>
      <SpoonCursor src={spoonSrc ?? undefined} bounceKey={spoonBounces} />
      <Outlet context={{ setSpoonSrc, bounceSpoon, selections, setSelection }} />
    </>
  )
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const isTouch = useIsTouch()

  // Touch screens only: shrink the page to fit, and redo it on rotate or page change
  useEffect(() => {
    if (!isTouch) return
    const update = () => applyTouchScale(location.pathname)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [isTouch, location.pathname])

  // Whatever was saved before a refresh (null if nothing usable)
  const [savedProgress] = useState(loadProgress)

  // Picks per course, one dish name per slot, e.g.
  // { starter: { dish: "Small chops" }, "main-course": { rice: "Jollof rice", protein: "Chicken" } }
  const [selections, setSelections] = useState(() => savedProgress?.selections ?? {})

  // Saves a pick, or removes it when name is null
  const setSelection = useCallback((course, slot, name) => {
    setSelections((previous) => {
      const picks = { ...previous[course] }
      if (name) {
        picks[slot] = name
      } else {
        delete picks[slot]
      }
      return { ...previous, [course]: picks }
    })
  }, [])

  // After a refresh, jump back to the saved page (the plates refill from selections).
  // The ref stops this running twice in StrictMode
  const hasRestored = useRef(false)
  useEffect(() => {
    if (hasRestored.current) return
    hasRestored.current = true
    if (savedProgress?.path && savedProgress.path !== location.pathname) {
      navigate(savedProgress.path, { replace: true })
    }
  }, [savedProgress, location.pathname, navigate])

  // Keep sessionStorage in sync. Nothing picked + on the landing page = nothing to save
  useEffect(() => {
    if (Object.keys(selections).length === 0 && location.pathname === "/") {
      clearProgress()
    } else {
      saveProgress({ selections, path: location.pathname })
    }
  }, [selections, location.pathname])

  return (
    <>
    <RotatePrompt />
    <Routes>
      <Route
        path="/"
        element={<LandingPage onStart={() => navigate("/appetizer")} />}
      />
      {/* Paths match STEPS in data/courses.js */}
      <Route
        element={
          <CoursePagesLayout selections={selections} setSelection={setSelection} />
        }
      >
        <Route path="/appetizer" element={<AppetizerPage />} />
        <Route path="/main-course/rice" element={<RicePage />} />
        <Route path="/main-course/protein" element={<ProteinPage />} />
        <Route path="/main-course/side" element={<SidePage />} />
        <Route path="/dessert" element={<DessertPage />} />
      </Route>
      <Route
        path="/order"
        element={
          <OrderPage
            selections={selections}
            // Send it back to the kitchen: wipe everything and start again
            onStartOver={() => {
              clearProgress()
              setSelections({})
              navigate("/")
            }}
          />
        }
      />
    </Routes>
    </>
  )
}

export default App
