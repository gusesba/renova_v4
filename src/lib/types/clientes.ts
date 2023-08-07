export type CLiente = {
  id: number;
  celular: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ClientePaginacao = {
  clientes: CLiente[];
  count: number;
};
