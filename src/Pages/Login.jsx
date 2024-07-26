import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../api/api';
import { useLoading } from '../store/LoadingContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, setIsLoading} = useLoading();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Email validation
    if (!email) {
      toast.error('Email is required');
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Invalid email format');
      setIsLoading(false);
      return;
    }

    // Password validation
    if (!password) {
      toast.error('Password is required');
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Simulating an API call
      const res = await login({email,password})
      localStorage.setItem("token", res?.data?.token);
      toast.success('Login successful!');
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
        <p className="mb-8">Welcome back! Please enter your details.</p>
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-zinc-700 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-zinc-700 rounded bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="********"
            />
          </div>
          <div className='flex justify-center'> 
          <button
            className="w-1/2 bg-yellow-500 text-black py-2 rounded hover:bg-yellow-500 transition-colors"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
        </form>
        
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          className="w-full h-full object-contain"
          src="/car.jpeg"
          alt="Boxer illustration"
        />
      </div>
    </div>
  );
};

export default Login;