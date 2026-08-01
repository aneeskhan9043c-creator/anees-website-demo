import { LeadForm } from './components/LeadForm';
import { Sparkles, Star, Users, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Minimal Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-200">
              A
            </div>
            <span>Anees<span className="text-indigo-600">.Dev</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Accepting New Projects
            </span>
            <a 
              href="#booking-form" 
              className="bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm">
              Book Call
            </a>
          </div>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        {/* Hero Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>High-Converting Digital Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Transforming Ideas into <br className="hidden sm:inline"/>
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
              Digital Reality.
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            We build high-converting React websites, n8n automation workflows, and local SEO systems tailored to scale your agency.
          </p>

          {/* Social Proof & Metrics Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-600 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900">5.0</span> (30+ Reviews)
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-sm">
              <Users className="w-4 h-4 text-indigo-600" />
              <span><strong className="text-slate-900">10k+</strong> Followers & Reach</span>
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-sm">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span><strong className="text-slate-900">50+</strong> Projects Shipped</span>
            </div>
          </div>
        </div>

        {/* Booking Form Card Section */}
        <div id="booking-form" className="mt-14 max-w-4xl mx-auto">
          <LeadForm />
        </div>
      </main>
    </div>
  );
}

