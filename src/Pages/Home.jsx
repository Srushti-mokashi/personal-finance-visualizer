import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/image.png";
import {
  PlusCircle,
  Layers,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Zap,
  Moon,
  Sun,
  Accessibility,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0B0E14]/80 backdrop-blur border-b border-slate-200 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-110">
              <img src={logo} alt="BudgetVision Logo" className="h-5 w-5 brightness-200" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              BudgetVision
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition">
              How it Works
            </a>
            <a href="#features" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition">
              Features
            </a>
            <a href="#accessibility" className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white transition">
              Accessibility
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] bg-violet-500/10 dark:bg-violet-500/20 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/4" />

        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-white/10 bg-violet-50 dark:bg-white/5 py-1.5 px-4 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-xs font-semibold text-violet-700 dark:text-violet-300">
              Offline-Ready & Privacy-First
            </span>
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white leading-[1.1]">
            Track, Understand, and <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-500">
              Control Your Money.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            A beautiful, visual personal finance tracker that works entirely offline.
            No bank linking, no spying, just pure financial clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="min-w-[160px] inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-bold text-white
                bg-gradient-to-r from-violet-600 to-indigo-600
                shadow-lg shadow-indigo-500/25
                hover:shadow-indigo-500/40
                hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get Started Free
            </Link>
            <a
              href="#how-it-works"
              className="min-w-[160px] inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-slate-700 dark:text-white
                border border-slate-200 dark:border-white/10
                bg-white dark:bg-white/5
                hover:bg-slate-50 dark:hover:bg-white/10
                transition-all"
            >
              See How It Works
            </a>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 mx-auto max-w-5xl rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#121526]/80 p-2 backdrop-blur-sm shadow-2xl">
            <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0B0E14] aspect-[16/9] relative grid place-items-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 mx-auto flex items-center justify-center mb-4">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-lg font-semibold dark:text-white">Interactive Dashboard Preview</h3>
                <p className="text-slate-500">Sign up to see your personalized analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-[#11162A]/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Get control of your finances in four simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="01"
              icon={<PlusCircle className="w-6 h-6" />}
              title="Add Transactions"
              desc="Quickly log your income and expenses."
            />
            <StepCard
              number="02"
              icon={<Layers className="w-6 h-6" />}
              title="Categorize"
              desc="Organize spending into custom buckets."
            />
            <StepCard
              number="03"
              icon={<Calendar className="w-6 h-6" />}
              title="Visualize Weekly"
              desc="See where money goes on the calendar."
            />
            <StepCard
              number="04"
              icon={<TrendingUp className="w-6 h-6" />}
              title="Improve"
              desc="Use insights to cut costs and save more."
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Powerful features packed into a simple, elegant interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="text-amber-500" />}
              title="Income & Expense Tracking"
              desc="Log transactions in seconds with smart auto-completion."
            />
            <FeatureCard
              icon={<Calendar className="text-blue-500" />}
              title="Calendar View"
              desc="Visualize your spending patterns across the month."
            />
            <FeatureCard
              icon={<BarChart3 className="text-violet-500" />}
              title="Interactive Analytics"
              desc="Beautiful charts that explain your financial health."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-emerald-500" />}
              title="Privacy First"
              desc="Your data is stored locally. No servers. No snooping."
            />
            <FeatureCard
              icon={<Layers className="text-indigo-500" />}
              title="Budgeting Limits"
              desc="Set monthly limits for categories and get alerts."
            />
            <FeatureCard
              icon={<CheckCircle2 className="text-rose-500" />}
              title="Offline Ready"
              desc="Works perfectly without any internet connection."
            />
          </div>
        </div>
      </section>

      {/* ================= WHY DIFFERENT ================= */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Why BudgetVision is <br /><span className="text-blue-400">Different.</span>
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                Most finance apps sell your data or require bank logins. We don't.
                We built this for people who want control, privacy, and simplicity.
              </p>

              <div className="space-y-4">
                <CheckItem text="Works 100% Offline" />
                <CheckItem text="Zero Data Collection (Local Storage Only)" />
                <CheckItem text="No Bank Linking Required" />
                <CheckItem text="Native ₹ Currency Support for India" />
                <CheckItem text="Ad-Free Experience Forever" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur-xl opacity-50 transform rotate-3"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xl">
                    <ShieldCheck />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Bank-Grade Privacy</h3>
                    <p className="text-blue-200 text-sm">Your Finance Data</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">
                  "We believe your financial data belongs to you, and only you. That's why BudgetVision stores everything on your device."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACCESSIBILITY SECTION ================= */}
      <section id="accessibility" className="py-24 bg-slate-50 dark:bg-[#11162A]/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-6">
                <Accessibility size={14} /> Inclusive Design
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Built for Everyone.
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                We believe financial freedom should be accessible to all.
                Efficiency and usability are baked into every pixel.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AccessItem icon={<Sun size={20} />} title="High Contrast" desc="WCAG AA compliant colors for readability." />
                <AccessItem icon={<Moon size={20} />} title="Reduced Motion" desc="Respects system preferences for animations." />
                <AccessItem icon={<Layers size={20} />} title="Screen Readers" desc="Fully navigable with meaningful ARIA labels." />
                <AccessItem icon={<Zap size={20} />} title="Keyboard Control" desc="Complete functionality without a mouse." />
              </div>
            </div>

            <div className="flex-1 order-1 md:order-2 flex justify-center">
              <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-white/10 p-6">
                <div className="space-y-4">
                  <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-700/50 rounded animate-pulse"></div>

                  <div className="flex gap-4 mt-8">
                    <div className="h-10 w-full bg-violet-600 rounded-lg opacity-80"></div>
                    <div className="h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 text-center px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Start Controlling Your Money Today.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
            Join thousands of users who are making smarter financial decisions with BudgetVision.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white
              bg-slate-900 dark:bg-white dark:text-slate-900
              hover:bg-slate-800 dark:hover:bg-slate-200
              transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B0E14] py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <img src={logo} alt="Logo" className="h-4 w-4 brightness-200" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">BudgetVision</span>
          </div>

          <div className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Designed for Financial Freedom.
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function StepCard({ number, icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-violet-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-lg text-violet-600 dark:text-violet-400">
          {icon}
        </div>
        <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-sm font-bold shadow-md">
          {number}
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all group">
      <div className="mb-4 inline-flex p-3 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function CheckItem({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 text-emerald-400">
        <CheckCircle2 size={20} />
      </div>
      <span className="text-slate-200">{text}</span>
    </div>
  );
}

function AccessItem({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{desc}</p>
      </div>
    </div>
  );
}
