import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUser, FaEnvelope, FaLock, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    username: null,
    email: null,
    password: null
  });

  const [formData, setFormData] = useState({});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditing(false);
  };

  useEffect( ()=>{
    const apiUrl = process.env.REACT_APP_API_URL;
    const user =JSON.parse(localStorage.getItem('user'));
    console.log(user);
    axios.get(`${apiUrl}/users/ByUsername/${user.username}`)
    .then((res)=>{
      setUserData({
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        password: res.data.password
      })
      setFormData({
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        password: res.data.password
      })
      console.log(res)
      console.log("hello");
    }).catch((error)=>{
      console.error(error);
    })
  },[])

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center py-4">
              <div className="display-6">Profile Settings</div>
            </div>
            <div className="card-body p-4">
              {!isEditing ? (
                <div className="view-mode">
                  <div className="text-center mb-4">
                    <div className="avatar-circle mb-3">
                      <FaUser size={50} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="info-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <FaUser className="text-primary me-2" />
                      <span className="fw-bold">Username</span>
                    </div>
                    <div className="form-control bg-light">{userData.username}</div>
                  </div>

                  <div className="info-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <FaEnvelope className="text-primary me-2" />
                      <span className="fw-bold">Email</span>
                    </div>
                    <div className="form-control bg-light">{userData.email}</div>
                  </div>

                  <div className="info-item mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <FaLock className="text-primary me-2" />
                      <span className="fw-bold">Password</span>
                    </div>
                    <div className="form-control bg-light">**************</div>
                  </div>

                  <button 
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit /> Edit Profile
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <FaUser className="text-primary me-2" />
                      <label className="form-label mb-0">Username</label>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <FaEnvelope className="text-primary me-2" />
                      <label className="form-label mb-0">Email</label>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <FaLock className="text-primary me-2" />
                      <label className="form-label mb-0">Password</label>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                      <FaSave /> Save Changes
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-danger flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => setIsEditing(false)}
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .avatar-circle {
          width: 100px;
          height: 100px;
          background-color: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        .info-item .form-control {
          cursor: default;
        }
      `}</style>
    </div>
  );
}

export default Profile;
