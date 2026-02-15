"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowRight, ShoppingBag, Store, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Replace with actual authentication logic
    // For now, we'll simulate a login and route based on user type
    // In production, this would come from the backend response
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user type detection - in production, this comes from backend
    // Check if email contains 'seller' to route to seller dashboard
    const isSeller = formData.email.toLowerCase().includes('seller');
    
    if (isSeller) {
      router.push('/sellers');
    } else {
      router.push('/buyers');
    }
    
    setIsLoading(false);
  };
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
          <div className="flex items-center gap-4 text-sm">
            <span className="text-zinc-500">New to Hweibo?</span>
            <Link
              href="/auth/register"
              className="font-semibold text-zinc-900 hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">
          {/* Welcome Text */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              Welcome back
            </h1>
            <p className="mt-2 text-zinc-500">
              Sign in to continue your shopping journey
            </p>
          </div>

          {/* Login Form */}
          <div className="rounded-3xl bg-zinc-50 p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Email address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-14 rounded-2xl border-zinc-200 bg-white px-5 text-base placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:ring-zinc-200"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-14 rounded-2xl border-zinc-200 bg-white px-5 text-base placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:ring-zinc-200"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-zinc-600">
                  <Checkbox className="rounded-md border-zinc-300" />
                  Remember me
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-zinc-900 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit"
                disabled={isLoading}
                className="h-14 w-full rounded-full bg-zinc-900 text-base font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-zinc-200 bg-white font-medium text-zinc-700 hover:bg-zinc-50"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-zinc-200 bg-white font-medium text-zinc-700 hover:bg-zinc-50"
              >
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Apple
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                <Sparkles className="h-5 w-5 text-zinc-600" />
              </div>
              <p className="text-xs font-medium text-zinc-600">AI Powered</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                <Store className="h-5 w-5 text-zinc-600" />
              </div>
              <p className="text-xs font-medium text-zinc-600">Local Stores</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
                <ShoppingBag className="h-5 w-5 text-zinc-600" />
              </div>
              <p className="text-xs font-medium text-zinc-600">Easy Shopping</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
