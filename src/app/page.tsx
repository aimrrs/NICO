"use client";

import React, { useState, useEffect } from "react";
import {
  ToggleLeft,
  Cpu,
  Zap,
  Check,
  ArrowRight,
  X,
  Sparkles,
  Terminal,
  ShieldCheck,
  Layers,
  Code2,
  Lock,
  ChevronRight
} from "lucide-react";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsSubmitted(false);
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing_modal" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setIsSubmitted(true);
      setEmail("");
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Dynamic Background Mesh / Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-[35%] -left-[180px] w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[65%] -right-[150px] w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] rounded-full" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* 1. Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <a
              href="#"
              className="text-xl sm:text-2xl font-bold font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 hover:opacity-90 transition-opacity"
            >
              NICO
            </a>
          </div>

          {/* Right Nav */}
          <div className="flex items-center space-x-4 sm:space-x-7">
            <button
              onClick={handleOpenModal}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={handleOpenModal}
              className="relative inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-sm font-medium rounded-lg text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-md shadow-cyan-500/20 font-sans"
            >
              <span>Start Free Trial</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow text */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 mb-8 shadow-sm backdrop-blur-sm group hover:border-cyan-700/60 transition-all">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-medium tracking-wide text-cyan-300">
            N.I.C.O. - Neural Information Cache Object
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.15] mb-6">
          The background memory layer for your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            AI workflow.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Sync your project context effortlessly across ChatGPT, Claude, and Gemini. Never re-explain your architecture or paste old code snippets to an AI again.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleOpenModal}
            className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-xl text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 font-semibold text-base shadow-[0_0_35px_-5px_rgba(34,211,238,0.4)] hover:shadow-[0_0_45px_0px_rgba(34,211,238,0.6)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 hover:border-slate-600 text-slate-300 hover:text-white font-medium text-base transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm"
          >
            <span>Read the Docs</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>
        </div>

        {/* Visual Mock / Terminal Preview */}
        <div className="mt-16 sm:mt-20 w-full max-w-4xl relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-60 pointer-events-none" />
          <div className="relative rounded-xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800/70">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>active_cache_layer: nico-v1.json</span>
              </div>
              <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                LIVE SYNC
              </div>
            </div>

            {/* Code / JSON simulation */}
            <div className="p-5 sm:p-6 text-left font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-300 bg-slate-950/60">
              <div className="flex items-center space-x-2 text-slate-500 mb-2">
                <span>// Extracted context automatically synced to Claude & Gemini</span>
              </div>
              <p>
                <span className="text-cyan-400">const</span>{" "}
                <span className="text-emerald-300">neuralCacheObject</span> = {"{"}
              </p>
              <p className="pl-4">
                <span className="text-slate-400">project:</span>{" "}
                <span className="text-amber-300">"hyper-distributed-kv"</span>,
              </p>
              <p className="pl-4">
                <span className="text-slate-400">architecture:</span>{" "}
                <span className="text-emerald-400">"Raft consensus over gRPC (Go)"</span>,
              </p>
              <p className="pl-4">
                <span className="text-slate-400">activeDecisions:</span> [
              </p>
              <p className="pl-8 text-slate-300">
                <span className="text-amber-300">"Discarded SQLite for BadgerDB in storage engine"</span>,
              </p>
              <p className="pl-8 text-slate-300">
                <span className="text-amber-300">"Zero-copy serialization with flatbuffers"</span>
              </p>
              <p className="pl-4">],</p>
              <p className="pl-4">
                <span className="text-slate-400">crossModelSynced:</span>{" "}
                <span className="text-cyan-400">true</span>,{" "}
                <span className="text-slate-500">// Available in ChatGPT, Claude 3.5, Gemini 1.5</span>
              </p>
              <p>{"}"};</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How it Works (3-Column Grid) */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow Automation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Zero friction. Infinite memory.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            No cumbersome copy-pasting, manual embeddings, or context files to maintain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative group rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-300 shadow-inner">
                <ToggleLeft className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                1. Connect & Code.
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Toggle NICO in your browser. Work in ChatGPT or Claude exactly like you normally do.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center text-xs font-mono text-cyan-400/80">
              <span>0% BEHAVIOR CHANGE</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8 hover:border-emerald-500/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 group-hover:border-emerald-400 transition-all duration-300 shadow-inner">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                2. Background Extraction.
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                When you close the chat, NICO extracts finalized decisions and working code into structured JSON objects. No junk, just signal.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center text-xs font-mono text-emerald-400/80">
              <span>AUTOMATIC COMPRESSION</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group rounded-2xl bg-slate-900/40 border border-slate-800/80 p-8 hover:border-teal-500/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full group-hover:bg-teal-500/10 transition-colors pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-800/60 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-105 group-hover:border-teal-400 transition-all duration-300 shadow-inner">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                3. Instant Retrieval.
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Next time you open any AI model, it instantly reads your project's Neural Cache. It already knows what you decided yesterday.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-center text-xs font-mono text-teal-400/80">
              <span>CROSS-MODEL CONTINUITY</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pricing Section (The Painted Door Test) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Transparent Plans</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Simple pricing for developers and teams.
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Supercharge your personal developer velocity or your whole engineering organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 (Hobbyist) */}
          <div className="relative rounded-2xl bg-slate-900/40 border border-slate-800 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Hobbyist</h3>
                  <p className="text-slate-400 text-sm mt-1">For indie devs and quick side projects.</p>
                </div>
              </div>
              <div className="mt-6 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white">₹99</span>
                <span className="text-slate-400 ml-2 text-sm font-medium">/ month</span>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-slate-300">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>1 Project</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Local History</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>50 Extractions/mo</span>
                </li>
              </ul>
            </div>

            <div className="mt-10">
              <button
                onClick={handleOpenModal}
                data-umami-event="Clicked Hobbyist Tier"
                className="w-full py-3.5 px-6 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold transition-all duration-200"
              >
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Card 2 (Pro - Highlighted) */}
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border-2 border-cyan-500/60 p-8 sm:p-10 flex flex-col justify-between shadow-[0_0_50px_-15px_rgba(6,182,212,0.3)]">
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-md">
              Most Popular
            </div>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <span>Pro</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">For heavy AI builders and power devs.</p>
                </div>
              </div>
              <div className="mt-6 mb-8">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white">₹149</span>
                <span className="text-slate-400 ml-2 text-sm font-medium">/ month</span>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-slate-200">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span className="font-medium text-white">Unlimited Projects</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Automated Background Sync</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Cross-AI Integrations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Priority Vector Search</span>
                </li>
              </ul>
            </div>

            <div className="mt-10">
              <button
                onClick={handleOpenModal}
                data-umami-event="Clicked Pro Tier"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-[0.98] transition-all duration-200"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs sm:text-sm font-mono space-y-4 sm:space-y-0">
        <div>© {new Date().getFullYear()} NICO. All rights reserved.</div>
        <div className="flex space-x-6">
          <span className="hover:text-slate-300 cursor-pointer" onClick={handleOpenModal}>Privacy</span>
          <span className="hover:text-slate-300 cursor-pointer" onClick={handleOpenModal}>Terms</span>
          <span className="hover:text-slate-300 cursor-pointer" onClick={handleOpenModal}>Status</span>
        </div>
      </footer>

      {/* 5. The Interactive Modal (Crucial Painted Door Test) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_-5px_rgba(6,182,212,0.3)] z-10 transition-all duration-200 scale-100">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Icon Badge */}
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 mb-5 shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>

            {/* Headline */}
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              We're in closed developer beta.
            </h3>

            {/* Copy */}
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Drop your email below to get early access and be first in line when we onboard the next cohort of developers.
            </p>

            {isSubmitted ? (
              <div className="rounded-xl bg-emerald-950/60 border border-emerald-800/80 p-4 text-emerald-300 text-sm flex items-start space-x-3">
                <Check className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-200">You're on the priority list!</p>
                  <p className="mt-1 text-emerald-400/90 text-xs">
                    We'll reach out to your inbox as soon as your beta access key is ready.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="text-xs text-rose-400 bg-rose-950/50 border border-rose-800/60 rounded-lg p-2.5">
                    {errorMsg}
                  </div>
                )}
                <div>
                  <label htmlFor="beta-email" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Developer Email
                  </label>
                  <input
                    id="beta-email"
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@gmail.com"
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-sans text-sm disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  data-umami-event="Submitted Waitlist Email"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 text-slate-950 font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 flex items-center justify-center space-x-2"
                >
                  {isLoading ? <span>Joining...</span> : <span>Join Waitlist</span>}
                </button>
              </form>
            )}

            <div className="mt-6 flex items-center justify-center space-x-2 text-[11px] font-mono text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>No spam. Strict developer telemetry only.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
