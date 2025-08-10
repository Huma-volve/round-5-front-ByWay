import { Routes , Route, BrowserRouter as Router} from 'react-router-dom'
export default function AppRoutes() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Routes>
      </Router>
  )
}
