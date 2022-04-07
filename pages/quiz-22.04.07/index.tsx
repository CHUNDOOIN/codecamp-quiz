// import axios from 'axios'
import { ChangeEvent, useRef, useState } from "react";
import { useMutation, gql } from "@apollo/client";

import { Modal } from "antd";
import { IMutation, IMutationUploadFileArgs } from "./types";
import { checkFileValidation } from "./validation";
import { LikeOutlined, LinkedinOutlined } from "@ant-design/icons";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
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

export default function GraphqlMutationPage() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageURL] = useState<string | undefined>("");
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [myWriter, setMyWriter] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const [myTitle, setMyTitle] = useState("");
  const [myContents, setMyContents] = useState("");

  const [data, setData] = useState("");
  console.log(data);
  const [createBoard] = useMutation(CREATE_BOARD);

  const callGraphqlApi = async () => {
    // const result = await axios.get("https://koreanjson.com/posts/1") // rest-api 방식!!
    // const result = await axios.get("https://koreanjson.com/users/1")
    // const result = await axios.get("https://koreanjson.com/products/1")

    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: myWriter,
          password: myPassword,
          title: myTitle,
          contents: myContents,
          images: [imageUrl],
        },
      },
    }); // graphql-api 방식
    console.log(result);
    console.log(result.data.createBoard.message);
    setData(result.data.createBoard.message);
  };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setMyWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setMyPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setMyTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setMyContents(event.target.value);
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    const isVaild = checkFileValidation(file);
    if (!isVaild) return;

    try {
      const result = await uploadFile({ variables: { file } });
      console.log(result.data?.uploadFile.url);

      setImageURL(result.data?.uploadFile.url);
    } catch (error: any) {
      Modal.error({ content: error.massage });
    }
  };

  const onClickImage = () => {
    fileRef.current?.click();
  };

  return (
    <div>
      {/* <div>{data}</div> */}
      작성자: <input type="text" onChange={onChangeWriter} />
      <br />
      비밀번호: <input type="text" onChange={onChangePassword} />
      <br />
      제목: <input type="text" onChange={onChangeTitle} />
      <br />
      내용: <input type="text" onChange={onChangeContents} />
      <br />
      <div>
        <div>이미지 업로드 연습하기</div>
        <LikeOutlined style={{}} onClick={onClickImage}>
          이미지선택
        </LikeOutlined>
        <input
          style={{ display: "none" }}
          type={"file"}
          onChange={onChangeFile}
          ref={fileRef}
        />
        <img src={`https://storage.googleapis.com/${imageUrl}`}></img>
        {/* 백엔드는 구글에 업로드하게 되게 세팅되어 있기 떄문에 구글을 붙임.
       만약 AWS로 세팅되어 있으면 그거 붙어ㅕ야함 */}
      </div>
      <button onClick={callGraphqlApi}>저장하기</button>
    </div>
  );
}
