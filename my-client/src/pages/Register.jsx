import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !confirm) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await dispatch(signup({ email, password }));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Registration successful!");
        navigate("/");
      } else {
        toast.error("Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-90 md:max-w-120 m-auto p-20 gap-y-2 text-center bg-white shadow-lg border border-zinc-100 mt-10 rounded-2xl">
      <h2 className="font-medium text-3xl mb-10">Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mb-4 p-2 bg-white text-black rounded-3xl border-2 border-lime-400 focus:bg-white focus:border-lime-400 transition-colors duration-300"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-4 p-2 bg-white text-black rounded-3xl border-2 border-lime-400 focus:bg-white focus:border-lime-400 transition-colors duration-300"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="block w-full mb-4 p-2 bg-white text-black rounded-3xl border-2 border-lime-400 focus:bg-white focus:border-lime-400 transition-colors duration-300"
      />

      <div className="w-full justify-center items-center flex flex-col gap-y-1">
        <button
          onClick={handleSignup}
          className="w-1/2 rounded-2xl bg-lime-400 hover:bg-lime-500 py-2 cursor-pointer text-black font-semibold mb-2"
        >
          Sign Up
        </button>

        {/* 👇 Login Button */}
        <button
          onClick={() => navigate("/")}
          className="w-1/2 rounded-2xl bg-zinc-200 hover:bg-zinc-300 py-2 cursor-pointer text-gray-700 font-medium"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Register;
