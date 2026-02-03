// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
// import { useAuth } from "../Auth/AuthContext";

// import signupVideo from "../assets/signUp.mp4";

// export default function Signup() {
//   const { signup, user } = useAuth();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) navigate("/dashboard");
//   }, [user, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       signup(email, password);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center px-6">
//       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

//         {/* LEFT – FORM */}
//         <div className="max-w-md w-full mx-auto">
//           <h2 className="text-3xl font-semibold text-slate-700 mb-8 text-center md:text-left">
//             Sign up
//           </h2>

//           {error && (
//             <p className="mb-4 text-sm text-red-500">{error}</p>
//           )}

//           <form className="space-y-5" onSubmit={handleSubmit}>

//             {/* Name */}
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4" />
//               <input
//                 type="text"
//                 placeholder="Your Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full pl-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4" />
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 required
//               />
//             </div>

//             {/* Mobile */}
//             <div className="relative">
//               <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4" />
//               <input
//                 type="tel"
//                 placeholder="Mobile Number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="w-full pl-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>

//             {/* Confirm Password */}
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4" />
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
//               >
//                 {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>

//             {/* Terms */}
//             <label className="flex items-center gap-2 text-sm text-slate-600">
//               <input type="checkbox" className="rounded" required />
//               I agree to the{" "}
//               <span className="text-blue-600 cursor-pointer">
//                 Terms of service
//               </span>
//             </label>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
//             >
//               CREATE ACCOUNT
//             </button>
//           </form>

//           <p className="mt-6 text-sm text-center text-slate-600">
//             Have already an account?{" "}
//             <Link to="/login" className="text-blue-600 font-medium hover:underline">
//               Login here
//             </Link>
//           </p>
//         </div>

//         {/* RIGHT – VIDEO */}
//         <div className="hidden md:flex justify-center items-center">
//           <video
//             src={signupVideo}
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="max-w-md rounded-lg"
//           />
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../Auth/AuthContext";

import signupVideo from "../assets/signUp.mp4";

export default function Signup() {
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      signup(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-800 to-black flex items-center justify-center px-6 border-t-4 border-l-4 border-violet-600">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT – FORM */}
        <div className="max-w-md w-full mx-auto ">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center md:text-left">
            Create your account
          </h2>

          {error && (
            <p className="mb-4 text-sm text-red-400">{error}</p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Name */}
            <InputField
              icon={<User size={16} />}
              placeholder="Your Name"
              value={name}
              onChange={setName}
              type="text"
            />

            {/* Email */}
            <InputField
              icon={<Mail size={16} />}
              placeholder="Your Email"
              value={email}
              onChange={setEmail}
              type="email"
            />

            {/* Mobile */}
            <InputField
              icon={<Phone size={16} />}
              placeholder="Mobile Number"
              value={phone}
              onChange={setPhone}
              type="tel"
            />

            {/* Password */}
            <PasswordField
              placeholder="Password"
              value={password}
              onChange={setPassword}
              show={showPassword}
              setShow={setShowPassword}
            />

            {/* Confirm Password */}
            <PasswordField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />

            {/* Terms */}
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" className="rounded border-white/20 bg-transparent" required />
              I agree to the{" "}
              <span className="text-violet-400 cursor-pointer hover:underline">
                Terms of service
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full rounded-md py-2 font-medium text-white
                bg-gradient-to-r from-violet-600 to-indigo-600
                shadow-[0_0_25px_rgba(139,92,246,0.6)]
                hover:shadow-[0_0_40px_rgba(236,72,153,0.7)]
                transition
              "
            >
              CREATE ACCOUNT
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-400 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {/* RIGHT – VIDEO */}
        <div className="hidden md:flex justify-center items-center">
          <video
            src={signupVideo}
            autoPlay
            loop
            muted
            playsInline
            className="max-w-md rounded-xl border border-white/10 shadow-xl"
          />
        </div>

      </div>
    </div>
  );
}

/* ================= REUSABLE INPUTS ================= */

function InputField({ icon, placeholder, value, onChange, type }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-10 py-2 rounded-md
          bg-[#11162A] border border-white/10
          text-slate-100 placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-violet-500
        "
        required={type !== "tel"}
      />
    </div>
  );
}

function PasswordField({ placeholder, value, onChange, show, setShow }) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4" />
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full pl-10 pr-10 py-2 rounded-md
          bg-[#11162A] border border-white/10
          text-slate-100 placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-violet-500
        "
        required
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
