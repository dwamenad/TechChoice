import { NextResponse } from "next/server";

import { runRecommendation } from "@/lib/recommendation-engine";
import type { DecisionProfile } from "@/lib/types";

export async function POST(request: Request) {
  const profile = (await request.json()) as DecisionProfile;
  const result = runRecommendation(profile);
  return NextResponse.json(result);
}
