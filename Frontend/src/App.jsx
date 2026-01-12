import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import RegisterPage from './components/RegisterPage.jsx'

function App() {
  return (
    <>
      <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
