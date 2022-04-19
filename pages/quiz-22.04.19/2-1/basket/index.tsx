// import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IBoard } from "../../../types";

const MyRow = styled.div`
  display: flex;
`;

const MyColumn = styled.div`
  width: 25%;
`;

export default function BasketPage() {
  const [basketItems, setBasketItems] = useState([]);

  // 프리렌더링 때문에 유즈이펙트를 사용하지 않으면 오류 발생
  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    setBasketItems(baskets);
  }, []);

  // 프리렌더링 관련 두번째 방법 -> 너무 많은 렌더링이 발생한다. -> 하지마라...
  // if(typeof window === "undefined") {
  //   const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
  //   setBasketItems(baskets);
  // }

  return (
    <div>
      {basketItems.map((el: IBoard) => (
        <MyRow key={el._id}>
          <MyColumn>{el.writer}</MyColumn>
          <MyColumn>{el.title}</MyColumn>
        </MyRow>
      ))}
    </div>
  );
}
