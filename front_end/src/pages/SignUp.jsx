import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function SignUp({ }) {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const HandleSignUp = () => {}


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="p-4 border rounded shadow-lg bg-white" style={{ width: "350px" }}>
            <div className="mb-3">
              <label className="form-label">
                Username
              </label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3 " >
              <label className="form-label">
                Password
              </label>
              <div className="mb-3 d-flex">
              <input
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}a
                className="form-control"
                placeholder="Password"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              </div>
              
            </div>
    
            <div>
              {errorMessage}
            </div>
    
            <div className="d-flex flex-column justify-content-center align-items-center">
              <button 
              type="button" 
              className="btn btn-primary mb-2" 
              onClick={HandleSignUp}>
                Sign Up
              </button>
              <button 
              type="" 
              className="btn btn-link" 
              onClick={() => navigate("/login")}>
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
  );
}

