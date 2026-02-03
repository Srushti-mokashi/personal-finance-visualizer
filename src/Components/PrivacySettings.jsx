import { useState } from "react";
import { usePrivacy } from "../Context/PrivacyContext";

export default function PrivacySettings() {
  const { setPasskey, lock } = usePrivacy();
  const [passkey, setPasskeyInput] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleSave = async () => {
    if (!passkey || passkey !== confirm) {
      setMsg("Passkeys do not match");
      return;
    }

    await setPasskey(passkey);
    lock();
    setMsg("Passkey set successfully");
    setPasskeyInput("");
    setConfirm("");
  };

  return (
    <div className="rounded-xl border bg-white p-4 space-y-3">
      <h3 className="font-semibold text-slate-700">Privacy Lock</h3>

      <input
        type="password"
        placeholder="New passkey"
        className="w-full border rounded p-2"
        value={passkey}
        onChange={(e) => setPasskeyInput(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm passkey"
        className="w-full border rounded p-2"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      {msg && <p className="text-xs text-slate-500">{msg}</p>}

      <button
        onClick={handleSave}
        className="rounded bg-slate-900 text-white px-4 py-2"
      >
        Save Passkey
      </button>
    </div>
  );
}
