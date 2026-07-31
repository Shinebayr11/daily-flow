"use client";

import { Star } from "lucide-react";
import { useReview, useReviews } from "@/hooks/use-reviews";
import { todayISO, formatDate } from "@/lib/date";
import { useLanguage } from "@/lib/i18n";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer, SectionHeader } from "@/components/shared/page-container";
import { DailyReviewForm } from "@/components/statistics/daily-review-form";
import { ListSkeleton } from "@/components/shared/loading-skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function DailyReviewPage() {
  const { t } = useLanguage();
  const today = todayISO();
  const { review, isLoading, mutate } = useReview(today);
  const { reviews, mutate: mutateList } = useReviews();

  return (
    <>
      <DashboardHeader title={t("rev.title")} subtitle={t("rev.subtitle")} />
      <PageContainer>
        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <ListSkeleton rows={4} />
            ) : (
              // key forces a fresh form once the saved review has loaded
              <DailyReviewForm
                key={review?.id ?? "new"}
                date={today}
                initial={review}
                onSaved={() => {
                  void mutate();
                  void mutateList();
                }}
              />
            )}
          </CardContent>
        </Card>

        {reviews.length > 0 && (
          <div>
            <SectionHeader title={t("rev.past")} />
            <div className="mt-3 space-y-3">
              {reviews.map((r) => (
                <Card key={r.id}>
                  <CardContent className="flex items-start justify-between gap-4 p-4">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {formatDate(r.date, { weekday: "long", month: "short", day: "numeric" })}
                        <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                          {r.mood}
                        </span>
                      </p>
                      {r.goodThings && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {r.goodThings}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            i < r.rating
                              ? "h-4 w-4 fill-warning text-warning"
                              : "h-4 w-4 text-muted-foreground/30"
                          }
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </PageContainer>
    </>
  );
}
