import { criarCliente, getClientes } from "@/lib/controllers/client";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await criarCliente(req);
}

export async function GET(req: NextRequest) {
  return await getClientes(req);
}
