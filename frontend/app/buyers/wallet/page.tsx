"use client";

import { useState } from "react";
import { formatPriceFull } from "@/lib/price-utils";

export default function BuyerWalletPage() {
  const [balance, setBalance] = useState(2_500_000);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleTopUp = () => {
    const amount = parseInt(topUpAmount.replace(/[^0-9]/g, ""));
    if (amount > 0) {
      setBalance(prev => prev + amount);
      setTopUpAmount("");
      setIsAdding(false);
    }
  };

  const quickAmounts = [100000, 500000, 1000000];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-extrabold text-zinc-900">Wallet</h1>
        <p className="text-zinc-500 mt-2">Manage your balance and top up</p>

        <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Available Balance</p>
          <p className="text-5xl font-extrabold text-zinc-900 mt-2">{formatPriceFull(balance)}</p>
          
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-zinc-800 transition-colors"
            >
              Top Up Wallet
            </button>
          ) : (
            <div className="mt-6 space-y-4">
              <p className="text-sm font-medium text-zinc-700">Enter amount to add:</p>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-zinc-600">UGX</span>
                <input
                  type="text"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  placeholder="0"
                  className="flex-1 max-w-xs px-4 py-3 text-2xl font-bold text-zinc-900 bg-white border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  autoFocus
                />
              </div>
              
              <div className="flex gap-2">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTopUpAmount(amount.toString())}
                    className="px-4 py-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:border-zinc-400 hover:text-black transition-colors"
                  >
                    +{formatPriceFull(amount)}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleTopUp}
                  className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  Add Funds
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setTopUpAmount("");
                  }}
                  className="px-6 py-2 text-zinc-600 font-medium hover:text-black transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-zinc-900">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <div>
                <p className="font-semibold text-zinc-900">Wallet Top Up</p>
                <p className="text-sm text-zinc-500">Added to your balance</p>
              </div>
              <span className="text-green-600 font-bold">+{formatPriceFull(1000000)}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <div>
                <p className="font-semibold text-zinc-900">Purchase</p>
                <p className="text-sm text-zinc-500">Order #12345</p>
              </div>
              <span className="text-red-500 font-bold">-{formatPriceFull(450000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
