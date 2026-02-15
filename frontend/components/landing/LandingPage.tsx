"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

// Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.617A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.617m-16.5 0V13.5C1.5 10.302 3.802 8.25 6.75 8.25h.75c2.948 0 5.25 2.052 5.25 5.25v2.25" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function PaperAirplaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function CurrencyDollarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function ChatBubbleLeftRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.18.063-2.354.193-3.503.389-1.18.21-2.015.98-2.031 2.094v4.286c0 1.136.847 2.1 1.98 2.193.34.027.68.052 1.02.072v3.091l3-3c1.354 0 2.694-.055 4.02-.163a2.115 2.115 0 01.825.242M4.5 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.18.063-2.354.193-3.503.389-1.18.21-2.015.98-2.031 2.094v4.286c0 1.136.847 2.1 1.98 2.193.34.027.68.052 1.02.072v3.091l3-3c1.354 0 2.694-.055 4.02-.163a2.115 2.115 0 01.825.242" />
    </svg>
  );
}

// Products data - only 5
const products = [
  {
    image: "/product_images/shoes/nike-airmax-90.webp",
    title: "Nike Air Max 90",
    price: "450k",
    store: "Sport World",
    location: "Dar es Salaam",
    description: "Classic Nike Air Max 90 with premium cushioning. Perfect for daily wear and running with breathable mesh upper.",
  },
  {
    image: "/product_images/shoes/puma-sport.jpg",
    title: "Puma Sport Runner",
    price: "320k",
    store: "Athletic Store",
    location: "Arusha",
    description: "Lightweight Puma running shoes with breathable mesh upper and responsive foam cushioning.",
  },
  {
    image: "/product_images/shoes/new-balance-wake-up.webp",
    title: "New Balance Fresh Foam",
    price: "520k",
    store: "Premium Shoes",
    location: "Dodoma",
    description: "New Balance Fresh Foam technology for ultimate comfort and support during long runs and daily activities.",
  },
  {
    image: "/product_images/shoes/galaxy-5-trainers-with-laces.jpg",
    title: "Adidas Galaxy 5",
    price: "280k",
    store: "Sport Center",
    location: "Mwanza",
    description: "Adidas Galaxy 5 trainers with Cloudfoam midsole for step-in comfort and all-day wear.",
  },
  {
    image: "/product_images/shoes/Nike-Air-Max-Plus.webp",
    title: "Nike Air Max Plus",
    price: "680k",
    store: "Nike Store TZ",
    location: "Dar es Salaam",
    description: "Iconic Air Max Plus with Tuned Air technology and bold gradient design. Premium comfort.",
  },
];

