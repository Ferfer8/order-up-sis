import { Routes, Route, Outlet, useNavigate } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AppetizerPage from "./pages/AppetizerPage"
import SpoonCursor from "./components/SpoonCursor"

// Every page nested under this layout gets the spoon cursor
function CoursePagesLayout() {
  return (
    <>
      <SpoonCursor />
      <Outlet />
    </>
  )
}

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage onStart={() => navigate("/appetizer")} />}
      />
      <Route element={<CoursePagesLayout />}>
        <Route path="/appetizer" element={<AppetizerPage />} />
      </Route>
    </Routes>
  )
}

export default App
