const team = [
  {
    name: 'Minahil Fatima',
    role: 'CEO & Co-Founder',
    avatar: 'MF',
    photo: '/images/team/member1.png',
    bio: 'Visionary leader with 15+ years in consumer electronics. Passionate about making premium tech accessible to everyone.',
    gradient: 'from-blue-600 to-cyan-500',
    twitter: '#',
    linkedin: '#',
    github: '#',
    stats: [{ label: 'Years Exp.', value: '15+' }, { label: 'Products', value: '200+' }],
  },
  {
    name: 'Aisha Patel',
    role: 'CTO & Co-Founder',
    avatar: 'AP',
    photo: '/images/team/member2.png',
    bio: 'Full-stack engineer turned product architect. Leads our platform engineering and drives our technical roadmap.',
    gradient: 'from-violet-600 to-purple-500',
    twitter: '#',
    linkedin: '#',
    github: '#',
    stats: [{ label: 'Years Exp.', value: '12+' }, { label: 'Systems', value: '50+' }],
  },
  {
    name: 'Marcus Lee',
    role: 'Head of Product',
    avatar: 'ML',
    photo: '/images/team/member3.png',
    bio: 'Product strategist obsessed with user experience. Ensures every feature we ship delights our customers.',
    gradient: 'from-emerald-600 to-teal-500',
    twitter: '#',
    linkedin: '#',
    github: '#',
    stats: [{ label: 'Years Exp.', value: '10+' }, { label: 'Launches', value: '80+' }],
  },
  {
    name: 'Sofia Reyes',
    role: 'Head of Design',
    avatar: 'SR',
    photo: '/images/team/member4.png',
    bio: 'Award-winning designer who crafts beautiful, intuitive interfaces. Believes great design is invisible.',
    gradient: 'from-rose-600 to-pink-500',
    twitter: '#',
    linkedin: '#',
    github: '#',
    stats: [{ label: 'Years Exp.', value: '9+' }, { label: 'Awards', value: '12' }],
  },
];

function About() {
  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-16">

      {/* ── Hero ── */}
      <section className="bg-slate-700 rounded-2xl px-10 py-14 text-center text-white">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-300 bg-white/10 px-4 py-1.5 rounded-full mb-4">
          Our Story
        </span>
        <h1 className="text-5xl font-extrabold text-white mb-4 mt-0 leading-tight">
          About TechHaven
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed m-0 max-w-2xl mx-auto">
          Our story, our mission, and the people who make it happen.
        </p>
      </section>

      {/* ── Story ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <img src="/images/categories/cat1.jpg" alt="Our Team"
            className="w-full rounded-2xl object-cover shadow-2xl" />
          <div className="absolute -bottom-5 -right-5 bg-brand-primary text-white rounded-2xl px-6 py-4 shadow-xl hidden md:block">
            <div className="text-3xl font-extrabold leading-none">2026</div>
            <div className="text-blue-100 text-xs font-medium mt-1">Founded</div>
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-5 mt-0 leading-tight">Our Story</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 mt-0">
            Founded in 2026, TechHaven started with a simple idea: to make premium consumer electronics accessible to everyone. We believe that technology has the power to elevate our daily lives, and we're passionate about bringing the best and most innovative products to our community.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 mt-0">
            What began as a small online storefront has grown into a premier destination for tech enthusiasts, professionals, and everyday consumers alike.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '10k+', label: 'Happy Customers', icon: 'fa-users' },
              { value: '500+', label: 'Products',        icon: 'fa-box-open' },
              { value: '24/7', label: 'Support',         icon: 'fa-headset' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center">
                <i className={`fas ${stat.icon} text-brand-primary text-xl mb-2 block`}></i>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none mb-1">{stat.value}</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section>
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-primary bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full mb-4">
            Why Us
          </span>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 mt-0 leading-tight">Why Choose TechHaven?</h2>
          <p className="text-slate-600 dark:text-slate-400 m-0">We're more than just an electronics store.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'fa-shipping-fast', title: 'Fast Shipping',   text: 'Free standard shipping on all orders over $50. Need it faster? We offer expedited options too.', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
            { icon: 'fa-shield-alt',    title: 'Secure Checkout', text: 'Your data is safe with us. We use industry-leading encryption to protect your personal information.', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
            { icon: 'fa-undo',          title: 'Easy Returns',    text: 'Not completely satisfied? Return your item within 30 days for a full refund or exchange.', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/30' },
          ].map((feat) => (
            <div key={feat.title} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${feat.bg} ${feat.color} transition-transform duration-300 group-hover:scale-110`}>
                <i className={`fas ${feat.icon}`}></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0 mb-2 leading-tight">{feat.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0 text-sm">{feat.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section>
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-primary bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full mb-4">
            The Team
          </span>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 mt-0 leading-tight">
            Meet the People Behind TechHaven
          </h2>
          <p className="text-slate-600 dark:text-slate-400 m-0 max-w-xl mx-auto">
            A passionate team of engineers, designers, and product thinkers united by a love for great technology.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name}
              className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-transparent">

              {/* Gradient top band */}
              <div className={`h-2 bg-gradient-to-r ${member.gradient}`}></div>

              {/* Avatar + name */}
              <div className="px-6 pt-8 pb-5 flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-2xl mb-4 shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 bg-gradient-to-br ${member.gradient}`}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="w-full h-full flex items-center justify-center text-white font-extrabold text-2xl">${member.avatar}</span>`;
                      }
                    }}
                  />
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-lg m-0 leading-tight">{member.name}</h3>
                <p className={`text-sm font-semibold mt-1 m-0 bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent`}>
                  {member.role}
                </p>
              </div>

              {/* Stats row */}
              <div className="mx-6 mb-5 grid grid-cols-2 gap-3">
                {member.stats.map((s) => (
                  <div key={s.label} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">{s.value}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] font-medium mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Bio */}
              <div className="px-6 pb-5 flex-1">
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed m-0">{member.bio}</p>
              </div>

              {/* Social links */}
              <div className="px-6 pb-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                <a href={member.twitter} aria-label={`${member.name} on Twitter`}
                  className="flex-1 flex items-center justify-center h-9 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-[#1DA1F2] hover:text-white transition-all duration-200 no-underline text-sm">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href={member.linkedin} aria-label={`${member.name} on LinkedIn`}
                  className="flex-1 flex items-center justify-center h-9 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-[#0A66C2] hover:text-white transition-all duration-200 no-underline text-sm">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href={member.github} aria-label={`${member.name} on GitHub`}
                  className="flex-1 flex items-center justify-center h-9 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-800 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all duration-200 no-underline text-sm">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Join the team CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-extrabold text-white m-0 mb-2">Want to join our team?</h3>
            <p className="text-blue-100 m-0 text-sm">We're always looking for talented people who share our passion for technology.</p>
          </div>
          <a href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-brand-primary font-bold px-7 py-3.5 rounded-xl no-underline hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
            <i className="fas fa-paper-plane"></i> Get in Touch
          </a>
        </div>
      </section>

    </main>
  );
}

export default About;