// Animated AI Search Section
function AnimatedSearchSection() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const searchPrompts = [
    "Show me running shoes under 500k...",
    "Find me sneakers from Nike or Adidas...",
    "Looking for casual wear for developers...",
    "Premium sport shoes with good reviews...",
  ];

  useEffect(() => {
    if (isPaused || showResults) return;

    const typeSpeed = isDeleting ? 40 : 90;
    const currentFullPrompt = searchPrompts[promptIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentPrompt !== currentFullPrompt) {
        setCurrentPrompt(currentFullPrompt.slice(0, currentPrompt.length + 1));
      } else if (!isDeleting && currentPrompt === currentFullPrompt) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setSearchStep(1);
          setTimeout(() => setSearchStep(2), 1000);
          setTimeout(() => setSearchStep(3), 2000);
          setTimeout(() => {
            setShowResults(true);
          }, 3000);
        }, 800);
      } else if (isDeleting && currentPrompt !== "") {
        setCurrentPrompt(currentPrompt.slice(0, -1));
      } else if (isDeleting && currentPrompt === "") {
        setIsDeleting(false);
        setPromptIndex((prev) => (prev + 1) % searchPrompts.length);
        setShowResults(false);
        setSearchStep(0);
        setExpandedIndex(null);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentPrompt, isDeleting, isPaused, promptIndex, showResults]);

  useEffect(() => {
    if (showResults) {
      const timeout = setTimeout(() => {
        setShowResults(false);
        setSearchStep(0);
        setIsDeleting(true);
        setExpandedIndex(null);
      }, 30000);
      return () => clearTimeout(timeout);
    }
  }, [showResults]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Bar - Compact with send icon */}
      <div className="relative bg-white rounded-full border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center px-4 sm:px-5 py-3 sm:py-3.5">
          <SearchIcon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 mr-3" />
          <div className="flex-1 text-left min-w-0 overflow-hidden">
            {!showResults ? (
              <span className="text-zinc-900 text-sm sm:text-base whitespace-nowrap">
                {currentPrompt}
                <span 
                  className="inline-block w-[2px] h-5 sm:h-6 bg-zinc-900 ml-0.5 align-middle"
                  style={{ animation: 'cursor-blink 0.8s ease-in-out infinite' }}
                />
              </span>
            ) : (
              <span className="text-zinc-900 text-sm sm:text-base">{currentPrompt}</span>
            )}
          </div>
          <button className="p-1.5 sm:p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors ml-2">
            <PaperAirplaneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-700" />
          </button>
        </div>
      </div>

      {/* Search Progress */}
      {searchStep > 0 && !showResults && (
        <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-zinc-900 rounded-full animate-pulse" />
            {searchStep === 1 && (
              <>
                <span>Searching market</span>
                <span className="flex gap-0.5">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                </span>
              </>
            )}
            {searchStep === 2 && (
              <>
                <span>Finding best prices</span>
                <span className="flex gap-0.5">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                </span>
              </>
            )}
            {searchStep === 3 && (
              <>
                <span>Combining results</span>
                <span className="flex gap-0.5">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* AI Results - 5 horizontal cards */}
      {showResults && (
        <div className="mt-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-6 text-xs sm:text-sm text-zinc-500">
            <SparklesIcon className="w-4 h-4 text-zinc-900" />
            <span>Found 5 matching products from 12 sellers</span>
          </div>
          
          <div className="space-y-3">
            {products.map((product, idx) => (
              <div 
                key={idx}
                className={`bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  expandedIndex === idx ? 'border-zinc-900 shadow-xl' : 'border-zinc-200 hover:border-zinc-400'
                }`}
                onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
              >
                {expandedIndex !== idx ? (
                  // Collapsed - Horizontal card
                  <div className="flex items-center p-3 sm:p-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 ml-4 min-w-0">
                      <h3 className="font-bold text-zinc-900 text-base sm:text-lg truncate">{product.title}</h3>
                      <p className="text-zinc-500 text-sm mt-0.5 truncate">{product.store}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="bg-zinc-900 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                        {product.price}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Expanded - Full details
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start gap-4">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-zinc-900 text-xl">{product.title}</h3>
                          <button 
                            className="p-1 hover:bg-zinc-100 rounded-full transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedIndex(null);
                            }}
                          >
                            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-zinc-600 text-sm mt-2">{product.description}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-zinc-100">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                          <span className="flex items-center gap-1.5">
                            <StoreIcon className="w-4 h-4" />
                            {product.store}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <LocationIcon className="w-4 h-4 text-red-500" />
                            {product.location}
                          </span>
                        </div>
                        <span className="bg-zinc-900 text-white text-lg font-bold px-4 py-2 rounded-full">
                          TZS {product.price}
                          </span>
                      </div>
                    </div>

                    <button className="mt-4 w-full bg-zinc-900 text-white font-semibold py-3 rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                      View Full Details
                      <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

function HeaderLink({ href, children, variant = "default" }: { href: string; children: ReactNode; variant?: "default" | "button" }) {
  if (variant === "button") {
    return (
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-all"
      >
        {children}
      </Link>
    );
  }
  
  return (
    <Link
      href={href}
      className="group relative inline-block text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
    >
      <span>{children}</span>
      <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-zinc-900 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-block text-zinc-400 transition-colors hover:text-white"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroScale = Math.max(0.9, 1 - scrollY * 0.0003);
  const heroOpacity = Math.max(0.3, 1 - scrollY * 0.001);

  return (
    <div className="bg-white text-zinc-900">
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header with Auth Buttons */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="mx-auto w-[min(92%,1200px)] px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-zinc-900">
              Hweibo
            </Link>
            <div className="flex items-center gap-6">
              <HeaderLink href="/auth/register">Sign Up</HeaderLink>
              <HeaderLink href="/auth/login" variant="button">Log in</HeaderLink>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-16">
        <div 
          className="relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center" 
          style={{ transform: `scale(${heroScale})`, opacity: heroOpacity, transition: "transform 0.1s ease-out, opacity 0.1s ease-out" }}
        >
          <div className="mx-auto w-[min(92%,900px)] text-center px-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight cursor-pointer select-none text-zinc-900">
              Hweibo
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-600">
              AI-powered shopping. Describe what you need, find what you want.
            </p>
            
            {/* Animated Search Section */}
            <div className="mt-10">
              <AnimatedSearchSection />
            </div>
          </div>
        </div>
      </section>

      {/* What Hweibo Does Section */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200">
        <div className="mx-auto w-[min(92%,1100px)] px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">
              Hweibo Finds the Best Deals For You
            </h2>
            <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
              Stop comparing prices across dozens of websites. Our AI does the work for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-zinc-200">
              <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-5">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Natural Language Search</h3>
              <p className="text-zinc-600 leading-relaxed">
                Describe exactly what you need in plain English. "I want running shoes under 500k" and Hweibo understands.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-zinc-200">
              <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-5">
                <CurrencyDollarIcon className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Price Comparison Across Sellers</h3>
              <p className="text-zinc-600 leading-relaxed">
                We check prices from verified local stores in Dar es Salaam, Arusha, Dodoma, and Mwanza.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-zinc-200">
              <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-5">
                <ShieldCheckIcon className="w-6 h-6 text-zinc-900" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Verified Local Sellers</h3>
              <p className="text-zinc-600 leading-relaxed">
                Every seller is verified and rated. Shop with confidence from trusted local businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-zinc-950">
        <div className="mx-auto w-full max-w-7xl px-8 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-medium font-sans text-white">hweibo</h3>
              <p className="mt-2 text-sm text-zinc-500">AI-powered shopping for everyone.</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Product</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><FooterLink href="/products">Products</FooterLink></li>
                <li><FooterLink href="/categories">Categories</FooterLink></li>
                <li><FooterLink href="/deals">Deals</FooterLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Company</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><FooterLink href="/about">About</FooterLink></li>
                <li><FooterLink href="/careers">Careers</FooterLink></li>
                <li><FooterLink href="/contact">Contact</FooterLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><FooterLink href="/privacy">Privacy</FooterLink></li>
                <li><FooterLink href="/terms">Terms</FooterLink></li>
                <li><FooterLink href="/cookies">Cookies</FooterLink></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-zinc-800 pt-8">
            <p className="text-center text-sm text-zinc-600">© 2025 Hweibo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
