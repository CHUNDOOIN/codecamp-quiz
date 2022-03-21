import { useState } from "react";
import { useRouter } from "next/router";
import { CREATE_BOARD } from "./DynamicRoutingBoard.queries";
import { useMutation, gql } from "@apollo/client";
import BoardWriteUI from "./DynamicRoutingBoard.presenter";

export default function BoardWrite() {
  const router = useRouter();

  const [myWriter, setMyWriter] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [myContents, setMyContents] = useState("");

  const [createBoard] = useMutation(CREATE_BOARD);

  const callGraphqlApi = async () => {
    // const result = await axios.get("https://koreanjson.com/posts/1") // rest-api 방식!!
    // const result = await axios.get("https://koreanjson.com/users/1")
    // const result = await axios.get("https://koreanjson.com/products/1")

    try {
      const result = await createBoard({
        variables: { writer: myWriter, title: myTitle, contents: myContents },
      }); // graphql-api 방식
      console.log(result);
      console.log(result.data.createBoard.message);
      alert("게시글 등록에 성공했어요!");
      alert("상세 페이지로 이동해 볼까요?!");
      router.push(
        `/quiz-22.03.21/05-08-dynamic-routed-input/${result.data.createBoard.number}`
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const onChangeWriter = (event) => {
    setMyWriter(event.target.value);
  };

  const onChangeTitle = (event) => {
    setMyTitle(event.target.value);
  };

  const onChangeContents = (event) => {
    setMyContents(event.target.value);
  };

  return (
    <BoardWriteUI
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      callGraphqlApi={callGraphqlApi}
    ></BoardWriteUI>
  );
}
