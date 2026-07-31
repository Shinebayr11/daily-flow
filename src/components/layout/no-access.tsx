import { Lock } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

/**
 * Shown to a signed-in user who is not on `ALLOWED_EMAILS`.
 *
 * Deliberately says nothing about who *is* allowed — no email addresses, no
 * hint that a particular account exists.
 */
export function NoAccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Lock className="h-5 w-5 text-muted-foreground" />
        </div>

        <h1 className="text-lg font-semibold">Хандах эрх байхгүй</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Энэ апп хувийн хэрэглээнд зориулагдсан. Таны бүртгэлд хандах
          зөвшөөрөл олгогдоогүй байна.
        </p>

        <SignOutButton>
          <Button variant="outline" className="mt-6 w-full">
            Гарах
          </Button>
        </SignOutButton>
      </div>
    </main>
  );
}
