import { cookies } from "next/headers";

// Força explicitamente a rota a ser dinâmica e nunca cacheada
export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_token");

  return Response.json({
    authenticated: !!token,
  });
}
