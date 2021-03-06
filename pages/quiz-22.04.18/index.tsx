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

  // ?????? ????????? ?????? ?????? async ????????????
  const onClickDelete = (boardId: string) => async () => {
    // ??????????????????
    await deleteBoard({
      variables: { boardId },

      // ?????? 1-1-9 : refetchQueries ?????? ??????
      //   refetchQueries: [
      //     {
      //       query: FETCH_BOARDS,
      //       variables: { paga: 1 },
      //     },
      //   ],

      // ?????? 1-1-10 : apollo-state ?????? ??????
      update(cache, { data }) {
        const deletedId = data.deleteBoard;
        cache.modify({
          fields: {
            fetchBoards: (prev, { readField }) => {
              // el._id ??? ????????????, readField?????? ????????????
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
    // ??????????????????
    await createBoard({
      variables: {
        createBoardInput: {
          writer,
          password,
          title,
          contents,
        },
      },

      // ?????? 1-1-5 : refetchQueries ?????? ??????
      //   refetchQueries: [
      //     {
      //       query: FETCH_BOARDS,
      //       variables: { paga: 1 },
      //     },
      //   ],

      // ?????? 1-1-6 : apollo-state ?????? ??????
      update(cache, { data }) {
        cache.modify({
          fields: {
            fetchBoards: (prev) => {
              return [data.createBoard, ...prev];
              // ??? 11?????? ?????? ???????????????
            },
          },
        });
      },
    });
  };

  return (
    <div>
      <Wrapper>
        <Col>?????????</Col>
        <Col>??????</Col>
        <Col>??????</Col>
        <Col>??????</Col>
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
        <Col>?????????</Col>
        <Col>????????????</Col>
        <Col>??????</Col>
        <Col>??????</Col>
        <Col>??????</Col>
      </Wrapper>
      <Wrapper>
        <Input onChange={onChangeWriter}></Input>
        <Input type="password" onChange={onChangePassword}></Input>
        <Input onChange={onChangeTitle}></Input>
        <InputCountents onChange={onChangeContents}></InputCountents>
        <button onClick={onClickSubmit}>????????????</button>
      </Wrapper>
    </div>
  );
}
