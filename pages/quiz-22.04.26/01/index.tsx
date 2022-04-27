import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function QuizPage() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [createBoard] = useMutation(CREATE_BOARD);

  const [files, setFiles] = useState<(File | undefined)[]>([
    undefined,
    undefined,
    undefined,
  ]);
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  console.log("파일즈1", files, "이미지", imageUrls);

  const onChangeFile =
    (number: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        alert("파일이 없습니다!");
        return;
      }

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (data) => {
        if (typeof data.target?.result === "string") {
          const tempUrls = [...imageUrls];
          tempUrls[number] = data.target?.result;
          setImageUrls(tempUrls);
          console.log("콘솔2", files, imageUrls);

          const tempFiles = [...files];
          tempFiles[number] = file;

          setFiles(tempFiles);
        }
      };
    };

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onClickSubmit = async () => {
    const results = await Promise.all(
      files.map((el) => el && uploadFile({ variables: { file: el } }))
    );

    const resultUrls = results.map((el) =>
      el?.data ? el?.data?.uploadFile.url : ""
    );

    try {
      const result2 = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
            images: resultUrls,
          },
        },
      });

      alert("성공");
      console.log(result2.data.createBoard._id);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      작성자
      <br />
      <input type="text" onChange={onChangeWriter} />
      <br />
      비밀번호
      <br />
      <input type="password" onChange={onChangePassword} />
      <br />
      제목
      <br />
      <input type="text" onChange={onChangeTitle} />
      <br />
      내용
      <br />
      <input type="text" onChange={onChangeContents} />
      <br />
      <input type="file" onChange={onChangeFile(0)}></input>
      <br />
      <input type="file" onChange={onChangeFile(1)}></input>
      <br />
      <input type="file" onChange={onChangeFile(2)}></input>
      <br />
      {files[0] === undefined ? <div></div> : <Img src={imageUrls[0]}></Img>}
      {/* <Img src={imageUrls[0]}></Img> */}
      <br />
      {files[1] === undefined ? <div></div> : <Img src={imageUrls[1]}></Img>}
      {/* <Img src={imageUrls[1]}></Img> */}
      <br />
      {files[2] === undefined ? <div></div> : <Img src={imageUrls[2]}></Img>}
      {/* <Img src={imageUrls[2]}></Img> */}
      <br />
      <button onClick={onClickSubmit}>저장하기</button>
    </div>
  );
}
