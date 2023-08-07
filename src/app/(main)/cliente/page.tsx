"use client";
import useModal from "@/lib/hooks/useModal";
import { ClientePaginacao } from "@/lib/types/clientes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdicionarClienteModal from "./components/AdicionarClienteModal/AdicionarClienteModal";
import TabelaClientes from "./components/TabelaClientes/TabelaClientes";
import { ClientesContext } from "./context/ClientesContext";
import "./style.css";

export default function Page() {
  const modal = useModal();
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<ClientePaginacao>();

  const fetchClients = () =>
    fetch(`/api/cliente?${searchParams}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });

  useEffect(() => {
    fetchClients();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Nenhum cliente encontrado</p>;

  return (
    <main>
      <ClientesContext.Provider value={fetchClients}>
        <AdicionarClienteModal {...modal} />
        <TabelaClientes clientes={data.clientes} />
      </ClientesContext.Provider>
      <button onClick={modal.handleShow}>aaa</button>
    </main>
  );
}
