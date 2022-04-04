import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

export default function QuizPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isChange, setIsChange] = useState(false);

  // 함수부분
  const onClickMove = () => {
    router.push("/");
  };

  const onClickChange = () => {
    setIsChange(true);
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (isChange === false) {
      alert("Rendered!");
    } else {
      alert("Changed!!");
    }
  }, [isChange]);

  useEffect(() => {
    return () => {
      alert("bye");
    };
  }, []);

  return (
    <div>
      <input type="password" ref={inputRef}></input>
      <button onClick={onClickChange}>변경</button>
      <button onClick={onClickMove}>이동</button>
    </div>
  );
}
