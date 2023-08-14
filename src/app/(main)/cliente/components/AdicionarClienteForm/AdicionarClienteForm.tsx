import { Form } from "@/lib/bootstrap";
import { useContext, useState } from "react";
import { ClientesContext } from "../../context/ClientesContext";

export default function AdicionarClienteForm() {
  const [values, setValues] = useState({ nome: "", celular: "" });
  const { setRefreshPage } = useContext(ClientesContext);

  const onChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (values.nome.length && values.celular.length) {
      const body = {
        ...values,
      };
      fetch("/api/cliente", {
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setValues({ nome: "", celular: "" });
            setRefreshPage((n: number) => n + 1);
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit} id="adicionarClienteForm">
      <Form.Group className="mb-3" controlId="formNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nome"
          value={values.nome}
          name={"nome"}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCelular">
        <Form.Label>Celular</Form.Label>
        <Form.Control
          type="text"
          placeholder="Celular"
          name="celular"
          value={values.celular}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
}
