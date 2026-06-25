import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CHECKOUT_STORAGE_KEY = 'blinkit_checkout';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function ProfilePage({ setIsLoggedIn }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('blinkit_user') || 'null');
    const customerId = storedUser?.id ?? storedUser?.customerId;

    if (!storedUser?.email || !customerId) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/orders/my?customerId=${encodeURIComponent(String(customerId))}`,
        );
        if (!response.ok) throw new Error('Orders fetch failed');
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const profile = useMemo(() => {
    const storedUser = JSON.parse(localStorage.getItem('blinkit_user') || 'null');
    return storedUser || {};
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('blinkit_user');
    localStorage.removeItem(CHECKOUT_STORAGE_KEY);
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-green-600 text-xl font-black text-white">
              {profile.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">{profile.name || 'My Profile'}</h2>
              <p className="text-sm text-gray-500">{profile.email || 'user@example.com'}</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Link to="/profile" className="flex items-center rounded-lg bg-green-50 px-4 py-3 font-semibold text-green-700">
              My Profile
            </Link>
            <Link to="/my-orders" className="flex items-center rounded-lg px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
              My Orders
            </Link>
            <button onClick={handleLogout} className="flex w-full items-center rounded-lg px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50">
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black text-gray-900">Profile Details</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="mt-1 font-semibold text-gray-900">{profile.name || 'Not available'}</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-1 font-semibold text-gray-900">{profile.email || 'Not available'}</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="mt-1 font-semibold text-gray-900">{profile.phone || 'Not available'}</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Saved Address</p>
              <p className="mt-1 font-semibold text-gray-900">{profile.address || 'Not available'}</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="mt-1 font-semibold text-gray-900">{loading ? 'Loading...' : orders.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
