import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


import { useAuth } from "../Auth/AuthContext";

import loginImg from "../assets/login.svg";
import logoImg from "../assets/image.png";

export default function Login() {
  const { login, googleLogin, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  /* ================= EMAIL LOGIN ================= */
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    try {
      login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      googleLogin({
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">

      {/* ================= LEFT SECTION ================= */}
      <div className="relative hidden md:flex overflow-hidden">
        <img
          src={loginImg}
          alt="Finance background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-800 flex items-center justify-center overflow-hidden">
              <img
                src={logoImg}
                alt="BudgetVision logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-blue-600">
              BudgetVision
            </span>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex items-center justify-center bg-gradient-to-br from-black to-blue-600 px-6 border-t-5 border-r-5">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 md:hidden">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center overflow-hidden">
              <img src={logoImg} alt="logo" className="h-full w-full object-cover" />
            </div>
            <span className="text-lg font-semibold">BudgetVision</span>
          </div>

          <h2 className="text-2xl font-bold mb-1 text-white">Welcome Back</h2>
          <p className="text-slate-500 mb-6">
            Please enter your details to log in.
          </p>

          {error && (
            <p className="mb-4 text-sm text-red-500">{error}</p>
          )}

          {/* ================= GOOGLE LOGIN ================= */}
          <div className="mb-5 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed")}
            />
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-sm mb-5">
            <div className="h-px bg-slate-200 flex-1" />
            Or continue with email
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* ================= EMAIL FORM ================= */}
          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-slate-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign up for free
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

