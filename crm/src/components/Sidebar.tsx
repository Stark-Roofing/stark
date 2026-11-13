"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { navForRole } from "@/lib/utils";

function isActive(pathname: string | null, href: string) {
  return pathname === href || (href !== "/" && !!pathname?.startsWith(href));
}

export function Sidebar() {
  const pathname = usePathname();
  const { data } = useSession();
  const user = data?.user as any;
  const nav = navForRole(user?.role);

  return (
    <aside className="hidden md:block fixed inset-y-0 left-0 z-40 w-64 bg-ink-900 border-r border-ink-600">
      <div className="p-5 border-b border-ink-600">
        <Link href="/" className="block">
          <div className="font-display text-3xl text-gold leading-none">STARK</div>
          <div className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-1">Roofing & Renovation</div>
        </Link>
      </div>

      <nav className="p-3 space-y-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(pathname, item.href) ? "bg-gold text-ink-900" : "text-gray-300 hover:bg-ink-700 hover:text-gold-200"
            }`}
          >
            <span className="text-lg leading-none w-5 text-center">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ink-600 text-xs">
        {user && (
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-gold font-semibold truncate">{user.name}</div>
              <div className="text-gray-500 capitalize">{String(user.role || "").toLowerCase()}</div>
            </div>
            <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-gray-400 hover:text-gold underline">
              Sign out
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

/** Bottom tab bar on phones: 4 main tabs + More sheet. */
export function MobileTabs() {
  const pathname = usePathname();
  const { data } = useSession();
  const user = data?.user as any;
  const nav = navForRole(user?.role);
  const main = nav.filter((n) => n.mobile).slice(0, 4);
  const more = nav.filter((n) => !main.includes(n));
  const [open, setOpen] = useState(false);
  const moreActive = more.some((m) => isActive(pathname, m.href));

  return (
    <>
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)}>
          <div
            className="absolute bottom-[72px] left-3 right-3 card p-2 grid grid-cols-3 gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {more.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex flex-col items-center justify-center gap-1 rounded-lg py-4 text-xs font-medium ${
                  isActive(pathname, item.href) ? "bg-gold text-ink-900" : "bg-ink-700 text-gray-200"
                }`}
              >
                <span className="text-xl leading-none">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex flex-col items-center justify-center gap-1 rounded-lg py-4 text-xs font-medium bg-ink-700 text-gray-400"
            >
              <span className="text-xl leading-none">⎋</span>
              Sign out
            </button>
          </div>
        </div>
      )}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-ink-900/95 backdrop-blur border-t border-ink-600 grid"
        style={{ gridTemplateColumns: `repeat(${main.length + 1}, minmax(0, 1fr))`, paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {main.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold ${active ? "text-gold" : "text-gray-400"}`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={() => setOpen(!open)}
          className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold ${moreActive || open ? "text-gold" : "text-gray-400"}`}
        >
          <span className="text-xl leading-none">☰</span>
          More
        </button>
      </nav>
    </>
  );
}
