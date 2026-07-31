import Link from "next/link";

/**
 * Custom 404. Defining this ourselves (instead of letting Next generate
 * /_not-found) keeps the page simple and avoids prerender surprises.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-xl font-semibold">Хуудас олдсонгүй</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Нүүр хуудас руу
      </Link>
    </main>
  );
}
