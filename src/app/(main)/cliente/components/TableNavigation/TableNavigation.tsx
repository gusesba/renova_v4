import { LeftArrow, RightArrow } from "@/components/icones/icones";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import style from "./style.module.css";

export default function TableNavigation({ count }: { count: number }) {
  const searchParams = useSearchParams();

  const take = Number(searchParams.has("take") ? searchParams.get("take") : 10);
  const skip = Number(searchParams.has("skip") ? searchParams.get("skip") : 0);
  const paginaAtual = Math.ceil(skip / take) + 1;
  const totalPaginas = Math.ceil(count / take);

  //@ts-ignore
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set("skip", (skip + take).toString());
  const proximaPagina = `/cliente?${newSearchParams}`;
  newSearchParams.set("skip", (skip - take).toString());
  const paginaAnterior = `/cliente?${newSearchParams}`;

  return (
    <nav className={style.nav}>
      <span className={style.pagina}>
        Página:{" "}
        <span className={style.numeroPagina}>
          {paginaAtual} / {totalPaginas}
        </span>
      </span>
      <div className={style.container}>
        <Link
          href={paginaAtual !== 1 ? paginaAnterior : {}}
          className={style.buttonAnterior}
        >
          <LeftArrow />
        </Link>
        <span className={style.inputPagina}>{paginaAtual}</span>
        <Link
          href={paginaAtual !== totalPaginas ? proximaPagina : {}}
          className={style.buttonProximo}
        >
          <RightArrow />
        </Link>
      </div>
    </nav>
  );
}
