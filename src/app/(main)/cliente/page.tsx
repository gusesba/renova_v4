"use client";
import useModal from "@/lib/hooks/useModal";
import { ClientePaginacao } from "@/lib/types/clientes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdicionarClienteModal from "./components/AdicionarClienteModal/AdicionarClienteModal";
import TabelaClientes from "./components/TabelaClientes/TabelaClientes";
import "./style.css";
export default function Page() {
  const modal = useModal();
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<ClientePaginacao>();

  useEffect(() => {
    fetch(`/api/cliente?${searchParams}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Nenhum cliente encontrado</p>;

  return (
    <main>
      <AdicionarClienteModal {...modal} />
      <TabelaClientes clientes={data.clientes} />
      <button onClick={modal.handleShow}>aaa</button>
    </main>
  );
}
