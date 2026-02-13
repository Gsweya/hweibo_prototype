import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Footer() {
  const help = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Support", href: "/contact" },
    { name: "Live Chat", href: "/chat" },
  ];

  const company = [
    { name: "About Hweibo", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press Kit", href: "/press" },
  ];

  const resources = [
    { name: "Marketplace Status", href: "/status" },
    { name: "API Docs", href: "/docs" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer id="help" className="border-t border-black/10 bg-white text-slate-950">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="text-xl font-semibold">Hweibo</p>
          <p className="text-sm text-slate-600">
            AI-powered product discovery for the modern marketplace. Find the
            right products faster, with the clarity of Hweibo insights.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button className="rounded-full bg-black text-white hover:bg-black/90">
              Get help
            </Button>
            <span className="text-xs text-slate-500">
              help@hweibo.com • 24/7 support
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Help
          </p>
          <ul className="space-y-2 text-sm">
            {help.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-black"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Company
          </p>
          <ul className="space-y-2 text-sm">
            {company.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-black"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Resources
          </p>
          <ul className="space-y-2 text-sm">
            {resources.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-black"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Hweibo. Powered by Hweibo AI.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-black">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black">
              Terms
            </Link>
            <Link href="/security" className="hover:text-black">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
