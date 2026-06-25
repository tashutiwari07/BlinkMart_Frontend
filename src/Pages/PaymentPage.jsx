import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdLockOutline, MdPayment } from 'react-icons/md';
import useCart from '../hooks/useCart';

const CHECKOUT_STORAGE_KEY = 'blinkit_checkout';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://blinkmartbackend-production.up.railway.app';
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
const RAZORPAY_MODE = import.meta.env.VITE_RAZORPAY_MODE || 'test';
const RAZORPAY_ENABLED = import.meta.env.VITE_RAZORPAY_ENABLED === 'true';

function readCheckoutDetails() {
  try {
    return JSON.parse(localStorage.getItem(CHECKOUT_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('blinkit_user') || 'null') || {};
  } catch {
    return {};
  }
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((sum, item) => sum + item.amount * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 25 : 0;
  const total = subtotal + deliveryFee;

  const saveOrder = async ({ checkoutDetails, storedUser, payment }) => {
    const customerId = checkoutDetails.customerId || storedUser.id || storedUser.customerId;

    const response = await fetch(`${API_BASE_URL}/api/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: {
          id: customerId,
          name: checkoutDetails.name,
          phone: checkoutDetails.phone,
          email: checkoutDetails.email || storedUser.email,
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
        payment,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Order save nahi hua');
    }

    if (data.customer) {
      localStorage.setItem('blinkit_user', JSON.stringify(data.customer));
    }

    localStorage.removeItem(CHECKOUT_STORAGE_KEY);
    clearCart();
    toast.success('Payment successful!');
    navigate('/order-success', { replace: true, state: { order: data } });
  };

  const handleDummyPayment = async ({ checkoutDetails, storedUser }) => {
    await saveOrder({
      checkoutDetails,
      storedUser,
      payment: {
        gateway: 'razorpay_dummy',
        status: 'success',
        razorpayPaymentId: `pay_dummy_${Date.now()}`,
        razorpayOrderId: `order_dummy_${Date.now()}`,
        razorpaySignature: 'dummy_signature_success',
      },
    });
  };

  const handleRazorpayPayment = async ({ checkoutDetails, storedUser }) => {
    if (!RAZORPAY_KEY_ID) {
      throw new Error('Razorpay key missing hai');
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      throw new Error('Razorpay checkout load nahi hua');
    }

    const orderResponse = await fetch(`${API_BASE_URL}/api/payments/razorpay-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total,
        currency: 'INR',
        receipt: `blinkit_${Date.now()}`,
      }),
    });

    const razorpayOrder = await orderResponse.json();

    if (!orderResponse.ok) {
      throw new Error(razorpayOrder.message || 'Razorpay order create nahi hua');
    }

    await new Promise((resolve, reject) => {
      const razorpay = new window.Razorpay({
        key: razorpayOrder.keyId || RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || 'INR',
        name: 'Blinkit 2.0',
        description: 'Grocery order payment',
        order_id: razorpayOrder.id,
        prefill: {
          name: checkoutDetails.name,
          email: checkoutDetails.email || storedUser.email,
          contact: checkoutDetails.phone,
        },
        theme: {
          color: '#16a34a',
        },
        handler: async (response) => {
          try {
            await saveOrder({
              checkoutDetails,
              storedUser,
              payment: {
                gateway: 'razorpay',
                status: 'success',
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        modal: {
          ondismiss: () => reject(new Error('Payment cancel ho gaya')),
        },
      });

      razorpay.open();
    });
  };

  const handlePayment = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Cart empty hai');
      navigate('/cart');
      return;
    }

    const checkoutDetails = readCheckoutDetails();

    if (!checkoutDetails.name || !checkoutDetails.phone || !checkoutDetails.street) {
      toast.error('Checkout details pehle fill karo');
      navigate('/checkout');
      return;
    }

    setIsPaying(true);

    try {
      const storedUser = readStoredUser();

      if (RAZORPAY_ENABLED) {
        await handleRazorpayPayment({ checkoutDetails, storedUser });
      } else {
        await handleDummyPayment({ checkoutDetails, storedUser });
      }
    } catch (error) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-md bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <MdLockOutline className="text-xl text-green-600" />
          <h1 className="text-2xl font-bold text-gray-950">Secure Payment</h1>
        </div>

        <form className="mt-6 grid gap-4" onSubmit={handlePayment}>
          <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
            Payable amount: Rs. {total}
          </div>
          <div className="rounded-md border border-gray-200 p-4">
            <p className="text-sm font-bold text-gray-950">
              {RAZORPAY_ENABLED ? `Razorpay ${RAZORPAY_MODE} Checkout` : 'Razorpay Dummy Gateway'}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {RAZORPAY_ENABLED
                ? 'Pay now button Razorpay checkout popup open karega.'
                : 'Env me Razorpay enable karte hi real checkout popup open hoga.'}
            </p>
          </div>
          <button className="mt-2 flex items-center justify-center gap-2 rounded-md bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400" type="submit" disabled={isPaying}>
            <MdPayment /> {isPaying ? 'Processing...' : 'Pay with Razorpay'}
          </button>
        </form>
      </div>
    </section>
  );
}
