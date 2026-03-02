import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import LandingPage from "./pages/LandingPage"
import ValidatePage from "./pages/ValidatePage"
import ResultsPage from "./pages/ResultsPage"
import AnalyzingPage from "./pages/AnalyzingPage" // ✅ NEW IMPORT

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/validate" element={<ValidatePage />} />
          <Route path="/analyzing" element={<AnalyzingPage />} /> {/* ✅ NEW ROUTE */}
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}