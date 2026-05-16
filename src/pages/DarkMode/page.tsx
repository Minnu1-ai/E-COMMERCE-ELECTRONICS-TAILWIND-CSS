import { useEffect, useState } from 'react';

/* ─── Custom CSS for this page only (allowed per requirements) ─── */
const pageStyles = `
.theme-preview-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.theme-preview-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}
.toggle-track {
  transition: background-color 0.3s ease;
}
.toggle-thumb {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.theme-glow-dark {
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
}
.theme-glow-light {
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
}
`;

function DarkModePage() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggle = () => setIsDark((v) => !v);

  return (
    <>
      <style>{pageStyles}</style>

      <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-12">

        {/* Hero */}
        <section className="bg-slate-700 rounded-2xl px-10 py-14 text-center text-white">
          <h1 className="text-5xl font-extrabold text-white mb-3 mt-0 leading-tight">
            Theme Settings
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed m-0">
            Switch between light and dark mode to match your preference.
          </p>
        </section>

        {/* Big Toggle */}
        <section className="flex flex-col items-center gap-8">
          <div className={`relative w-64 h-32 rounded-3xl cursor-pointer toggle-track flex items-center px-4 ${isDark ? 'bg-indigo-900 theme-glow-dark' : 'bg-amber-100 theme-glow-light'}`}
            onClick={toggle}
            role="switch"
            aria-checked={isDark}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggle()}
          >
            {/* Sun */}
            <div className={`absolute left-6 transition-opacity duration-300 ${isDark ? 'opacity-30' : 'opacity-100'}`}>
              <i className="fas fa-sun text-4xl text-amber-400"></i>
            </div>
            {/* Moon */}
            <div className={`absolute right-6 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-30'}`}>
              <i className="fas fa-moon text-4xl text-indigo-300"></i>
            </div>
            {/* Thumb */}
            <div className={`toggle-thumb absolute w-20 h-20 rounded-2xl shadow-xl flex items-center justify-center text-3xl ${isDark ? 'translate-x-[136px] bg-indigo-600' : 'translate-x-0 bg-white'}`}>
              {isDark ? <i className="fas fa-moon text-white"></i> : <i className="fas fa-sun text-amber-400"></i>}
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white m-0 mb-1">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm m-0">
              {isDark ? 'Easy on the eyes in low-light environments.' : 'Clean and bright for daytime use.'}
            </p>
          </div>

          <button
            type="button"
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg border-none cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
              isDark
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/30'
                : 'bg-amber-400 text-amber-900 hover:bg-amber-500 shadow-lg shadow-amber-400/30'
            }`}
            onClick={toggle}
          >
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </section>

        {/* Preview Cards */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-0 text-center">Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Light preview */}
            <div className={`theme-preview-card rounded-2xl border-2 overflow-hidden ${!isDark ? 'border-amber-400' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className="bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">TH</div>
                  <span className="font-bold text-slate-900 text-sm">TechHaven</span>
                  {!isDark && <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Active</span>}
                </div>
                <div className="bg-slate-50 rounded-xl p-4 mb-3">
                  <div className="h-3 bg-slate-200 rounded-full mb-2 w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded-full w-1/2"></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-lg p-3">
                      <div className="h-8 bg-slate-100 rounded mb-2"></div>
                      <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-3 flex items-center gap-2">
                <i className="fas fa-sun text-amber-400"></i>
                <span className="text-slate-700 font-semibold text-sm">Light Mode</span>
              </div>
            </div>

            {/* Dark preview */}
            <div className={`theme-preview-card rounded-2xl border-2 overflow-hidden ${isDark ? 'border-indigo-500' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className="bg-slate-900 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">TH</div>
                  <span className="font-bold text-white text-sm">TechHaven</span>
                  {isDark && <span className="ml-auto text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full font-medium">Active</span>}
                </div>
                <div className="bg-slate-800 rounded-xl p-4 mb-3">
                  <div className="h-3 bg-slate-700 rounded-full mb-2 w-3/4"></div>
                  <div className="h-3 bg-slate-700 rounded-full w-1/2"></div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                      <div className="h-8 bg-slate-700 rounded mb-2"></div>
                      <div className="h-2 bg-slate-600 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800 px-6 py-3 flex items-center gap-2">
                <i className="fas fa-moon text-indigo-400"></i>
                <span className="text-slate-300 font-semibold text-sm">Dark Mode</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-0 text-center">Why Use Dark Mode?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: 'fa-eye',          title: 'Eye Comfort',     text: 'Reduces eye strain in low-light conditions.',       color: 'text-blue-600',   bg: 'bg-blue-50 dark:bg-blue-900/30' },
              { icon: 'fa-battery-full', title: 'Battery Saving',  text: 'OLED screens use less power with dark backgrounds.', color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-900/30' },
              { icon: 'fa-moon',         title: 'Night Friendly',  text: 'Perfect for late-night browsing sessions.',          color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
              { icon: 'fa-paint-brush',  title: 'Modern Look',     text: 'Sleek, professional aesthetic for any interface.',   color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/30' },
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${item.bg} ${item.color}`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base m-0">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm m-0 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}

export default DarkModePage;
