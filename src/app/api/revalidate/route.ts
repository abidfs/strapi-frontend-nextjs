import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("...............revalidate webhook", data.model, data.entry.id, data.entry.caseId);
  revalidateTag("case-list");
  // revalidateTag(`case-details-${data.entry.id}`);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
