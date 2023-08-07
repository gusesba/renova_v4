import { deleteCliente } from "@/lib/controllers/client";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  params: { params: { id: string } }
) {
  return await deleteCliente(req, params.params.id);
}
