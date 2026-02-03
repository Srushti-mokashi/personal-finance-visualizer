import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const USER_KEY = "pfm_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  /* ================= LOGIN (EMAIL/PASSWORD) ================= */
  const login = (email, password) => {
    const stored = localStorage.getItem(`user_${email}`);
    if (!stored) throw new Error("User not found");

    const account = JSON.parse(stored);
    if (account.password !== password) {
      throw new Error("Incorrect password");
    }

    const sessionUser = { email };
    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  /* ================= SIGNUP ================= */
  const signup = (email, password) => {
    const existing = localStorage.getItem(`user_${email}`);
    if (existing) throw new Error("User already exists");

    const account = {
      email,
      password,
      username: "User",
      phone: "",
      registeredDate: new Date().toLocaleDateString(),
      provider: "local",
    };

    localStorage.setItem(`user_${email}`, JSON.stringify(account));

    const sessionUser = { email };
    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  /* ================= GOOGLE LOGIN ================= */
  const googleLogin = ({ email, name, picture }) => {
    // Store google user profile (no password)
    const account = {
      email,
      username: name,
      picture,
      provider: "google",
      registeredDate: new Date().toLocaleDateString(),
    };

    localStorage.setItem(`user_${email}`, JSON.stringify(account));

    const sessionUser = {
      email,
      name,
      picture,
      provider: "google",
    };

    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  /* ================= UPDATE PROFILE ================= */
  const updateProfile = (data) => {
    if (!user) throw new Error("Not authenticated");

    const key = `user_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key));

    const updatedUser = { ...stored, ...data };
    localStorage.setItem(key, JSON.stringify(updatedUser));
  };

  /* ================= UPDATE PASSWORD ================= */
  const updatePassword = (currentPassword, newPassword) => {
    if (!user) throw new Error("Not authenticated");

    const key = `user_${user.email}`;
    const stored = JSON.parse(localStorage.getItem(key));

    // Block password change for Google users
    if (stored.provider === "google") {
      throw new Error("Password change not allowed for Google accounts");
    }

    if (stored.password !== currentPassword) {
      throw new Error("Current password is incorrect");
    }

    stored.password = newPassword;
    localStorage.setItem(key, JSON.stringify(stored));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        googleLogin, // ✅ NEW
        logout,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
