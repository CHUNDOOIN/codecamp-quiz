import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { IBoard } from "../../../types";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MyRow = styled.div`
  display: flex;
`;

const MyColumn = styled.div`
  width: 25%;
`;

export default function BasketPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [basketItems, setBasketItems] = useState([]);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayDate = `${yyyy}-${mm}-${dd}`;

  const onclickBasket = (el) => () => {
    console.log(el);

    // 1. 기존 장바구니 가져오기
    const baskets = JSON.parse(localStorage.getItem(String(todayDate)) || "[]");

    // 2. 이미 담겼는지 확인하기
    const temp = baskets.filter((basketEl) => basketEl._id === el._id);
    if (temp.length === 1) {
      alert("이미 담으신 물품입니다!!!");
      return;
    }

    // 장바구니 삭제 부분
    // const newBaskets = baskets.filter((basketEl) => basketEl._id !== el._id);

    // 3. 장바구니에 담기
    const { __typename, ...newEl } = el;
    baskets.push(newEl);
    localStorage.setItem(String(todayDate), JSON.stringify(baskets));

    setBasketItems(baskets);
  };

  useEffect(() => {
    const baskets = JSON.parse(localStorage.getItem(String(todayDate)) || "[]");
    setBasketItems(baskets);
    console.log("여긴어디?", baskets);
  }, []);

  return (
    <Wrapper>
      <div>
        {data?.fetchBoards.map((el: IBoard) => (
          <MyRow key={el._id}>
            <MyColumn>{el.writer}</MyColumn>
            <MyColumn>{el.title}</MyColumn>
            <button onClick={onclickBasket(el)}>장바구니담기</button>
          </MyRow>
        ))}
      </div>

      <div>
        {basketItems.map((el: IBoard) => (
          <MyRow key={el._id}>
            <MyColumn>{el.writer}</MyColumn>
            <MyColumn>{el.title}</MyColumn>
          </MyRow>
        ))}
      </div>
    </Wrapper>
  );
}
