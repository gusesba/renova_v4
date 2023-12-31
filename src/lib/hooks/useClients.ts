import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClientePaginacao } from "../types/clientes";

export default function useClients() {
  const [data, setData] = useState<ClientePaginacao>();
  const [refreshPage, setRefreshPage] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    fetch(`/api/cliente?${searchParams}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      controller.abort();
    };
  }, [refreshPage, searchParams]);

  return { data, setData, isLoading, setLoading, setRefreshPage };
}
