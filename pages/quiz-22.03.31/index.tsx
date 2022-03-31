import styled from "@emotion/styled";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

const Wrap = styled.div`
  font-size: 10px;
  /* background-color: gray; */
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Col = styled.div`
  width: 25%;
  height: 50px;
  margin: 10px 0px;
  text-align: center;
`;

const MoveButton = styled.button`
  width: 300px;
  height: calc(100% / 11);
  font-size: 30px;
  cursor: pointer;
`;

const NumberDiv = styled.div`
  /* width: 300px;
  margin: 20px 0px; */
  cursor: pointer;
`;

const WrapDown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
`;

export default function Boards() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [nowPage, setNowPage] = useState("");
  const [nowBoardNum, setNowBoardNum] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: data2 } = useQuery(FETCH_BOARDS_COUNT);
  const lastPage = Math.ceil(data2?.fetchBoardsCount / 10);
  console.log(`마지막페이지는 ${lastPage} 페이지`);
  // 1735 -> 173.5 -> 174 순으로 변환

  // 콘솔 확인
  console.log(data);
  console.log(data2);

  const onClickPage = (e: any) => {
    refetch({ page: Number(e.target.id) });
    setNowBoardNum(Number(e.target.id - 1) * 10);
    setNowPage(e.target.id);
  };

  const onClickPrevMove = () => {
    if (startPage === 1) {
      setIsDisabled(true);
      return;
    }
    setStartPage((prev) => prev - 10);
  };

  const onClickNextMove = () => {
    if (startPage + 10 > lastPage) {
      setIsDisabled(true);
      return;
    }
    setStartPage((prev) => prev + 10);
  };

  return (
    <Wrap>
      {data?.fetchBoards.map((el, index) => (
        <Row key={el._id}>
          <Row></Row>
          <Col>{data2?.fetchBoardsCount - index - nowBoardNum}</Col>
          <Col>{el.writer}</Col>
          <Col>{el.title}</Col>
          <Col>{el.contents}</Col>
        </Row>
      ))}
      <WrapDown>
        <MoveButton
          disabled={startPage === 1 ? true : false}
          onClick={onClickPrevMove}
        >
          {" "}
          &lt; 이전페이지{" "}
        </MoveButton>
        {new Array(10).fill(1).map(
          (_, index) =>
            index + startPage <= lastPage && (
              <NumberDiv
                style={
                  nowPage === String(index + startPage)
                    ? { color: "red" }
                    : { color: "black" }
                }
                key={index + startPage}
                onClick={onClickPage}
                id={String(index + startPage)}
              >
                {" "}
                {index + startPage}{" "}
              </NumberDiv>
            )
        )}

        <MoveButton
          disabled={startPage + 10 > lastPage ? true : false}
          onClick={onClickNextMove}
        >
          {" "}
          다음 페이지 &gt;{" "}
        </MoveButton>
      </WrapDown>
    </Wrap>
  );
}
