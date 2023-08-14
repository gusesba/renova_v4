"use client";
import { FormCheck, Table } from "@/lib/bootstrap";
import useSearch from "@/lib/hooks/useSearch";
import { CLiente } from "@/lib/types/clientes";
import "./style.css";

export default function TabelaClientes({ clientes }: { clientes: CLiente[] }) {
  const {
    search,
    handleSetSearch,
    showSearch,
    handleMouseLeave,
    handleMouseOver,
  } = useSearch();

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>
            <FormCheck />
          </th>
          <th
            id="id"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            Id{" "}
            {showSearch.id ? (
              <input
                autoComplete="off"
                id="id"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                value={search.id}
                onChange={handleSetSearch}
                name="id"
                ref={(input) => input?.focus()}
                className="searchInput"
              />
            ) : (
              ""
            )}
          </th>
          <th
            id="nome"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            Nome{" "}
            {showSearch.nome ? (
              <input
                autoComplete="off"
                id="nome"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                value={search.nome}
                onChange={handleSetSearch}
                name="nome"
                ref={(input) => input?.focus()}
                className="searchInput"
              />
            ) : (
              ""
            )}
          </th>
          <th
            id="celular"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            Celular{" "}
            {showSearch.celular ? (
              <input
                autoComplete="off"
                id="celular"
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                value={search.celular}
                onChange={handleSetSearch}
                name="celular"
                ref={(input) => input?.focus()}
                className="searchInput"
              />
            ) : (
              ""
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td>
              <FormCheck />
            </td>
            <td
              id="id"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              {cliente.id}
            </td>
            <td
              id="nome"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              {cliente.nome}
            </td>
            <td
              id="celular"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              {cliente.celular}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
