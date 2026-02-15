"use client";

import Link from "next/link";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";

export default function AuthLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl font-bold tracking-tight text-zinc-900">
              Hweibo
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="w-full max-w-2xl">
          {/* Welcome Text */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
              Welcome to Hweibo
            </h1>
            <p className="mt-4 text-xl text-zinc-500">
              Choose how you&apos;d like to get started
            </p>
          </div>

          {/* Auth Options */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Login Card */}
            <Link
              href="/auth/login"
              className="group relative flex flex-col items-center rounded-[32px] bg-zinc-50 p-10 text-center transition-all duration-300 hover:bg-zinc-100 ring-1 ring-zinc-200 hover:ring-zinc-900"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                <LogIn className="h-10 w-10 text-zinc-900" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900">Login</h3>
              <p className="mt-3 max-w-[260px] text-base text-zinc-500">
                Already have an account? Sign in to continue your journey.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-zinc-900">
                Sign In
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Register Card */}
            <Link
              href="/auth/register"
              className="group relative flex flex-col items-center rounded-[32px] bg-zinc-900 p-10 text-center transition-all duration-300 hover:bg-zinc-800 ring-1 ring-zinc-900"
            >
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <UserPlus className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Sign Up</h3>
              <p className="mt-3 max-w-[260px] text-base text-zinc-400">
                New to Hweibo? Create an account to start shopping or selling.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                Create Account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
