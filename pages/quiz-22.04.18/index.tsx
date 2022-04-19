import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { IQuery, IQueryFetchBoardsArgs } from "../types";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  text-align: center;
`;

const Col = styled.div`
  width: 150px;
  height: 75px;
`;

const Input = styled.input`
  width: 150px;
  height: 75px;
`;

const InputCountents = styled.textarea`
  width: 150px;
  height: 75px;
`;

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

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function ApolloCacheStatePage() {
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const { data, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      // setWriterError("");
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      // setPasswordError("");
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      // setTitleError("");
    }
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    if (event.target.value !== "") {
      // setContentsError("");
    }
  };

  // 가장 가까운 괄호 앞에 async 붙여주기
  const onClickDelete = (boardId: string) => async () => {
    // 삭제하기로직
    await deleteBoard({
      variables: { boardId },

      // 퀴즈 1-1-9 : refetchQueries 사용 부분
      //   refetchQueries: [
      //     {
      //       query: FETCH_BOARDS,
      //       variables: { paga: 1 },
      //     },
      //   ],

      // 퀴즈 1-1-10 : apollo-state 사용 부분
      update(cache, { data }) {
        const deletedId = data.deleteBoard;
        cache.modify({
          fields: {
            fetchBoards: (prev, { readField }) => {
              // el._id 가 안되므로, readField에서 꺼내오기
              const filteredPrev = prev.filter(
                (el) => readField("_id", el) !== deletedId
              );
              return [...filteredPrev];
            },
          },
        });
      },
    });
  };

  const onClickSubmit = async () => {
    // 등록하기로직
    await createBoard({
      variables: {
        createBoardInput: {
          writer,
          password,
          title,
          contents,
        },
      },

      // 퀴즈 1-1-5 : refetchQueries 사용 부분
      //   refetchQueries: [
      //     {
      //       query: FETCH_BOARDS,
      //       variables: { paga: 1 },
      //     },
      //   ],

      // 퀴즈 1-1-6 : apollo-state 사용 부분
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev];
              // 총 11개의 글이 만들어진다
            },
          },
        });
      },
    });
  };

  return (
    <div>
      <Wrapper>
        <Col>작성자</Col>
        <Col>제목</Col>
        <Col>내용</Col>
        <Col>비고</Col>
      </Wrapper>
      {data?.fetchBoards.map((el) => (
        <Wrapper key={el._id}>
          <Col>{el.writer}</Col>
          <Col>{el.title}</Col>
          <Col>{el.contents}</Col>
          <button onClick={onClickDelete(el._id)}>{"X"}</button>
        </Wrapper>
      ))}
      <br></br>

      <Wrapper>
        <Col>작성자</Col>
        <Col>비밀번호</Col>
        <Col>제목</Col>
        <Col>내용</Col>
        <Col>버튼</Col>
      </Wrapper>
      <Wrapper>
        <Input onChange={onChangeWriter}></Input>
        <Input type="password" onChange={onChangePassword}></Input>
        <Input onChange={onChangeTitle}></Input>
        <InputCountents onChange={onChangeContents}></InputCountents>
        <button onClick={onClickSubmit}>등록하기</button>
      </Wrapper>
    </div>
  );
}
