import type { Metadata } from "next";

import { ResultsDashboard } from "@/components/results/results-dashboard";
import { deserializeDecisionProfile } from "@/lib/utils/query-state";

export const metadata: Metadata = {
  title: "Results | TechChoice"
};

export default async function ResultsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const hasParams = Object.keys(params).length > 0;

  return (
    <ResultsDashboard initialProfile={hasParams ? deserializeDecisionProfile(params) : null} />
  );
}
