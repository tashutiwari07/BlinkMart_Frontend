import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function Loginpage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || '/';
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error('Email aur password dalna zaroori hai.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/customers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('blinkit_user', JSON.stringify(data.customer || { email: formData.email.trim() }));
      setIsLoggedIn(true);
      toast.success('Login successful!');
      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-linear-to-br from-green-50 via-white to-emerald-100 px-4 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row">
        <div className="max-w-lg rounded-3xl border border-green-100 bg-white/80 p-8 shadow-2xl shadow-green-100 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Welcome back</p>
          <h1 className="mt-3 text-4xl font-black text-gray-900">Apni shopping routine ko phir se shuru karo.</h1>
          <p className="mt-4 text-lg text-gray-600">
            Fast delivery, fresh groceries aur daily essentials sab ek jagah.
          </p>
        </div>

        <form className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200" onSubmit={handleLogin}>
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-black text-gray-900">Login</h2>
            <p className="mt-2 text-sm text-gray-500">Apne account mein enter karein</p>
          </div>

          <label className="mb-4 block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </label>

          <label className="mb-4 block text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Naya user ho?{' '}
            <Link to="/signup" className="font-semibold text-green-600 hover:text-green-700">
              Signup karo
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
