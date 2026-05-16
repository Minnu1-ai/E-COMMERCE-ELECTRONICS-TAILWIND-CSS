import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const getCartCount = (): number => {
  try {
    const items: { qty: number }[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return items.reduce((sum, item) => sum + item.qty, 0);
  } catch {
    return 0;
  }
};

const getInitialDark = (): boolean => {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('theme');
  if (stored) return stored === 'dark';
  return document.documentElement.classList.contains('dark');
};

function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount]     = useState(getCartCount);
  const [isDark, setIsDark]           = useState(getInitialDark);
  const searchInputRef                = useRef<HTMLInputElement>(null);
  const navigate                      = useNavigate();

  const activeClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-brand-primary font-semibold'
      : 'text-slate-600 dark:text-slate-300 font-medium hover:text-brand-primary transition-colors duration-300';

  const toggleMenu = () => setMenuOpen((o) => !o);
  const closeMenu  = () => setMenuOpen(false);

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const openSearch  = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };
  const closeSearch = () => { setSearchOpen(false); setSearchQuery(''); };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) { closeSearch(); navigate(`/shop?search=${encodeURIComponent(q)}`); }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchOpen ? closeSearch() : setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  useEffect(() => {
    const update = () => setCartCount(getCartCount());
    window.addEventListener('cartUpdated', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('cartUpdated', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  /* sync isDark if changed on the Theme page */
  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains('dark'));
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const iconBtn = "inline-flex items-center justify-center w-11 h-11 rounded-full text-slate-600 dark:text-slate-300 hover:bg-bg-main dark:hover:bg-slate-700 hover:text-brand-primary transition-all duration-300";

  const navLinks = [
    { to: '/',          label: 'Home',      end: true },
    { to: '/shop',      label: 'Shop' },
    { to: '/about',     label: 'About' },
    { to: '/reviews',   label: 'Reviews' },
    { to: '/contact',   label: 'Contact' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/login',     label: 'Login' },
  ];

  return (
    <>
      <header className="sticky top-0 z-[1000] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-all duration-300">
        <nav className="flex justify-between items-center px-[30px] py-[15px] max-w-[1400px] mx-auto w-full relative">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 text-2xl font-bold text-brand-secondary no-underline" onClick={closeMenu}>
            <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center bg-brand-primary text-white font-extrabold text-base flex-shrink-0">
              TH
            </div>
            <span className="tracking-tight">TechHaven</span>
          </NavLink>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="md:hidden bg-transparent border-none text-2xl text-slate-800 dark:text-slate-200 cursor-pointer p-0 flex items-center justify-center"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            <i className={`fas fa-bars transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
          </button>

          {/* Desktop nav links */}
          <ul className="hidden md:flex gap-[30px] items-center list-none p-0 m-0">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={activeClass} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* Icon group */}
            <li className="flex gap-[14px] items-center">
              {/* Search */}
              <a href="#" aria-label="Search" onClick={openSearch} className={iconBtn}>
                <i className="fas fa-search text-base" aria-hidden="true" />
              </a>

              {/* Dark mode toggle */}
              <button
                type="button"
                aria-label="Toggle dark mode"
                onClick={toggleDark}
                className={`${iconBtn} border-none cursor-pointer`}
              >
                <i className={`fas ${isDark ? 'fa-sun text-amber-400' : 'fa-moon'} text-base`} aria-hidden="true" />
              </button>

              {/* Profile */}
              <NavLink to="/profile" onClick={closeMenu} aria-label="User profile" className={iconBtn}>
                <i className="fas fa-user text-base" aria-hidden="true" />
              </NavLink>

              {/* Cart */}
              <NavLink to="/cart" onClick={closeMenu} aria-label="View cart" className={`${iconBtn} relative`}>
                <i className="fas fa-shopping-cart text-base" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Mobile menu */}
          <ul className={`md:hidden flex flex-col absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 shadow-lg z-50 list-none p-0 m-0 ${menuOpen ? 'max-h-[600px] opacity-100 py-4 px-5' : 'max-h-0 opacity-0'}`}>
            {navLinks.map((link) => (
              <li key={link.to} className="w-full text-center py-3 border-b border-slate-100 dark:border-slate-800">
                <NavLink to={link.to} end={link.end} className={activeClass} onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="w-full flex justify-center gap-2 pt-2 pb-1">
              <a href="#" aria-label="Search" onClick={openSearch}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-bg-main text-slate-600 text-lg hover:bg-brand-primary hover:text-white transition-all duration-300">
                <i className="fas fa-search" />
              </a>
              <button type="button" aria-label="Toggle dark mode" onClick={toggleDark}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-bg-main text-slate-600 text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 border-none cursor-pointer">
                <i className={`fas ${isDark ? 'fa-sun text-amber-400' : 'fa-moon'}`} />
              </button>
              <NavLink to="/profile" onClick={closeMenu} aria-label="User profile"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-bg-main text-slate-600 text-lg hover:bg-brand-primary hover:text-white transition-all duration-300">
                <i className="fas fa-user" />
              </NavLink>
              <NavLink to="/cart" onClick={closeMenu} aria-label="View cart"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-bg-main text-slate-600 text-lg hover:bg-brand-primary hover:text-white transition-all duration-300 relative">
                <i className="fas fa-shopping-cart" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-24" role="dialog" aria-modal="true" aria-label="Search">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeSearch} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 z-10">
            <form className="flex items-center gap-3 px-5 py-4" onSubmit={handleSearchSubmit} autoComplete="off">
              <span className="text-slate-400 text-lg"><i className="fas fa-search" /></span>
              <input
                ref={searchInputRef}
                type="text"
                className="flex-1 border-none outline-none text-lg text-slate-800 placeholder-slate-400 bg-transparent"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="bg-transparent border-none text-slate-400 hover:text-slate-700 cursor-pointer text-lg p-1"
                aria-label="Close search"
                onClick={closeSearch}
              >
                <i className="fas fa-times" />
              </button>
            </form>
            <p className="text-center text-sm text-slate-400 pb-3">Press Enter to search · Esc to close</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
