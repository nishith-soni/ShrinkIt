import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import { Toaster } from "react-hot-toast";
import LoginPage from "./components/LoginPage.jsx";
import DashboardLayout from "./Dashboard/DashboardLayout.jsx";
import ShortenUrlPage from "./components/ShortenUrlPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const AppRouter = () => {
    return (
        <>
        <NavBar />
        <Toaster position='bottom-center'/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
          <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
          <Route path="/error" element={<ErrorPage message={"Page not found"} />} />
          <Route path="*" element={<ErrorPage message={"Page not found"} />} />
        </Routes>
        <Footer />
      </>
    );
}


export default AppRouter;

export const SubDomainRouter = () => {
    return (
        <Routes>
          <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}