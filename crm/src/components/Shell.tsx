"use client";
import { usePathname } from "next/navigation";
import { Sidebar, MobileTabs } from "./Sidebar";
import { Topbar } from "./Topbar";

/** App chrome. Login and public proposal pages render bare. */
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const bare = pathname === "/login" || pathname.startsWith("/p/") || pathname.endsWith("/present");
  if (bare) return <>{children}</>;
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        <Topbar />
        <main className="flex-1 p-4 md:p-8 pb-28 md:pb-8 max-w-[1600px] w-full mx-auto">{children}</main>
      </div>
      <MobileTabs />
    </div>
  );
}
