"use client";
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
        <button onClick={adicionarCliente}>+</button>
      </div>
    </div>
  );
}
