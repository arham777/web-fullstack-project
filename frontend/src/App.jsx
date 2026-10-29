import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";
import Header from "./Components/Header/Header";
import PortraitPage from "./Pages/PortraitPage/PortraitPage";
import WeddingPage from "./Pages/WeddingPage/WeddingPage";
import NaturePage from "./Pages/NaturePage/NaturePage";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    
    // Add event listener for custom logout event
    window.addEventListener('logout', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('logout', checkAuth);
    };
  }, []);

  return (
    <Router>
      <div className="font-roboto">
        {isAuthenticated && (
          <section className="mx-4 md:mx-8 lg:mx-12">
            <Header setIsAuthenticated={setIsAuthenticated} />
          </section>
        )}

        <Routes>
          {/* Public routes */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/signup" 
            element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} 
          />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/portraits"
            element={
              <ProtectedRoute>
                <PortraitPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weddings"
            element={
              <ProtectedRoute>
                <WeddingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nature"
            element={
              <ProtectedRoute>
                <NaturePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route 
            path="*" 
            element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
