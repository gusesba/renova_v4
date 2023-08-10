"use client";
import { Delete } from "@/components/icones/icones";
import "./style.css";

export default function BotoesMenu({
  adicionarCliente,
}: {
  adicionarCliente: () => void;
}) {
  return (
    <div className="buttonHolder">
      <button>C</button>
      <div className="buttonHolderInside">
        <button>
          <Delete />
        </button>
        <button onClick={adicionarCliente}>+</button>
      </div>
    </div>
  );
}
