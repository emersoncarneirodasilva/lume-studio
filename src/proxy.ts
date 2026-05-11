import { type NextRequest, NextResponse } from "next/server";

export const proxy = (request: NextRequest) => {
  const token = request.cookies.get("user_token")?.value;

  const protectedRoutes = [
    "/perfil",
    "/notificacoes",
    "/agendamento",
    "/agendamentos",
  ];
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "Você precisa estar logado.");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

// Configuração de matching
export const config = {
  matcher: [
    "/perfil/:path*",
    "/notificacoes/:path*",
    "/agendamento/:path*",
    "/agendamentos/:path*",
  ],
};
