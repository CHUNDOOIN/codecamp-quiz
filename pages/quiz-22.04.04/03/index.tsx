import { useRouter } from "next/router";
import { createRef, useState, useRef, useEffect } from "react";

export default function MyComponent() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>();

  //   componentDidMount() {
  //     console.log("컴포넌트가 마운트됐습니다~");
  //     this.inputRef.current?.focus();
  //   }

  //   componentWillUnmount() {
  //     alert("컴포넌트가 제거됩니다~");
  //   }

  useEffect(() => {
    console.log("컴포넌트가 마운트됐습니다~");
    inputRef.current?.focus();

    return () => {
      console.log("컴포넌트 사라짐!!!!!");
    };
  }, []);

  //   componentDidUpdate() {
  //     console.log("컴포넌트가 변경됐습니다~");
  //   }

  useEffect(() => {
    console.log("컴포넌트가 변경됐습니다~");
  }, [count]);

  //   onClickButton = () => {
  //     this.setState((prev: { count: number }) => ({ count: prev.count + 1 }));
  //   };
  const onClickCounter = () => {
    setCount((prev) => prev + 1);
  };

  // 	onClickMove = () => {
  // 		router.push("/")
  // 	}

  const onClickMove = () => {
    router.push("/");
  };

  console.log("마운트 시작");

  return (
    <>
      <input type="password" ref={inputRef} />
      <div>카운트: {count}</div>
      <button onClick={onClickCounter}>카운트(+1)</button>
      <button onClick={onClickMove}>이동하기</button>
    </>
  );
}
