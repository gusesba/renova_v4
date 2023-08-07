"use client";
import { FormCheck, Table } from "@/lib/bootstrap";
import { CLiente } from "@/lib/types/clientes";
import "./style.css";

export default function TabelaClientes({ clientes }: { clientes: CLiente[] }) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>
            <FormCheck />
          </th>
          <th>Id </th>

          <th>Nome </th>
          <th>Celular </th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente: any) => (
          <tr key={cliente.id}>
            <td>
              <FormCheck />
            </td>
            <td>{cliente.id}</td>
            <td>{cliente.nome}</td>
            <td>{cliente.celular}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
