import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const cookieStore = await cookies();
  const token = cookieStore.get("user_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications/${id}/read`,
    {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
