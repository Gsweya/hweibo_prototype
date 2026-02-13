import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-100 bg-white">
      <div className="mx-auto flex h-24 w-[min(92%,1100px)] flex-col items-center justify-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="text-sm text-zinc-400">© 2026 Hweibo AI. All rights reserved.</div>
        <div className="flex items-center gap-6 text-sm font-semibold text-zinc-500">
          <Link href="/privacy" className="transition hover:text-black">
            Privacy
          </Link>
          <Link href="/terms" className="transition hover:text-black">
            Terms
          </Link>
          <Link href="/contact" className="transition hover:text-black">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
