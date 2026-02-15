"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ShoppingBag, Store, ChevronLeft, Check } from "lucide-react";

type UserType = "buyer" | "seller" | null;
type PlanType = "base" | "plus" | "premium" | null;

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Calculate total steps based on user type
  const totalSteps = userType === "seller" ? 4 : 3;
  
  // Calculate progress
  const getProgressStep = () => {
    if (userType === "seller") {
      if (step === 1) return 1;
      if (step === 2) return 2;
      if (step === 3) return 3; // Billing plan step
      return 4;
    }
    return step;
  };
  
  const progress = (getProgressStep() / totalSteps) * 100;

  const handleContinue = () => {
    if (userType === "seller" && step === 2) {
      // Sellers go to billing plan step
      setStep(3);
    } else if (step === 3 && userType === "seller" && selectedPlan !== "base") {
      // Paid plans go to checkout
      router.push(`/auth/checkout?plan=${selectedPlan}`);
    } else if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreateAccount = async () => {
    if (!agreedToTerms) return;
    
    setIsLoading(true);
    
    // TODO: Replace with actual registration logic
    // For now, we'll simulate registration and route based on user type
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Route based on user type
    if (userType === "seller") {
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
          
          {/* Progress Indicator */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-zinc-500">
              Step {step} of {totalSteps}
            </span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-zinc-900 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        {/* Step 1: Choose Path */}
        {step === 1 && (
          <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Welcome Text */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
                Welcome to Hweibo.
              </h1>
              <p className="mt-4 text-xl text-zinc-500">
                Choose your path.
              </p>
            </div>

            {/* Selection Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Buyer Card */}
              <button
                onClick={() => setUserType("buyer")}
                className={`group relative flex flex-col items-center rounded-[32px] bg-zinc-50 p-10 text-center transition-all duration-300 hover:bg-zinc-100 ${
                  userType === "buyer"
                    ? "ring-2 ring-zinc-900"
                    : "ring-1 ring-zinc-200"
                }`}
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <ShoppingBag className="h-10 w-10 text-zinc-900" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900">Buyer</h3>
                <p className="mt-3 max-w-[260px] text-base text-zinc-500">
                  Discover curated items and shop from local stores with AI-powered recommendations.
                </p>
                {userType === "buyer" && (
                  <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>

              {/* Seller Card */}
              <button
                onClick={() => setUserType("seller")}
                className={`group relative flex flex-col items-center rounded-[32px] bg-zinc-50 p-10 text-center transition-all duration-300 hover:bg-zinc-100 ${
                  userType === "seller"
                    ? "ring-2 ring-zinc-900"
                    : "ring-1 ring-zinc-200"
                }`}
              >
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Store className="h-10 w-10 text-zinc-900" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900">Seller</h3>
                <p className="mt-3 max-w-[260px] text-base text-zinc-500">
                  List your inventory and reach a refined audience of local shoppers.
                </p>
                {userType === "seller" && (
                  <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>
            </div>

            {/* Next Button */}
            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleContinue}
                disabled={!userType}
                className="h-16 w-96 rounded-full bg-zinc-900 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Account Details */}
        {step === 2 && (
          <div className="w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-500">
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Create your account
              </h2>
              <p className="mt-2 text-zinc-500">
                Start with your core details
              </p>
            </div>

            <div className="rounded-3xl bg-zinc-50 p-8">
              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Full name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-14 rounded-2xl border-zinc-200 bg-white px-5 text-base placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:ring-zinc-200"
                    required
                  />
                </div>

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
                    placeholder="Create a secure password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-14 rounded-2xl border-zinc-200 bg-white px-5 text-base placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:ring-zinc-200"
                    required
                  />
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={!formData.fullName || !formData.email || !formData.password}
                  className="h-14 w-full rounded-full bg-zinc-900 text-base font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-500">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-zinc-900 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Billing Plan (Sellers only) */}
        {step === 3 && userType === "seller" && (
          <div className="w-full max-w-5xl animate-in fade-in slide-in-from-right-4 duration-500">
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Choose your Seller Plan
              </h2>
              <p className="mt-2 text-zinc-500">
                Scale your business with the right tools. Change plans anytime.
              </p>
            </div>

            {/* Plan Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Base Plan */}
              <button
                onClick={() => setSelectedPlan("base")}
                className={`relative flex flex-col rounded-[32px] bg-zinc-50 p-8 text-left transition-all duration-300 hover:bg-zinc-100 ${
                  selectedPlan === "base"
                    ? "ring-2 ring-zinc-900"
                    : "ring-1 ring-zinc-200"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-zinc-900">Base</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-light text-zinc-900">Free</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">Perfect for getting started</p>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-700">
                    <Check className="h-4 w-4 text-zinc-400" />
                    <span>Basic storefront</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-700">
                    <Check className="h-4 w-4 text-zinc-400" />
                    <span>5 active listings</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-700">
                    <Check className="h-4 w-4 text-zinc-400" />
                    <span>Standard email support</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center border-t border-zinc-200 pt-4">
                  <span className={`text-sm font-bold ${selectedPlan === "base" ? "text-zinc-900" : "text-zinc-500"}`}>
                    {selectedPlan === "base" ? "Selected" : "Select Base"}
                  </span>
                </div>
              </button>

              {/* Plus Plan */}
              <button
                onClick={() => setSelectedPlan("plus")}
                className={`relative flex flex-col rounded-[32px] bg-zinc-50 p-8 text-left transition-all duration-300 hover:bg-zinc-100 ${
                  selectedPlan === "plus"
                    ? "ring-2 ring-zinc-900"
                    : "ring-1 ring-zinc-200"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-zinc-900">Plus</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-light text-zinc-900">25k</span>
                    <span className="text-lg text-zinc-500">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-500">TZS per month</p>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-700">
                    <Check className="h-4 w-4 text-zinc-900" />
                    <span className="font-medium">Everything in Base</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-700">
                    <Check className="h-4 w-4 text-zinc-400" />
                    <span>50 active listings</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-700">
                    <Check className="h-4 w-4 text-zinc-400" />
                    <span>Verified badge</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-700">
                    <Check className="h-4 w-4 text-zinc-400" />
                    <span>Enhanced visibility</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center border-t border-zinc-200 pt-4">
                  <span className={`text-sm font-bold ${selectedPlan === "plus" ? "text-zinc-900" : "text-zinc-500"}`}>
                    {selectedPlan === "plus" ? "Selected" : "Select Plus"}
                  </span>
                </div>
              </button>

              {/* Premium Plan */}
              <button
                onClick={() => setSelectedPlan("premium")}
                className={`relative flex flex-col rounded-[32px] bg-zinc-900 p-8 text-left transition-all duration-300 hover:bg-zinc-800 ${
                  selectedPlan === "premium"
                    ? "ring-2 ring-zinc-900"
                    : "ring-1 ring-zinc-200"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white">Premium</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-light text-white">75k</span>
                    <span className="text-lg text-zinc-400">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">TZS per month</p>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="h-4 w-4 text-white" />
                    <span className="font-medium">Everything in Plus</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="h-4 w-4 text-zinc-500" />
                    <span>Unlimited listings</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="h-4 w-4 text-zinc-500" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="h-4 w-4 text-zinc-500" />
                    <span>Featured placement</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="h-4 w-4 text-zinc-500" />
                    <span>Analytics dashboard</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center border-t border-zinc-700 pt-4">
                  <span className={`text-sm font-bold ${selectedPlan === "premium" ? "text-white" : "text-zinc-400"}`}>
                    {selectedPlan === "premium" ? "Selected" : "Select Premium"}
                  </span>
                </div>
              </button>
            </div>

            {/* Continue Button */}
            <div className="mt-10 flex justify-center">
                <Button
                  onClick={handleContinue}
                  disabled={!selectedPlan}
                  className="h-16 w-96 rounded-full bg-zinc-900 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100"
                >
                  {selectedPlan === "base" ? "Continue" : "Proceed to Checkout"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation (Sellers) / Step 3: Confirmation (Buyers) */}
        {((step === 3 && userType === "buyer") || (step === 4 && userType === "seller")) && (
          <div className="w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-500">
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                Final step
              </h2>
              <p className="mt-2 text-zinc-500">
                Review and complete your registration
              </p>
            </div>

            <div className="rounded-3xl bg-zinc-50 p-8">
              <div className="mb-6 rounded-2xl bg-white p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
                    {userType === "buyer" ? (
                      <ShoppingBag className="h-6 w-6 text-zinc-900" />
                    ) : (
                      <Store className="h-6 w-6 text-zinc-900" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Account type</p>
                    <p className="text-lg font-semibold capitalize text-zinc-900">
                      {userType}
                    </p>
                  </div>
                </div>
                
                {userType === "seller" && selectedPlan && (
                  <div className="flex items-center gap-4 border-t border-zinc-100 pt-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
                      <span className="text-xl font-bold text-zinc-900">
                        {selectedPlan === "base" ? "Fr" : selectedPlan === "plus" ? "25k" : "75k"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">Selected plan</p>
                      <p className="text-lg font-semibold capitalize text-zinc-900">
                        {selectedPlan} {selectedPlan !== "base" && "/month"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <label className="mb-6 flex items-start gap-3">
                <Checkbox 
                  className="mt-0.5 rounded-md border-zinc-300" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <span className="text-sm text-zinc-600">
                  I agree to the{" "}
                  <Link href="/terms" className="font-medium text-zinc-900 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-medium text-zinc-900 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <Button 
                onClick={handleCreateAccount}
                disabled={!agreedToTerms || isLoading}
                className="h-14 w-full rounded-full bg-zinc-900 text-base font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
