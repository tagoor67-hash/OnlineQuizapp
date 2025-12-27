import React, { useState } from "react";
import { loginAdmin } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Adminlogin.css";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAdmin({ email: formData.email, password: formData.password });
            console.log(response.data);
            
            // Check if response is successful and has data
            if (response.data && response.data.success && response.data.data) {
                const { token, user } = response.data.data;
                
                if (token && user) {
                    localStorage.setItem("adminToken", token);
                    localStorage.setItem("adminUser", JSON.stringify(user));
                    localStorage.setItem("adminId", user.id);
                    localStorage.setItem("adminName", user.name);
                    
                    alert("Admin Logged In Successfully");
                    navigate("/AdminDashboard");
                } else {
                    alert("Login failed: Invalid response from server");
                }
            } else {
                alert("Login failed: " + (response.data?.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <p className="switch-auth">
                    Don't have an account? <Link to="/AdminRegistration">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
