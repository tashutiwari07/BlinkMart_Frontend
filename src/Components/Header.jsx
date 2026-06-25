import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown, MdLocationOn, MdSearch, MdShoppingCart, MdClose, MdMenu, MdPerson } from 'react-icons/md';
import products from '../data/products';
import useCart from '../hooks/useCart';

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('blinkit_user');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    navigate('/login');
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return;
    }

    const matchedProduct = products.find((product) =>
      [product.name, product.category, product.description].join(' ').toLowerCase().includes(query),
    );

    if (matchedProduct) {
      navigate(`/products/${matchedProduct.id}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="flex min-h-22 items-center">
        <Link
          to="/"
          className="flex h-22 w-56 shrink-0 items-center justify-center border-r border-gray-100 px-8 max-lg:w-auto max-lg:border-r-0 max-lg:px-4"
          aria-label="BlinkMart home"
        >
          <span className="text-3xl font-black leading-none">
            <span className="text-yellow-400">Blink</span>
            <span className="text-green-700">Mart</span>
          </span>
        </Link>

        <button
          className="hidden h-11 w-11 place-items-center rounded-md border border-gray-200 text-2xl text-gray-900 max-md:grid"
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Open menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <MdClose /> : <MdMenu />}
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-7 px-9 max-lg:gap-4 max-lg:px-4 max-md:hidden">
          <div className="min-w-67.5 leading-tight">
            <p className="text-2xl font-black text-gray-950">Delivery in 8 minutes</p>
            <button className="mt-1 flex max-w-full items-center gap-2 text-left text-base text-gray-950" type="button">
              <MdLocationOn className="shrink-0 text-green-700" />
              <span className="truncate">V3RF+CQJ, Uttardhona, Uttar Pradesh</span>
              <MdKeyboardArrowDown className="shrink-0 text-xl text-gray-900" />
            </button>
          </div>

          <form className="relative min-w-65 flex-1" onSubmit={handleSearch}>
            <MdSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-gray-900" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder='Search "milk"'
              className="h-15 w-full rounded-xl border border-gray-200 bg-gray-50 pl-14 pr-5 text-lg text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
            />
          </form>

          {isLoggedIn ? (
            <div className="relative">
              <button
                className="flex h-15 items-center gap-2 rounded-full border border-gray-200 px-4 text-xl font-medium text-gray-950 transition hover:border-green-500 hover:text-green-700"
                type="button"
                onClick={() => setIsProfileMenuOpen((current) => !current)}
              >
                <MdPerson className="text-2xl" />
                <span>Profile</span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                  <Link to="/profile" className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link to="/my-orders" className="block rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileMenuOpen(false)}>
                    My Orders
                  </Link>
                  <button onClick={handleLogout} className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className="flex h-15 items-center px-4 text-xl font-medium text-gray-950 transition hover:text-green-700" to="/login">
              Login
            </Link>
          )}

          <Link
            to="/cart"
            className="relative flex h-16.5 min-w-35.5 items-center justify-center gap-2 rounded-lg bg-green-700 px-5 text-lg font-black text-white transition hover:bg-green-800"
          >
            <MdShoppingCart className="text-3xl" />
            <span>My Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 grid min-h-6 min-w-6 place-items-center rounded-full bg-gray-950 px-1.5 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="hidden border-t border-gray-100 px-4 pb-4 pt-3 max-md:block">
        <form className="relative" onSubmit={handleSearch}>
          <MdSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-900" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder='Search "milk"'
            className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
          />
        </form>

        {isMenuOpen && (
          <div className="mt-3 grid gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
            <button className="rounded-lg bg-gray-50 px-3 py-3 text-left" type="button">
              <p className="text-lg font-black text-gray-950">Delivery in 8 minutes</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                <MdLocationOn className="text-green-700" />
                V3RF+CQJ, Uttardhona
              </p>
            </button>

            <div className="grid grid-cols-2 gap-3">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="flex h-12 items-center justify-center rounded-lg border border-gray-200 font-bold text-gray-950" onClick={() => setIsMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link to="/my-orders" className="flex h-12 items-center justify-center rounded-lg border border-gray-200 font-bold text-gray-950" onClick={() => setIsMenuOpen(false)}>
                    My Orders
                  </Link>
                  <button className="flex h-12 items-center justify-center rounded-lg border border-red-200 font-bold text-red-600" type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex h-12 items-center justify-center rounded-lg border border-gray-200 font-bold text-gray-950"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              <Link
                to="/cart"
                className="flex h-12 items-center justify-center gap-2 rounded-lg bg-green-700 font-bold text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <MdShoppingCart className="text-xl" />
                My Cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
