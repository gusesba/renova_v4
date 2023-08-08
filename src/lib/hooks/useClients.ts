import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClientePaginacao } from "../types/clientes";

export default function useClients() {
  const [data, setData] = useState<ClientePaginacao>();
  const [refreshPage, setRefreshPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch(`/api/cliente?${searchParams}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [refreshPage, searchParams]);

  return { data, setData, isLoading, setLoading, setRefreshPage };
}
