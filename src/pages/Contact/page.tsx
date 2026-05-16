import { useState } from 'react';

function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  const inputCls = "w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-sans text-base focus:outline-none focus:border-brand-third transition-colors duration-300";

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">
      {/* Hero */}
      <section className="bg-slate-700 rounded-2xl px-10 py-14 text-center text-white">
        <h1 className="text-5xl font-extrabold text-white mb-3 mt-0 leading-tight">Get in Touch</h1>
        <p className="text-slate-300 text-lg leading-relaxed m-0">We'd love to hear from you. Our team is always here to help.</p>
      </section>

      {/* Layout */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        {/* Info cards */}
        <div className="flex flex-col gap-5">
          {[
            { icon: 'fa-map-marker-alt', title: 'Our Office', text: '123 Tech Boulevard, Innovation City, CA 94043' },
            { icon: 'fa-phone',          title: 'Phone',      text: '+1 (555) 123-4567' },
            { icon: 'fa-envelope',       title: 'Email',      text: 'support@techhaven.com' },
          ].map((card) => (
            <div key={card.title} className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-5">
              <div className="w-12 h-12 rounded-md bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-brand-primary text-lg flex-shrink-0">
                <i className={`fas ${card.icon}`}></i>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-1 mt-0 leading-tight">{card.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0 text-sm">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div>
          <form className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-0 mt-0 leading-tight">Send Us a Message</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-slate-900 dark:text-slate-300 text-sm">Your Name</label>
                <input type="text" required className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-slate-900 dark:text-slate-300 text-sm">Email Address</label>
                <input type="email" required className={inputCls} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-900 dark:text-slate-300 text-sm">Subject</label>
              <input type="text" required className={inputCls} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-900 dark:text-slate-300 text-sm">Message</label>
              <textarea required className={`${inputCls} min-h-[120px] resize-y`} />
            </div>
            <button
              type="submit"
              disabled={sending}
              className={`flex items-center justify-center gap-2 py-3 px-6 rounded-md font-semibold text-white border-none transition-all duration-300 ${sending ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-primary hover:bg-blue-700 hover:-translate-y-0.5 cursor-pointer'}`}
            >
              {sent ? <><i className="fas fa-check"></i> Message Sent!</> : sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
