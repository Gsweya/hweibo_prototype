"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Wallet,
  Shield,
  Check,
  Loader2,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatPriceFull } from "@/lib/price-utils";

type CheckoutStatus = "idle" | "authorizing" | "processing" | "finalizing" | "done";

// Payment methods
const paymentMethods = [
  { id: "wallet", name: "Hweibo Wallet", icon: Wallet },
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("wallet");
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [receiptItems, setReceiptItems] = useState<typeof items>([]);
  const [receiptTotals, setReceiptTotals] = useState<{
    subtotal: number;
    shipping: number;
    tax: number;
    grandTotal: number;
  } | null>(null);

  // Calculate totals
  const subtotal = totalPrice;
  const shipping = items.length > 0 ? 15000 : 0;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + shipping + tax;

  const isProcessing = status !== "idle" && status !== "done";

  const handleCheckout = async () => {
    if (items.length === 0 || isProcessing) return;

    // Freeze current cart as the receipt, then clear cart on success.
    setReceiptItems(items.map((it) => ({ ...it })));
    setReceiptTotals({ subtotal, shipping, tax, grandTotal });

    const genId = () => {
      const rand = Math.random().toString(16).slice(2, 8).toUpperCase();
      const t = Date.now().toString(36).toUpperCase();
      return `HW-${t}-${rand}`;
    };

    setStatus("authorizing");
    await new Promise((resolve) => setTimeout(resolve, 850));
    setStatus("processing");
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("finalizing");
    await new Promise((resolve) => setTimeout(resolve, 900));

    setOrderId(genId());
    setStatus("done");
    clearCart();
  };

  if (status === "done") {
    return (
      <div className="min-h-screen bg-white text-zinc-900">
        <header className="border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/buyers" className="text-2xl font-medium font-sans text-black">
              hweibo
            </Link>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Shield className="w-4 h-4 text-zinc-700" />
              <span>Receipt</span>
            </div>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-12">
          <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm p-8">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 flex-shrink-0">
                <Check className="h-7 w-7 text-green-700" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">Order confirmed</h1>
                <p className="text-zinc-600 mt-1">
                  Payment received via{" "}
                  <span className="font-semibold text-zinc-900">
                    {selectedPayment === "wallet" ? "Hweibo Wallet" : "Card"}
                  </span>
                  .
                </p>
                <p className="text-sm text-zinc-500 mt-3">
                  Order ID: <span className="font-mono text-zinc-900">{orderId}</span>
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Total paid</p>
                <p className="text-xl font-extrabold text-zinc-900 mt-1">
                  {formatPriceFull(receiptTotals?.grandTotal ?? 0)}
                </p>
              </div>
              <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Status</p>
                <p className="text-base font-bold text-zinc-900 mt-1">Processing delivery</p>
                <p className="text-xs text-zinc-500 mt-1">You will receive an update shortly.</p>
              </div>
              <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Delivery</p>
                <p className="text-sm font-semibold text-zinc-900 mt-1">Alexander Hamilton</p>
                <p className="text-xs text-zinc-500 mt-1">Manhattan, New York</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-extrabold text-zinc-900 mb-3">Items</h2>
              <div className="space-y-3">
                {receiptItems.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-200 flex-shrink-0">
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-zinc-900 truncate">{it.name}</p>
                      <p className="text-xs text-zinc-500 truncate">
                        {it.store} · {it.location}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-zinc-900">{formatPriceFull(it.price * it.quantity)}</p>
                      <p className="text-xs text-zinc-500">Qty {it.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push("/buyers/browse")}
                className="h-12 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 font-semibold"
              >
                Continue shopping
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/buyers")}
                className="h-12 rounded-full border-zinc-200 text-zinc-900 font-semibold"
              >
                Back to search
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
            <Link
              href="/buyers/browse"
              className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Shopping</span>
            </Link>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mb-6">
            <Wallet className="w-10 h-10 text-zinc-400" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-zinc-500 mb-6">
            Start shopping to add items to your cart
          </p>
          <Link href="/buyers/browse">
            <Button className="rounded-full bg-black text-white px-8">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/buyers" className="text-2xl font-medium font-sans text-black">
            hweibo
          </Link>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Shield className="w-4 h-4 text-zinc-700" />
            <span>Secure Checkout</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-zinc-900">
                Shopping Cart ({items.length} items)
              </h1>
              <Link
                href="/buyers/browse"
                className="text-sm font-semibold text-zinc-600 hover:text-zinc-900"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-zinc-50 rounded-2xl"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-zinc-900">{item.name}</h3>
                        <p className="text-sm text-zinc-500">{item.store}</p>
                        <p className="text-sm text-zinc-400">{item.location}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {/* Price */}
                      <span className="font-bold text-lg">
                        {formatPriceFull(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="border-t border-zinc-200 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-zinc-900">
                  Delivery Address
                </h2>
                <Button variant="outline" size="sm" className="rounded-full">
                  Change
                </Button>
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-zinc-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-zinc-900">
                      Alexander Hamilton
                    </p>
                    <p className="text-sm text-zinc-500">
                      123 AI Innovation Lane
                      <br />
                      Manhattan, New York 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-50 text-zinc-900 rounded-3xl p-8 sticky top-24 border border-zinc-200">
              <h2 className="text-xl font-bold text-zinc-900 mb-6">
                Order Summary
              </h2>

              {/* Payment Method */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                  Payment Method
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedPayment === method.id
                          ? "border-black bg-white text-zinc-900"
                          : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-900"
                      }`}
                    >
                      <method.icon className="w-6 h-6 text-zinc-900" />
                      <span className="text-xs font-semibold text-center text-zinc-900">
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-semibold text-zinc-900">
                    {formatPriceFull(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="font-semibold text-zinc-900">
                    {formatPriceFull(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Tax (18%)</span>
                  <span className="font-semibold text-zinc-900">{formatPriceFull(tax)}</span>
                </div>
                <div className="border-t border-zinc-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-zinc-900">Grand Total</span>
                    <span className="font-bold text-xl text-zinc-900">
                      {formatPriceFull(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full h-14 rounded-full bg-black text-white font-bold text-lg hover:bg-zinc-800 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {status === "authorizing"
                      ? "Authorizing..."
                      : status === "processing"
                        ? "Processing payment..."
                        : "Confirming order..."}
                  </span>
                ) : (
                  <>Confirm Purchase</>
                )}
              </Button>

              <p className="text-center text-xs text-zinc-400 mt-4">
                Secured by Hweibo 256-bit encryption
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
