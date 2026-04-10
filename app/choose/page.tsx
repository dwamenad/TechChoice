import type { Metadata } from "next";

import { DecisionWizard } from "@/components/choose/decision-wizard";
import type { ProductCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Choose | TechChoice"
};

export default async function ChoosePage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialCategory = (params.category as ProductCategory | undefined) ?? undefined;

  return <DecisionWizard initialCategory={initialCategory} />;
}
