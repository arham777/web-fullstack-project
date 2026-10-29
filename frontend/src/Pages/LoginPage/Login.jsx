import { useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the path user tried to access, or default to home
  const from = location.state?.from?.pathname || "/home";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", usernameRef.current.value);

      // Set default authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
      
      // Update authentication state
      setIsAuthenticated(true);
      
      navigate(from, { replace: true });
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="signup-link">
        Don't have an account?{" "}
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
