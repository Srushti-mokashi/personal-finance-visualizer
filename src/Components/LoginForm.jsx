import React, { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      login(email, password);
      navigate("/dashboard"); // after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 bg-gradient-to-br from-pink-600 to-black p-6 shadow-md rounded-xl space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Login</h2>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>
      )}

      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full mt-1 px-3 py-2 border rounded-md"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full mt-1 px-3 py-2 border rounded-md"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800"
      >
        Login
      </button>

      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <a href="/signup" className="text-slate-800 font-medium">
          Sign up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;