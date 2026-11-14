import { useCallback, useState } from "react"
import { Routes, Route, Outlet, useNavigate } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AppetizerPage from "./pages/AppetizerPage"
import MainCoursePage from "./pages/MainCoursePage"
import OrderPage from "./pages/OrderPage"
import SpoonCursor from "./components/SpoonCursor"

// Every page nested under this layout gets the spoon cursor.
// Pages get these through useOutletContext():
//   setSpoonSrc(path)                      change the spoon image (null = empty spoon)
//   bounceSpoon()                          make the spoon bounce back
//   selections                             everything picked so far (see App)
//   setSelection(course, slot, name|null)  save or clear one pick
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

  // What she's picked, per course. Each course holds one name per pick ("slot"),
  // so a course with several choices can store them all, e.g.
  //   {
  //     "starter":     { dish: "Small chops" },
  //     "main-course": { rice: "Jollof rice", protein: "Chicken", side: "Salad" },
  //   }
  const [selections, setSelections] = useState({})

  // Save a pick, or remove it when name is null
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

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage onStart={() => navigate("/appetizer")} />}
      />
      <Route
        element={
          <CoursePagesLayout selections={selections} setSelection={setSelection} />
        }
      >
        <Route path="/appetizer" element={<AppetizerPage />} />
        <Route path="/main-course" element={<MainCoursePage />} />
      </Route>
      <Route path="/order" element={<OrderPage selections={selections} />} />
    </Routes>
  )
}

export default App
