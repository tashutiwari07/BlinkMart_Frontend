import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error('Sab fields fill karna zaroori hai.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/customers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      toast.success('Account ban gaya! Ab login kar sakte ho.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-linear-to-br from-green-50 via-white to-emerald-100 px-4 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row">
        <div className="max-w-lg rounded-3xl border border-green-100 bg-white/80 p-8 shadow-2xl shadow-green-100 backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Welcome to BlinkMart</p>
          <h1 className="mt-3 text-4xl font-black text-gray-900">Apna account banao aur groceries ka asaan shopping shuru karo.</h1>
          <p className="mt-4 text-lg text-gray-600">
            Quick signup ke saath apni daily essentials ko sirf 8 minutes mein deliver karwao.
          </p>
          <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm text-green-700">
            <p className="font-semibold">Why join?</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Fast checkout aur personalized offers</li>
              <li>Order tracking aur easy reordering</li>
              <li>Exclusive deals har week</li>
            </ul>
          </div>
        </div>

        <form
          onSubmit={handleSignup}
          className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200"
        >
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
            <p className="mt-2 text-sm text-gray-500">Mere account se shuru karo</p>
          </div>

          <label className="mb-4 block text-sm font-medium text-gray-700">
            Full Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Aapka naam"
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
          </label>

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
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-green-600 hover:text-green-700">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
