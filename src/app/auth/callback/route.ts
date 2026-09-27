import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { search, origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/admin/auth/callback${search}`);
}
