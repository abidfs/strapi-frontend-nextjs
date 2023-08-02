import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    secret1: process.env.SECRET1,
    secret2: process.env.SECRET2,
    host: process.env.STRAPI_HOST,
  });
}
