"use client";
import useClients from "@/lib/hooks/useClients";
import useModal from "@/lib/hooks/useModal";
import AdicionarClienteModal from "./components/AdicionarClienteModal/AdicionarClienteModal";
import BotoesMenu from "./components/BotoesMenu/BotoesMenu";
import TabelaClientes from "./components/TabelaClientes/TabelaClientes";
import { ClientesContext } from "./context/ClientesContext";
import "./style.css";

export default function Page() {
  const modal = useModal();
  const { data, isLoading, setRefreshPage } = useClients();

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Nenhum cliente encontrado</p>;

  return (
    <>
      <main>
        <ClientesContext.Provider value={setRefreshPage}>
          <AdicionarClienteModal {...modal} />
          <TabelaClientes clientes={data.clientes} />
        </ClientesContext.Provider>
      </main>

      <BotoesMenu adicionarCliente={modal.handleShow} />
    </>
  );
}
