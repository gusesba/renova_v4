import { useState } from "react";

export default function useSelection() {
  const [selection, setSelection] = useState<number[]>([]);

  const handleSelectionChange = (e: any, id: number) => {
    if (e.target.checked) setSelection((previous) => previous.concat([id]));
    else setSelection((previous) => previous.filter((_id) => _id !== id));
  };

  return { selection, setSelection, handleSelectionChange };
}
