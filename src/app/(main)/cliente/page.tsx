"use client";
import useClients from "@/lib/hooks/useClients";
import useModal from "@/lib/hooks/useModal";
import AdicionarClienteModal from "./components/AdicionarClienteModal/AdicionarClienteModal";
import BotoesMenu from "./components/BotoesMenu/BotoesMenu";
import TabelaClientes from "./components/TabelaClientes/TabelaClientes";
import TableNavigation from "./components/TableNavigation/TableNavigation";
import { ClientesContext } from "./context/ClientesContext";
import "./style.css";

export default function Page() {
  const modal = useModal();
  const { data, isLoading, setRefreshPage } = useClients();

  return (
    <>
      <main>
        <ClientesContext.Provider value={setRefreshPage}>
          <AdicionarClienteModal {...modal} />
          {isLoading ? (
            <p>Loading...</p>
          ) : !data ? (
            <p>Nenhum cliente encontrado</p>
          ) : (
            <>
              <TabelaClientes clientes={data.clientes} />
              <TableNavigation count={data.count} />
            </>
          )}
        </ClientesContext.Provider>
      </main>

      <BotoesMenu adicionarCliente={modal.handleShow} />
    </>
  );
}
