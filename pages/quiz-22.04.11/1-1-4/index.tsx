import { useState } from "react";

export default function PrevPage() {
  const [state, setState] = useState(0);

  const onClick = () => {
    setState((qwer) => qwer + 1);
  };

  return (
    <>
      <div>몇번 눌렀을까? : {state}</div>
      <button onClick={onClick}>확인해보자</button>
    </>
  );
}
