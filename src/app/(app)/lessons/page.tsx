"use client";

import { useLanguage } from "@/lib/i18n";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PageContainer } from "@/components/shared/page-container";
import { CourseView } from "@/components/course/course-view";

export default function LessonsPage() {
  const { t } = useLanguage();
  return (
    <>
      <DashboardHeader title={t("course.title")} subtitle={t("course.subtitle")} />
      <PageContainer>
        <CourseView />
      </PageContainer>
    </>
  );
}
