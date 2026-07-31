import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { isAllowedUser } from "@/lib/allowlist";
import { NoAccess } from "@/components/layout/no-access";

// The allowlist is read per request, so this shell must never be prerendered.
export const dynamic = "force-dynamic";

/**
 * Shared shell for every authenticated page. The route group `(app)` keeps
 * URLs clean (/dashboard, /today, ...) while sharing this layout.
 *
 * Auth is enforced in middleware.ts, so anything rendered here has a user.
 * This layout adds the second gate: if `ALLOWED_EMAILS` is set, only those
 * accounts get past it — everyone else sees a plain "no access" screen
 * instead of the app.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  if (!(await isAllowedUser())) return <NoAccess />;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      {/* pb-20 leaves room for the mobile bottom bar */}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <MobileNavigation />
    </div>
  );
}
