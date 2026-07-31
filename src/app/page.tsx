import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { CalendarCheck, ListTodo, Repeat, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Landing page. Signed-in users are sent straight to the dashboard.
export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  const features = [
    { icon: ListTodo, title: "Plan tasks", text: "Weekly goals down to timed daily tasks." },
    { icon: CalendarCheck, title: "Prep tomorrow", text: "Pick your top 3 before you end the day." },
    { icon: Repeat, title: "Track habits", text: "Build streaks with a 7-day grid." },
    { icon: LineChart, title: "Review & measure", text: "Daily reviews and progress charts." },
  ];

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-4 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
        DailyFlow
      </span>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
        Plan your day, build your habits, review your progress.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        A clean, modern productivity dashboard to organize tasks, prepare
        tomorrow the night before, and keep your streaks alive.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/sign-up">Get started free</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>

      <div className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-5 text-left">
            <f.icon className="mb-3 h-6 w-6 text-primary" />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
