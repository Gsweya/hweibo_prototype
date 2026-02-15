"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, CreditCard, Building2, Smartphone, Check, Loader2 } from "lucide-react";

type PaymentMethod = "card" | "crdb" | "nmb" | "mpesa" | "tigopesa" | "halopesa" | "airtelmoney" | null;

const banks = [
  { id: "crdb", name: "CRDB Bank", logo: "🏦" },
  { id: "nmb", name: "NMB Bank", logo: "🏛️" },
];

const mnos = [
  { id: "mpesa", name: "M-Pesa", logo: "📱", color: "bg-green-600" },
  { id: "tigopesa", name: "Tigo Pesa", logo: "💙", color: "bg-blue-600" },
  { id: "halopesa", name: "Halopesa", logo: "🟠", color: "bg-orange-500" },
  { id: "airtelmoney", name: "Airtel Money", logo: "❤️", color: "bg-red-600" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    phoneNumber: "",
  });

  // Get plan details from URL or state (using URL params for demo)
  const planName = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('plan') || 'Plus'
    : 'Plus';
  const planPrice = planName === 'Premium' ? '75,000' : '25,000';

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    
    // Wait a moment to show success, then redirect
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/sellers');
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center animate-in zoom-in duration-500">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mx-auto">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Payment Successful!</h2>
          <p className="text-zinc-500">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

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
          <div className="text-sm font-semibold text-zinc-500">
            Secure Checkout
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center px-6 pt-20 pb-12">
        <div className="w-full max-w-4xl">
          <Link
            href="/auth/register"
            className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to plan selection
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Order Summary */}
            <div className="rounded-3xl bg-zinc-50 p-8 h-fit">
              <h2 className="text-xl font-bold text-zinc-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600">Plan</span>
                  <span className="font-semibold text-zinc-900">{planName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600">Billing</span>
                  <span className="font-semibold text-zinc-900">Monthly</span>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-900 font-semibold">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-zinc-900">TZS {planPrice}</span>
                    <span className="text-zinc-500 text-sm block">/month</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-zinc-500 space-y-2">
                <p>✓ Cancel anytime</p>
                <p>✓ No setup fees</p>
                <p>✓ Secure payment</p>
              </div>
            </div>

            {/* Right: Payment Methods */}
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Choose Payment Method</h2>

              {/* Credit/Debit Card */}
              <button
                onClick={() => setSelectedMethod("card")}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all mb-4 ${
                  selectedMethod === "card"
                    ? "border-zinc-900 bg-zinc-50"
                    : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                  <CreditCard className="h-6 w-6 text-zinc-700" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-zinc-900">Credit/Debit Card</h3>
                  <p className="text-sm text-zinc-500">Visa, Mastercard, etc.</p>
                </div>
                {selectedMethod === "card" && (
                  <div className="h-6 w-6 rounded-full bg-zinc-900 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>

              {/* Bank Transfer */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-zinc-600" />
                  <span className="font-semibold text-zinc-900">Bank Transfer</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {banks.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => setSelectedMethod(bank.id as PaymentMethod)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        selectedMethod === bank.id
                          ? "border-zinc-900 bg-zinc-50"
                          : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <span className="text-2xl">{bank.logo}</span>
                      <span className="font-semibold text-zinc-900">{bank.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Money */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="h-5 w-5 text-zinc-600" />
                  <span className="font-semibold text-zinc-900">Mobile Money</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {mnos.map((mno) => (
                    <button
                      key={mno.id}
                      onClick={() => setSelectedMethod(mno.id as PaymentMethod)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        selectedMethod === mno.id
                          ? "border-zinc-900 bg-zinc-50"
                          : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <span className="text-2xl">{mno.logo}</span>
                      <span className="font-semibold text-zinc-900">{mno.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              {selectedMethod === "card" && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                      Card Number
                    </label>
                    <Input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="h-14 rounded-2xl border-zinc-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                      Cardholder Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="h-14 rounded-2xl border-zinc-200 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-700">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="h-14 rounded-2xl border-zinc-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-zinc-700">
                        CVV
                      </label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="h-14 rounded-2xl border-zinc-200 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(selectedMethod === "mpesa" || selectedMethod === "tigopesa" || 
                selectedMethod === "halopesa" || selectedMethod === "airtelmoney") && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-800">
                      You will receive a payment prompt on your phone. Please confirm the payment to complete your subscription.
                    </p>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                      Mobile Money Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="07XX XXX XXX"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="h-14 rounded-2xl border-zinc-200 bg-white"
                    />
                  </div>
                </div>
              )}

              {(selectedMethod === "crdb" || selectedMethod === "nmb") && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="p-4 bg-zinc-100 rounded-xl">
                    <p className="text-sm text-zinc-700 mb-2">
                      <strong>Bank Account Details:</strong>
                    </p>
                    <p className="text-sm text-zinc-600">
                      Account Name: Hweibo Ltd<br />
                      Account Number: 1234567890<br />
                      Bank: {selectedMethod === "crdb" ? "CRDB Bank" : "NMB Bank"}
                    </p>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-700">
                      Your Account Number (for verification)
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your account number"
                      className="h-14 rounded-2xl border-zinc-200 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Pay Button */}
              {selectedMethod && (
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="mt-6 h-14 w-full rounded-full bg-zinc-900 text-base font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      Pay TZS {planPrice}
                      <ChevronLeft className="ml-2 h-5 w-5 rotate-180" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
