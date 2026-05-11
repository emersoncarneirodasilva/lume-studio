import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("user_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true em produção, false em localhost
    path: "/",
    expires: new Date(0),
  });

  return response;
}
