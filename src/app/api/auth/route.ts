import { authenticate, setUserCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { usuario, senha } = await request.json();

  if (await authenticate(usuario, senha)) {
    return await setUserCookie(new NextResponse(null, { status: 200 }));
  }

  return NextResponse.json(
    { error: "Usuário ou senha inválidos" },
    { status: 401 }
  );
}
