import { createContext, Dispatch, SetStateAction } from "react";

export const ClientesContext = createContext<{
  setRefreshPage: Dispatch<SetStateAction<number>>;
  selection: number[];
  setSelection: Dispatch<SetStateAction<number[]>>;
  handleSelectionChange: (e: any, id: number) => void;
}>(null!);
