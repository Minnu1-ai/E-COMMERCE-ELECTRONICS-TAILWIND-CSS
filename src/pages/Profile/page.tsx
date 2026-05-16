import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface UserSession {
  email: string;
  firstName: string;
}

interface CartItem {
  name: string;
  price: number;
  qty: number;
  image: string;
  category: string;
}

function Profile() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [cart, setCart]       = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings'>('overview');
  const [editMode, setEditMode]   = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [saved, setSaved]         = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('userSession');
      if (raw) {
        const s: UserSession = JSON.parse(raw);
        setSession(s);
        setDisplayName(s.firstName);
      }
      const cartRaw = localStorage.getItem('cartItems');
      if (cartRaw) setCart(JSON.parse(cartRaw));
    } catch { /* ignore */ }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    navigate('/login');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      const updated = { ...session, firstName: displayName.trim() || session.firstName };
      localStorage.setItem('userSession', JSON.stringify(updated));
      setSession(updated);
      setSaved(true);
      setEditMode(false);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const cartTotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount  = cart.reduce((s, i) => s + i.qty, 0);
  const initials   = session
    ? (session.firstName.charAt(0) + (session.email.split('@')[0].charAt(1) || '')).toUpperCase()
    : '';

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-8">

      {/* Hero */}
      <section className="bg-slate-700 rounded-2xl px-10 py-14 text-center text-white">
        <h1 className="text-5xl font-extrabold text-white mb-3 mt-0 leading-tight">My Profile</h1>
        <p className="text-slate-300 text-lg leading-relaxed m-0">Manage your account and view your orders.</p>
      </section>

      {/* ── Guest state — not logged in ── */}
      {!session && (
        <section className="flex flex-col items-center justify-center py-16 gap-6 text-center bg-white rounded-2xl border border-slate-200">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-4xl text-slate-400">
            <i className="fas fa-user"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 m-0 mb-2">You're not signed in</h2>
            <p className="text-slate-500 m-0 max-w-sm mx-auto text-sm">
              Sign in to view your profile, track orders, and manage your account.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/login"
              className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold px-7 py-3 rounded-xl no-underline hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300">
              <i className="fas fa-sign-in-alt"></i> Sign In
            </Link>
            <Link to="/signup"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-brand-primary text-brand-primary font-semibold px-7 py-3 rounded-xl no-underline hover:bg-brand-primary hover:text-white transition-all duration-300">
              Create Account
            </Link>
          </div>
        </section>
      )}

      {/* ── Logged-in state ── */}
      {session && (
        <>
          {/* Profile Header */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-extrabold text-3xl flex-shrink-0 border-4 border-white/30">
              {initials}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-extrabold text-white m-0 mb-1">{session.firstName}</h2>
              <p className="text-blue-100 m-0 mb-4 text-sm">{session.email}</p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <span className="flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <i className="fas fa-shopping-cart"></i> {cartCount} item{cartCount !== 1 ? 's' : ''} in cart
                </span>
                <span className="flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  <i className="fas fa-check-circle"></i> Verified Account
                </span>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 bg-white/15 text-white border border-white/25 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:bg-white/25 transition-all duration-200 flex-shrink-0"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </section>

          {/* Success toast */}
          {saved && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 text-sm font-medium">
              <i className="fas fa-check-circle text-lg"></i>
              <span>Profile updated successfully!</span>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
            {(['overview', 'orders', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-200 cursor-pointer border-none ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'bg-transparent text-slate-500 hover:text-slate-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'fa-shopping-bag', label: 'Total Orders',    value: '12', color: 'text-blue-600',  bg: 'bg-blue-50' },
                { icon: 'fa-heart',        label: 'Wishlist Items',  value: '8',  color: 'text-red-500',   bg: 'bg-red-50' },
                { icon: 'fa-star',         label: 'Reviews Written', value: '5',  color: 'text-amber-500', bg: 'bg-amber-50' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${stat.bg} ${stat.color}`}>
                    <i className={`fas ${stat.icon}`}></i>
                  </div>
                  <div>
                    <div className="text-3xl font-extrabold text-slate-900 leading-none mb-1">{stat.value}</div>
                    <div className="text-slate-500 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}

              <div className="md:col-span-3 bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 mt-0">Account Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'First Name',    value: session.firstName },
                    { label: 'Email Address', value: session.email },
                    { label: 'Member Since',  value: 'May 2026' },
                    { label: 'Account Type',  value: 'Standard' },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{item.label}</span>
                      <span className="text-slate-900 font-medium text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 m-0">Cart Items</h3>
                <span className="text-sm text-slate-500">{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
              </div>
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <i className="fas fa-shopping-cart text-4xl text-slate-300"></i>
                  <p className="text-slate-500 m-0">Your cart is empty.</p>
                  <Link to="/shop"
                    className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold px-5 py-2.5 rounded-xl no-underline hover:bg-blue-700 transition-all duration-300 text-sm">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-slate-100">
                    {cart.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 px-6 py-4">
                        <img src={item.image} alt={item.name}
                          className="w-16 h-16 object-contain rounded-xl bg-slate-50 p-2 flex-shrink-0"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/images/laptops/Product1.jpg'; }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900 text-sm truncate">{item.name}</div>
                          <div className="text-slate-400 text-xs mt-0.5">{item.category}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-bold text-slate-900 text-sm">${(item.price * item.qty).toFixed(2)}</div>
                          <div className="text-slate-400 text-xs">Qty: {item.qty}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="font-bold text-brand-primary text-lg">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="px-6 pb-5">
                    <Link to="/checkout"
                      className="inline-flex items-center gap-2 bg-brand-primary text-white font-semibold px-6 py-3 rounded-xl no-underline hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 text-sm">
                      <i className="fas fa-lock"></i> Proceed to Checkout
                    </Link>
                  </div>
                </>
              )}
            </section>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 m-0">Profile Settings</h3>
                {!editMode && (
                  <button
                    type="button"
                    className="flex items-center gap-2 text-brand-primary text-sm font-medium bg-transparent border-none cursor-pointer hover:text-blue-700 transition-colors duration-200"
                    onClick={() => setEditMode(true)}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                )}
              </div>
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      disabled={!editMode}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl text-sm transition-colors duration-200 focus:outline-none ${
                        editMode
                          ? 'border-slate-200 bg-white text-slate-900 focus:border-brand-primary'
                          : 'border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed'
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={session.email}
                      disabled
                      className="w-full px-4 py-3 border border-slate-100 rounded-xl bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
                    />
                  </div>
                </div>
                {editMode && (
                  <div className="flex gap-3">
                    <button type="submit"
                      className="flex items-center gap-2 bg-brand-primary text-white font-semibold px-6 py-3 rounded-xl border-none cursor-pointer hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 text-sm">
                      <i className="fas fa-save"></i> Save Changes
                    </button>
                    <button type="button"
                      className="flex items-center gap-2 bg-transparent border-2 border-slate-300 text-slate-600 font-semibold px-6 py-3 rounded-xl cursor-pointer hover:border-slate-400 transition-all duration-300 text-sm"
                      onClick={() => { setEditMode(false); setDisplayName(session.firstName); }}>
                      Cancel
                    </button>
                  </div>
                )}
              </form>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-base font-bold text-red-600 mb-4 mt-0">Danger Zone</h4>
                <button
                  type="button"
                  className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer hover:bg-red-100 transition-colors duration-200"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i> Sign Out
                </button>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default Profile;
