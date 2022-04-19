import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IBoard } from "../../../types";

const MyRow = styled.div`
  display: flex;
`;

const MyColumn = styled.div`
  width: 25%;
`;

const MyButton = styled.button`
  width: 200px;
  height: 50px;
`;

interface IBasketItemPageProps {
  el: IBoard;
  data: any;
}

function BasketItemPage(props: IBasketItemPageProps) {
  const [isBasket, setIsBasket] = useState(false);

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    const a = baskets.map((el) => el._id);

    if (a.includes(props.el._id)) {
      setIsBasket(true);
    }
  }, []);

  // 담기
  const onclickBasket = (el) => () => {
    // 1. 기존 장바구니 가져오기
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");
    // console.log("1번 확인", baskets);

    // 2. 이미 담겼는지 확인하기
    const temp = baskets.filter((basketEl) => basketEl._id === el._id);
    if (temp.length === 1) {
      alert("이미 담으신 물품입니다!!!");
      return;
    }

    // 3. 장바구니에 담기
    const { __typename, ...newEl } = el;
    baskets.push(newEl);

    localStorage.setItem("baskets", JSON.stringify(baskets));

    setIsBasket(true);
  };

  // =================================================================

  // 담기 취소
  const onclickDelete = (el) => () => {
    const baskets = JSON.parse(localStorage.getItem("baskets") || "[]");

    const newBaskets = baskets.filter((basketEl) => basketEl._id !== el._id);
    localStorage.setItem("baskets", JSON.stringify(newBaskets));
    setIsBasket((prev) => !prev);
  };

  return (
    <div>
      <MyRow key={props.el._id}>
        <MyColumn>{props.el.writer}</MyColumn>
        <MyColumn>{props.el.title}</MyColumn>
        <MyButton
          onClick={isBasket ? onclickDelete(props.el) : onclickBasket(props.el)}
        >
          {isBasket ? "담기취소" : "게시물 담기"}
        </MyButton>
      </MyRow>
    </div>
  );
}

export default BasketItemPage;
