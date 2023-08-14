"use client";
import { Delete } from "@/components/icones/icones";
import { useContext } from "react";
import { ClientesContext } from "../../context/ClientesContext";
import "./style.css";

export default function BotoesMenu({
  adicionarCliente,
}: {
  adicionarCliente: () => void;
}) {
  const { selection, setSelection, setRefreshPage } =
    useContext(ClientesContext);
  const handleDelete = () => {
    selection.forEach((id) => {
      fetch(`/api/cliente/${id}`, { method: "DELETE" }).then(() => {
        setRefreshPage((previous) => previous + 1);
        setSelection([]);
      });
    });
  };

  return (
    <div className="buttonHolder">
      <button>C</button>
      <div className="buttonHolderInside">
        <button onClick={handleDelete}>
          <Delete />
        </button>
        <button onClick={adicionarCliente}>+</button>
      </div>
    </div>
  );
}
