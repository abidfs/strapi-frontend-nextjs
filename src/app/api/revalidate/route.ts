import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("revalidate webhook", data.model, data.entry.id, data.entry.caseId);
  try {
    // revalidateTag("case-list");
    // revalidateTag(`case-details-${data.entry.caseId.replace("/", "-")}`);
    // revalidatePath('/home')
    // revalidatePath('/home/[caseId]');
    revalidateTag("case");
    
    //Need to reload the pages here so that page is revalidated and ready for next client
    await fetch("http://localhost:3000/home");
    await fetch(`http://localhost:3000/home/${data.entry.caseId.replace("/", "-")}`);
  } catch (err) {
    console.log(err);
  }
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
