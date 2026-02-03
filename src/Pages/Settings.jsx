import { useState } from "react";
import { User, Lock, DollarSign, Shield } from "lucide-react";
import { useAuth } from "../Auth/AuthContext";
import { useCurrency } from "../Context/CurrencyContext";
import { useFinance } from "../Context/FinanceContext";
import CurrencySelect from "../Components/CurrencySelect";

export default function Settings() {
  const { user, updateProfile, updatePassword } = useAuth();
  const { baseCurrency, loading } = useCurrency();
  const { updatePasskey, lockSensitive } = useFinance();

  const [activeTab, setActiveTab] = useState("account");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const storedUser = JSON.parse(
    localStorage.getItem(`user_${user.email}`)
  );

  const [profile, setProfile] = useState({
    username: storedUser?.username || "User",
    phone: storedUser?.phone || "",
    registeredDate: storedUser?.registeredDate || "04/12/2023",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [passkeys, setPasskeys] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileUpdate = () => {
    try {
      updateProfile({
        username: profile.username,
        phone: profile.phone,
      });
      setMessage("Profile updated successfully");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordUpdate = () => {
    if (passwords.new !== passwords.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      updatePassword(passwords.current, passwords.new);
      setMessage("Password updated successfully");
      setError("");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasskeyUpdate = () => {
    setError("");
    setMessage("");

    if (
      !passkeys.current ||
      !passkeys.new ||
      !passkeys.confirm
    ) {
      setError("All passkey fields are required");
      return;
    }

    if (passkeys.new !== passkeys.confirm) {
      setError("New passkey and confirm passkey do not match");
      return;
    }

    const ok = updatePasskey(passkeys.current, passkeys.new);
    if (!ok) {
      setError("Current passkey is incorrect");
      return;
    }

    lockSensitive(); // auto-lock sensitive data
    setMessage("Passkey updated successfully");
    setPasskeys({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="rounded-2xl bg-[#0B0E14]/95 border border-white/10 p-6 text-slate-200 shadow-none">
      <h2 className="mb-6 text-3xl font-semibold text-white">
        Account Settings
      </h2>

      {(message || error) && (
        <p
          className={`mb-4 text-sm ${error ? "text-rose-400" : "text-emerald-400"
            }`}
        >
          {error || message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* LEFT MENU */}
        <div className="md:col-span-1 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex flex-col items-center border-b border-white/10 p-6">
            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl text-white">
              📊
            </div>
            <p className="font-medium text-white">
              {profile.username}
            </p>
          </div>

          {[
            { key: "account", label: "Account", icon: User },
            { key: "password", label: "Password", icon: Lock },
            { key: "security", label: "Security", icon: Shield },
            { key: "currency", label: "Currency", icon: DollarSign },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex w-full items-center gap-2 px-4 py-3 text-sm transition ${activeTab === key
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-white/5"
                }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-3 rounded-xl border border-white/10 bg-white/5 p-6">
          {/* ACCOUNT */}
          {activeTab === "account" && (
            <>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Account Information
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
                  placeholder="Username"
                />

                <input
                  value={user.email}
                  disabled
                  className="rounded-md bg-white/10 border border-white/10 px-3 py-2 text-slate-400"
                />

                <input
                  value={profile.registeredDate}
                  disabled
                  className="rounded-md bg-white/10 border border-white/10 px-3 py-2 text-slate-400"
                />

                <input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
                  placeholder="Phone"
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={handleProfileUpdate}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                >
                  Update
                </button>
              </div>
            </>
          )}

          {/* PASSWORD */}
          {activeTab === "password" && (
            <>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Change Password
              </h3>

              <div className="max-w-md space-y-4">
                {["current", "new", "confirm"].map((field) => (
                  <input
                    key={field}
                    type="password"
                    placeholder={
                      field === "current"
                        ? "Current Password"
                        : field === "new"
                          ? "New Password"
                          : "Confirm New Password"
                    }
                    value={passwords[field]}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        [field]: e.target.value,
                      })
                    }
                    className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
                  />
                ))}

                <button
                  onClick={handlePasswordUpdate}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                >
                  Update Password
                </button>
              </div>
            </>
          )}

          {/* 🔐 SECURITY (PASSKEY) */}
          {activeTab === "security" && (
            <>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Privacy & Security
              </h3>

              <div className="max-w-md space-y-4">
                <input
                  type="password"
                  placeholder="Current Passkey"
                  value={passkeys.current}
                  onChange={(e) =>
                    setPasskeys({ ...passkeys, current: e.target.value })
                  }
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
                />

                <input
                  type="password"
                  placeholder="New Passkey"
                  value={passkeys.new}
                  onChange={(e) =>
                    setPasskeys({ ...passkeys, new: e.target.value })
                  }
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
                />

                <input
                  type="password"
                  placeholder="Confirm New Passkey"
                  value={passkeys.confirm}
                  onChange={(e) =>
                    setPasskeys({ ...passkeys, confirm: e.target.value })
                  }
                  className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white"
                />

                <button
                  onClick={handlePasskeyUpdate}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                >
                  Update Passkey
                </button>
              </div>
            </>
          )}

          {/* 🌍 CURRENCY */}
          {activeTab === "currency" && (
            <>
              <h3 className="mb-4 text-lg font-semibold text-white">
                Currency Settings
              </h3>

              <div className="max-w-md space-y-3">
                <label className="text-sm text-slate-300">
                  Preferred Currency
                </label>

                <CurrencySelect />

                <p className="text-xs text-slate-400">
                  Base currency: {baseCurrency}
                </p>

                {loading && (
                  <p className="text-xs text-slate-400">
                    Updating exchange rates…
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
