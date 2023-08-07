import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/database/db";

export async function criarCliente(req: NextRequest) {
  const { nome, celular } = await req.json();

  if (!nome || !celular)
    return NextResponse.json({ error: "Faltando Campos" }, { status: 400 });

  try {
    const novoCliente = await prisma.cliente.create({
      data: {
        nome: nome,
        celular: celular,
      },
    });
    return NextResponse.json(novoCliente, { status: 201 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "Erro ao criar cliente" }, { status: 500 });
  }
}

export async function getClientes(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const ordem: any = [];
  searchParams.getAll("ordem").forEach((item) => {
    item.split(",").forEach((item) => {
      ordem.push({
        [item.split(":")[0]]: item.split(":")[1],
      });
    });
  });

  try {
    const clientes = await prisma.$transaction([
      prisma.cliente.findMany({
        where: {
          nome: {
            contains: searchParams.get("nome") || "",
          },
          celular: {
            contains: searchParams.get("celular") || "",
          },
          id: {
            equals: searchParams.get("id")
              ? parseInt(searchParams.get("id") as string)
              : undefined,
          },
        },
        take: parseInt(searchParams.get("take") as string) || 10,
        skip: parseInt(searchParams.get("skip") as string) || undefined,
        orderBy: ordem.length > 0 ? ordem : { id: "desc" },
      }),
      prisma.cliente.count({
        where: {
          nome: {
            contains: searchParams.get("nome") || "",
          },
          celular: {
            contains: searchParams.get("celular") || "",
          },
          id: {
            equals: searchParams.get("id")
              ? parseInt(searchParams.get("id") as string)
              : undefined,
          },
        },
      }),
    ]);
    return NextResponse.json(
      { clientes: clientes[0], count: clientes[1] },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "Erro ao buscar clientes" }, { status: 500 });
  }
}

export async function deleteCliente(req: NextRequest, id: string) {
  try {
    const cliente = await prisma.cliente.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(cliente, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "Erro ao deletar cliente" }, { status: 500 });
  }
}
