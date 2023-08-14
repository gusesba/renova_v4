import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function useSearch() {
  const showSearchDefault = {
    id: false,
    nome: false,
    celular: false,
  };
  const [showSearch, setShowSearch] = useState(showSearchDefault);
  const [search, setSearch] = useState({ id: "", nome: "", celular: "" });
  const [searchEvent, setSearchEvent] = useState("");
  const [submit, setSubmit] = useState(false);
  const searchRef = useRef(search);
  const path = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setShowSearch(showSearchDefault);

    if (searchEvent === "") {
      setSubmit(false);
      return;
    }

    const keydown = () => {
      setShowSearch((previous) => {
        return { ...previous, [searchEvent]: true };
      });
      document.removeEventListener("keydown", keydown);
      setSubmit(true);
    };

    document.addEventListener("keydown", keydown);

    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [searchEvent]);
  useEffect(() => {
    const keydown = (e: any) => {
      if (e.key !== "Enter") return;
      push(`${path}?${new URLSearchParams(searchRef.current)}`);
    };

    if (submit) {
      document.addEventListener("keydown", keydown);
    }

    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [submit, path, push]);

  useEffect(() => {
    const search = { id: "", nome: "", celular: "" };
    search.id = searchParams.get("id") || "";
    search.nome = searchParams.get("nome") || "";
    search.celular = searchParams.get("celular") || "";
    setSearch(search);
  }, [searchParams]);

  const handleSetSearch = (e: any) => {
    setSearch((previous) => {
      searchRef.current = { ...previous, [e.target.name]: e.target.value };
      return { ...previous, [e.target.name]: e.target.value };
    });
  };

  const handleMouseOver = (e: any) => {
    setSearchEvent(e.target.id);
  };

  const handleMouseLeave = () => {
    setSearchEvent("");
  };

  return {
    showSearch,
    handleMouseOver,
    handleMouseLeave,
    search,
    handleSetSearch,
  };
}
