import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from "../features/auth/authSlice";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    const result = await dispatch(login({ email, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success("Login successful!");
      navigate('/request');
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-90 md:max-w-120 m-auto p-20 gap-y-2 text-center bg-white shadow-lg border border-zinc-100 mt-10 rounded-2xl">
      <h2 className="font-medium text-3xl mb-10">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="block w-full mb-4 p-2 bg-white text-black rounded-3xl border-2 border-lime-400 focus:bg-white focus:border-lime-400 transition-colors duration-300"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="block w-full mb-4 p-2 bg-white text-black rounded-3xl border-2 border-lime-400 focus:bg-white focus:border-lime-400 transition-colors duration-300"
      />

      <button
        onClick={handleLogin}
        className="w-1/2 rounded-2xl bg-lime-400 hover:bg-lime-500 py-2 cursor-pointer text-black font-semibold mb-2"
      >
        Login
      </button>

      <button
        onClick={handleGoToRegister}
        className="w-1/2 rounded-2xl bg-zinc-100 hover:bg-zinc-200 py-2 cursor-pointer text-gray-700 font-medium"
      >
        Go to Register
      </button>
    </div>
  );
}

export default Login;
