import { useRef, useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  product: string;
  category: string;
  title: string;
  body: string;
  verified: boolean;
}

const SEED_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatar: 'AJ',
    rating: 5,
    date: 'April 20, 2026',
    product: 'Premium Wireless Headphones',
    category: 'Audio',
    title: 'Absolutely incredible sound quality!',
    body: "These headphones have completely transformed my listening experience. The noise cancellation is top-notch and the battery life is exactly as advertised. I use them daily for work calls and music — couldn't be happier.",
    verified: true,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: 'SC',
    rating: 5,
    date: 'April 15, 2026',
    product: 'Apple Elite 14 Laptop',
    category: 'Laptops & PCs',
    title: "Best laptop I've ever owned",
    body: "Blazing fast performance, stunning display, and the build quality is exceptional. Handles everything from video editing to gaming without breaking a sweat. TechHaven's shipping was super fast too.",
    verified: true,
  },
  {
    id: 3,
    name: 'Mike Rivera',
    avatar: 'MR',
    rating: 4,
    date: 'April 10, 2026',
    product: 'Sony Alpha A2 Camera',
    category: 'Cameras',
    title: 'Professional quality at a great price',
    body: 'The image quality is stunning and autofocus is lightning fast. Took a star off only because the battery life could be better. Overall a fantastic camera for both hobbyists and professionals.',
    verified: true,
  },
  {
    id: 4,
    name: 'Emily Wong',
    avatar: 'EW',
    rating: 5,
    date: 'April 5, 2026',
    product: 'Apple Watch Ultra 9',
    category: 'Wearables',
    title: 'Worth every penny',
    body: "The health tracking features are incredibly accurate. I love the always-on display and the battery easily lasts two days. The build quality feels premium and it looks great with any outfit.",
    verified: false,
  },
  {
    id: 5,
    name: 'David Park',
    avatar: 'DP',
    rating: 4,
    date: 'March 28, 2026',
    product: 'Google Max 38 Smartphone',
    category: 'Smartphones',
    title: 'Excellent camera, smooth performance',
    body: 'The camera system on this phone is unreal — every shot looks professional. The AI features are genuinely useful. Only minor gripe is the charging speed could be faster compared to competitors.',
    verified: true,
  },
  {
    id: 6,
    name: 'Priya Sharma',
    avatar: 'PS',
    rating: 5,
    date: 'March 22, 2026',
    product: 'Bose Pro 78 Headphones',
    category: 'Audio',
    title: 'Studio-quality sound at home',
    body: "I'm a music producer and these headphones are now my go-to for mixing. The flat frequency response is perfect for professional work. Incredibly comfortable for long sessions too.",
    verified: true,
  },
];

