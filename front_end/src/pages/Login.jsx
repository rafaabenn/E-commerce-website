import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({userState,setUserState,setLogin}) {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    //johnd
    //m38rmF$
    e.preventDefault();
    axios.post("https://fakestoreapi.com/auth/login", user)
      .then((response) => {
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        setUserState(user);
        setLogin(true);
        navigate('/'); // Navigate back to home after successful login
        window.location.reload();
      })
      .catch((error) => {
        console.error("Login failed:", error.response.data);
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded shadow-lg bg-white" style={{ width: "350px" }}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Username
          </label>
          <input
            type="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}a
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="inputPassword5"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="form-control"
              aria-describedby="passwordHelpBlock"
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

        <div className="d-flex flex-column align-items-center mt-3">
          <button type="button" className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
            Login
          </button>
          <button type="button" className="btn btn-link">
            Forget password?
          </button>
        </div>
      </div>
    </div>
  );
}
