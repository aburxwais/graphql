import { useState, useEffect } from 'react';
import Profile from './Profile';

function Login() {
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(()=> {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken)
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch("https://learn.reboot01.com/api/auth/signin", {
      method: "POST",
      headers: {  
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const err = await response.json();
      setError(err.message || "Invalid credentials");
      return;
    }

    const token = await response.json();
    localStorage.setItem("token", token);
    setToken(token);
    console.log("Token: ", token);
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong during login.");
  }
};

  if (token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Profile />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