const REVIEWS_KEY = 'techhavenReviews';
const CATEGORIES = ['All', 'Audio', 'Laptops & PCs', 'Smartphones', 'Cameras', 'Wearables'];

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (raw) {
      const parsed: Review[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return SEED_REVIEWS;
}

function saveReviews(reviews: Review[]) {
  try { localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews)); } catch { /* ignore */ }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'text-xl' : 'text-sm';
  return (
    <div className={`flex gap-0.5 ${cls}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <i key={star} className={star <= rating ? 'fas fa-star text-amber-400' : 'far fa-star text-slate-300'} />
      ))}
    </div>
  );
}

function Reviews() {
  const [reviews, setReviews]           = useState<Review[]>(loadReviews);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy]             = useState('newest');

  /* persist reviews to localStorage whenever they change */
  useEffect(() => { saveReviews(reviews); }, [reviews]);
  const [showForm, setShowForm]         = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [formRating, setFormRating]     = useState(0);
  const [hoverRating, setHoverRating]   = useState(0);
  const [formError, setFormError]       = useState('');

  /* Controlled form fields */
  const [fName, setFName]       = useState('');
  const [fProduct, setFProduct] = useState('');
  const [fCategory, setFCategory] = useState('Audio');
  const [fTitle, setFTitle]     = useState('');
  const [fBody, setFBody]       = useState('');

  const formRef = useRef<HTMLFormElement>(null);

  /* ── derived stats from live reviews array ── */
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const ratingCounts = [5, 4, 3, 2, 1].map((r) => {
    const count = reviews.filter((rev) => rev.rating === r).length;
    const pct   = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
    return { star: r, count, pct };
  });

  const filtered = reviews
    .filter((r) => activeCategory === 'All' || r.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest')  return a.rating - b.rating;
      return b.id - a.id; // newest first
    });

  /* ── form submit: actually add the review to state ── */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    if (formRating === 0) { setFormError('Please select a star rating.'); return; }
    if (!fName.trim())    { setFormError('Please enter your name.'); return; }
    if (!fProduct.trim()) { setFormError('Please enter the product name.'); return; }
    if (!fTitle.trim())   { setFormError('Please enter a review title.'); return; }
    if (!fBody.trim())    { setFormError('Please write your review.'); return; }

    const newReview: Review = {
      id:       Date.now(),
      name:     fName.trim(),
      avatar:   getInitials(fName.trim()),
      rating:   formRating,
      date:     formatDate(new Date()),
      product:  fProduct.trim(),
      category: fCategory,
      title:    fTitle.trim(),
      body:     fBody.trim(),
      verified: false,
    };

    setReviews((prev) => [newReview, ...prev]);

    /* reset form */
    setFName(''); setFProduct(''); setFCategory('Audio');
    setFTitle(''); setFBody(''); setFormRating(0); setHoverRating(0);
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const pctToClass = (pct: number) =>
    pct >= 100 ? 'w-full' : pct >= 90 ? 'w-[90%]' : pct >= 80 ? 'w-[80%]' :
    pct >= 70  ? 'w-[70%]' : pct >= 60 ? 'w-[60%]' : pct >= 50 ? 'w-1/2' :
    pct >= 40  ? 'w-[40%]' : pct >= 30 ? 'w-[30%]' : pct >= 20 ? 'w-[20%]' :
    pct >= 10  ? 'w-[10%]' : 'w-0';

  const inputCls = "w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-brand-primary transition-colors duration-200";

  return (
    <main className="max-w-[1200px] mx-auto px-5 py-10 flex flex-col gap-10">

      {/* ── Hero ── */}
      <section className="bg-slate-700 rounded-2xl px-10 py-14 text-center text-white">
        <h1 className="text-5xl font-extrabold text-white mb-3 mt-0 leading-tight">
          Customer Reviews
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed m-0">
          Real experiences from our community of tech enthusiasts.
        </p>
      </section>

      {/* ── Success toast ── */}
      {submitted && (
        <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 rounded-xl px-5 py-4 text-sm font-medium">
          <i className="fas fa-check-circle text-lg"></i>
          <span>Your review has been posted successfully!</span>
        </div>
      )}

      {/* ── Summary + Write Review button ── */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col sm:flex-row gap-8 items-center">
          <div className="text-center flex-shrink-0">
            <div className="text-7xl font-extrabold text-slate-900 dark:text-white leading-none mb-2">{avgRating}</div>
            <StarRating rating={Math.round(parseFloat(avgRating))} size="lg" />
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 m-0">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex-1 w-full flex flex-col gap-2">
            {ratingCounts.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 w-8 flex-shrink-0">
                  {star} <i className="fas fa-star text-amber-400 text-xs"></i>
                </span>
                <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className={`h-full bg-amber-400 rounded-full transition-all duration-500 ${pctToClass(pct)}`}></div>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 w-8 text-right flex-shrink-0">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 bg-brand-primary text-white font-semibold px-6 py-3 rounded-xl border-none cursor-pointer hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
          onClick={() => { setShowForm((v) => !v); setFormError(''); }}
        >
          <i className={`fas ${showForm ? 'fa-times' : 'fa-pen'}`}></i>
          {showForm ? 'Cancel' : 'Write a Review'}
        </button>
      </section>

      {/* ── Write Review Form ── */}
      {showForm && (
        <section className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 mt-0">Write Your Review</h2>

          {formError && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
              <i className="fas fa-exclamation-circle"></i> {formError}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Star picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="text-3xl bg-transparent border-none cursor-pointer p-0 transition-transform duration-150 hover:scale-110"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setFormRating(star)}
                  >
                    <i className={(hoverRating || formRating) >= star ? 'fas fa-star text-amber-400' : 'far fa-star text-slate-300'} />
                  </button>
                ))}
                {formRating > 0 && (
                  <span className="self-center text-sm text-slate-500 dark:text-slate-400 ml-2">
                    {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][formRating]}
                  </span>
                )}
              </div>
            </div>

            {/* Name + Product */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="John Doe" value={fName}
                  onChange={(e) => setFName(e.target.value)} className={inputCls} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="e.g. Premium Wireless Headphones" value={fProduct}
                  onChange={(e) => setFProduct(e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* Category + Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                <select value={fCategory} onChange={(e) => setFCategory(e.target.value)} className={inputCls}>
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Review Title <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Summarize your experience" value={fTitle}
                  onChange={(e) => setFTitle(e.target.value)} className={inputCls} />
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea rows={4} placeholder="Tell us about your experience with this product..." value={fBody}
                onChange={(e) => setFBody(e.target.value)}
                className={`${inputCls} resize-y min-h-[120px]`} />
            </div>

            <div className="flex gap-3 flex-wrap">
              <button type="submit"
                className="flex items-center gap-2 bg-brand-primary text-white font-semibold px-6 py-3 rounded-xl border-none cursor-pointer hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-300">
                <i className="fas fa-paper-plane"></i> Post Review
              </button>
              <button type="button"
                className="flex items-center gap-2 bg-transparent border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-semibold px-6 py-3 rounded-xl cursor-pointer hover:border-slate-400 transition-all duration-300"
                onClick={() => { setShowForm(false); setFormError(''); }}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* ── Filters ── */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} type="button"
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-brand-primary hover:text-brand-primary'
              }`}
              onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-brand-primary transition-colors duration-200">
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </section>

      {/* ── Review Cards ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((review) => (
          <article key={review.id}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">{review.name}</div>
                  <div className="text-slate-400 text-xs">{review.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!review.verified && (
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 px-2.5 py-1 rounded-full">
                    New
                  </span>
                )}
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-1 rounded-full">
                    <i className="fas fa-check-circle"></i> Verified
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div>
              <StarRating rating={review.rating} />
              <h3 className="font-bold text-slate-900 dark:text-white text-base mt-2 mb-1">{review.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed m-0">{review.body}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
              <span className="inline-block text-xs font-medium text-brand-primary bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full">
                {review.category}
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs truncate">{review.product}</span>
            </div>
          </article>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <i className="fas fa-star text-4xl mb-4 block"></i>
          <p className="m-0">No reviews found for this category.</p>
        </div>
      )}
    </main>
  );
}

export default Reviews;
