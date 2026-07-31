import {
  LayoutDashboard,
  CalendarDays,
  Sun,
  Sunrise,
  Repeat,
  Calendar,
  BarChart3,
  NotebookPen,
  GraduationCap,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  /** i18n key resolved at render time via useLanguage().t */
  labelKey: string;
  icon: LucideIcon;
}

/** Sidebar / mobile nav configuration, shared by every layout component. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { href: "/today", labelKey: "nav.today", icon: Sun },
  { href: "/tomorrow", labelKey: "nav.tomorrow", icon: Sunrise },
  { href: "/weekly-plan", labelKey: "nav.weeklyPlan", icon: CalendarDays },
  { href: "/habits", labelKey: "nav.habits", icon: Repeat },
  { href: "/calendar", labelKey: "nav.calendar", icon: Calendar },
  { href: "/statistics", labelKey: "nav.statistics", icon: BarChart3 },
  { href: "/daily-review", labelKey: "nav.dailyReview", icon: NotebookPen },
  { href: "/lessons", labelKey: "nav.lessons", icon: GraduationCap },
  { href: "/settings", labelKey: "nav.settings", icon: Settings },
];

/** Items surfaced in the compact mobile bottom bar. */
export const MOBILE_NAV_ITEMS: NavItem[] = [
  NAV_ITEMS[0], // Dashboard
  NAV_ITEMS[1], // Today
  NAV_ITEMS[2], // Tomorrow
  NAV_ITEMS[4], // Habits
];
