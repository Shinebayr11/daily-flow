import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

/**
 * Shared shell for every authenticated page. The route group `(app)` keeps
 * URLs clean (/dashboard, /today, ...) while sharing this layout.
 * Auth is enforced in middleware.ts, so anything rendered here has a user.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      {/* pb-20 leaves room for the mobile bottom bar */}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileNavigation />
    </div>
  );
}
