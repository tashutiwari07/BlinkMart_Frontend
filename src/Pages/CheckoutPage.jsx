import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdLocalShipping, MdLockOutline, MdPayment } from 'react-icons/md';
import useCart from '../hooks/useCart';

const CHECKOUT_STORAGE_KEY = 'blinkit_checkout';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('blinkit_user') || 'null') || {};
  } catch {
    return {};
  }
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const storedUser = useMemo(() => readStoredUser(), []);
  const { cart, clearCart } = useCart();
  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((total, item) => total + item.amount * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 25 : 0;
  const total = subtotal + deliveryFee;
  const [paymentMethod, setPaymentMethod] = useState('prepaid');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    customerId: storedUser.id || storedUser.customerId || '',
    name: storedUser.name || '',
    phone: storedUser.phone || '',
    email: storedUser.email || '',
    street: storedUser.address || '',
    city: '',
    pincode: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const saveCheckoutDetails = () => {
    const checkoutDetails = {
      ...form,
      customerId: storedUser.id || storedUser.customerId || form.customerId,
      email: storedUser.email || form.email,
      paymentMethod,
    };

    localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(checkoutDetails));
    return checkoutDetails;
  };

  const placeCodOrder = async (checkoutDetails) => {
    const response = await fetch(`${API_BASE_URL}/api/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: {
          id: checkoutDetails.customerId,
          name: checkoutDetails.name,
          phone: checkoutDetails.phone,
          email: checkoutDetails.email,
        },
        address: {
          street: checkoutDetails.street,
          city: checkoutDetails.city,
          pincode: checkoutDetails.pincode,
        },
        items: cartItems,
        totals: {
          subtotal,
          deliveryFee,
          total,
        },
        payment: {
          gateway: 'cash_on_delivery',
          method: 'cash',
          status: 'pending',
          transactionId: `cod_${Date.now()}`,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'COD order place nahi hua');
    }

    if (data.customer) {
      localStorage.setItem('blinkit_user', JSON.stringify(data.customer));
    }

    localStorage.removeItem(CHECKOUT_STORAGE_KEY);
    clearCart();
    toast.success('Cash On Delivery order placed!');
    navigate('/order-success', { replace: true, state: { order: data } });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Cart empty hai');
      return;
    }

    if (!form.name || !form.phone || !form.street || !form.city || !form.pincode) {
      toast.error('Delivery details complete karo');
      return;
    }

    const checkoutDetails = saveCheckoutDetails();

    if (paymentMethod === 'prepaid') {
      navigate('/payment');
      return;
    }

    setIsSubmitting(true);

    try {
      await placeCodOrder(checkoutDetails);
    } catch (error) {
      toast.error(error.message || 'Order place nahi hua');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[300px_1fr_340px]">
        <aside className="h-fit rounded-md bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-green-600">Logged in as</p>
          <h2 className="mt-2 text-xl font-bold text-gray-950">{storedUser.name || 'Customer'}</h2>
          <p className="mt-1 break-words text-sm text-gray-600">{storedUser.email || 'No email found'}</p>
          <div className="mt-4 rounded-md border border-green-100 bg-green-50 p-3 text-sm text-green-700">
            Isi account par order save hoga aur My Orders me history dikhegi.
          </div>
        </aside>

        <form className="rounded-md bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <MdLockOutline className="text-xl text-green-600" />
            <h1 className="text-2xl font-bold text-gray-950">Delivery details</h1>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <input name="name" value={form.name} onChange={handleChange} className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="Full name" />
            <input name="phone" value={form.phone} onChange={handleChange} className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="Phone number" />
            <input name="email" value={form.email} readOnly className="sm:col-span-2 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 outline-none" placeholder="Email" />
            <input name="street" value={form.street} onChange={handleChange} className="sm:col-span-2 rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="House no, building, street" />
            <input name="city" value={form.city} onChange={handleChange} className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="City" />
            <input name="pincode" value={form.pincode} onChange={handleChange} className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="Pincode" />
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-950">Payment option</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`flex min-h-24 items-start gap-3 rounded-md border p-4 text-left transition ${
                  paymentMethod === 'cod'
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-100'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <MdLocalShipping className="mt-1 text-2xl text-green-600" />
                <span>
                  <span className="block font-bold text-gray-950">Cash On Delivery</span>
                  <span className="mt-1 block text-sm text-gray-600">Delivery ke time cash payment karein.</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('prepaid')}
                className={`flex min-h-24 items-start gap-3 rounded-md border p-4 text-left transition ${
                  paymentMethod === 'prepaid'
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-100'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <MdPayment className="mt-1 text-2xl text-green-600" />
                <span>
                  <span className="block font-bold text-gray-950">Pre Paid</span>
                  <span className="mt-1 block text-sm text-gray-600">Online payment karke order confirm karein.</span>
                </span>
              </button>
            </div>
          </div>

          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-auto" type="submit" disabled={isSubmitting}>
            {paymentMethod === 'cod' ? <MdLocalShipping /> : <MdLockOutline />}
            {isSubmitting ? 'Placing order...' : paymentMethod === 'cod' ? 'Place COD order' : 'Continue to online payment'}
          </button>
        </form>

        <aside className="h-fit rounded-md bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-950">Order summary</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between"><span>Items</span><span>{cartItems.length}</span></div>
            <div className="flex justify-between"><span>Subtotal</span><span>Rs. {subtotal}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>Rs. {deliveryFee}</span></div>
            <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-950">
              <span>Total</span><span>Rs. {total}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
