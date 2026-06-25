import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://blinkmartbackend-production.up.railway.app';

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('blinkit_user') || 'null') || {};
  } catch {
    return {};
  }
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = readStoredUser();
    const customerId = storedUser.id ?? storedUser.customerId;

    if (!storedUser.email || !customerId) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/orders/my?customerId=${encodeURIComponent(String(customerId))}`,
        );
        if (!response.ok) throw new Error('My Orders fetch failed');
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

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-gray-900">My Orders</h2>
            <p className="text-sm text-gray-500">Aapke recent purchases yahan dikh rahe hain.</p>
          </div>
          <Link to="/profile" className="text-sm font-semibold text-green-600 hover:text-green-700">
            Back to Profile
          </Link>
        </div>

        {loading ? (
          <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-6 text-center text-gray-500">
            Orders load ho rahe hain...
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-6 text-center text-gray-500">
            Abhi tak koi order nahi hai.
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()} | Qty: {order.quantity || 1}
                    </p>
                    <p className="mt-2 font-semibold text-gray-800">
                      {order.Product?.name || `Product ${order.productId || '-'}`}
                    </p>
                    <div className="mt-2 text-sm text-gray-600">
                      <p><span className="font-semibold">Customer:</span> {order.Customer?.name || '-'}</p>
                      <p><span className="font-semibold">Phone:</span> {order.Customer?.phone || '-'}</p>
                      <p><span className="font-semibold">Address:</span> {order.Customer?.address || '-'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      Rs. {Number(order.Payment?.amount || 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600">{order.Payment?.paymentStatus || 'Pending'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
