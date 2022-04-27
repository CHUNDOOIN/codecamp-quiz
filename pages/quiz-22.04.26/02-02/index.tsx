import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const Button = styled.button`
  width: 500px;
  height: 200px;

  color: red;
  font-weight: 900;
  font-size: 30px;
`;

export default function QuizPage() {
  const [imgTag, setImgTag] = useState<HTMLImageElement>();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src =
      "https://velog.velcdn.com/images/dooin/post/86587255-e68c-4753-95ce-05f63651a71b/image.jpg";
    img.onload = () => {
      setImgTag(img);
    };
  }, []);

  const onClickPreload = () => {
    if (imgTag) divRef.current?.appendChild(imgTag);
  };

  return (
    <div>
      <Button onClick={onClickPreload}>이미지 보여주기</Button>
      <div ref={divRef}></div>
    </div>
  );
}
