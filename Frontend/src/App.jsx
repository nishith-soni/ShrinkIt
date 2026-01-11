import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import './App.css'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
