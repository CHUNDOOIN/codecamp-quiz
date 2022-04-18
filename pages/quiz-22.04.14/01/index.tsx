import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import { useState } from "react";

const Error = styled.div`
  color: red;
  font-size: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.isActive ? "yellow" : "")};
`;

export default function FormPage() {
  const [, setIsActive] = useState(false);

  const [, setWriter] = useState("");
  const [, setPassword] = useState("");
  const [, setTitle] = useState("");
  const [, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const { register, handleSubmit } = useForm();

  // 작성자
  register("writer", {
    onChange: (data) => {
      setWriter(data.writer);
      if (data.writer !== "") {
        setWriterError("");
      }

      if (data.writer && data.password && data.title && data.contents) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    },
  });

  // 패스워드
  register("password", {
    onChange: (data) => {
      setPassword(data.password);
      if (data.password !== "") {
        setPasswordError("");
      }

      if (data.writer && data.password && data.title && data.contents) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    },
  });

  // 제목
  register("title", {
    onChange: (data) => {
      setTitle(data.title);
      if (data.title !== "") {
        setTitleError("");
      }

      if (data.writer && data.password && data.title && data.contents) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    },
  });

  // 내용
  register("contents", {
    onChange: (data) => {
      setContents(data.contents);
      if (data.contents !== "") {
        setContentsError("");
      }

      if (data.writer && data.password && data.title && data.contents) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    },
  });

  // // 작성자
  // const onChangeWriter = (data) => {
  //   setWriter(data.writer);
  //   if (data.writer !== "") {
  //     setWriterError("");
  //   }

  //   if (data.writer && data.password && data.title && data.contents) {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // };

  // // 비밀번호
  // const onChangePassword = (data) => {
  //   setPassword(data.password);
  //   if (data.password !== "") {
  //     setPasswordError("");
  //   }

  //   if (data.writer && data.password && data.title && data.contents) {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // };

  // // 제목
  // const onChangeTitle = (data) => {
  //   setTitle(data.title);
  //   if (data.title !== "") {
  //     setTitleError("");
  //   }

  //   if (data.writer && data.password && data.title && data.contents) {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // };

  // // 내용
  // const onChangeContents = (data) => {
  //   setContents(data.contents);
  //   if (data.contents !== "") {
  //     setContentsError("");
  //   }

  //   if (data.writer && data.password && data.title && data.contents) {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // };

  // 등록버튼
  const onClickSubmit = (data) => {
    if (data.writer === "") {
      setWriterError("작성자를 입력해주세요.");
    }
    if (data.password === "") {
      setPasswordError("비밀번호를 입력해주세요.");
    }
    if (data.title === "") {
      setTitleError("제목을 입력해주세요.");
    }
    if (data.contents === "") {
      setContentsError("내용을 입력해주세요.");
    }
    if (
      data.writer !== "" &&
      data.password !== "" &&
      data.title !== "" &&
      data.contents !== ""
    ) {
      console.log(data);
      alert("성공");
    }

    // if (writer === "") {
    //   setWriterError("작성자를 입력해주세요.");
    // }
    // if (password === "") {
    // if (title === "") {
    //   setTitleError("제목을 입력해주세요.");
    // }
    // if (contents === "") {
    //   setContentsError("내용을 입력해주세요.");
    // }
    // if (writer !== "" && password !== "" && title !== "" && contents !== "")
  };

  // const { onChange } = register("writer");
  // const { onChange } = register("password");
  // const { onChange } = register("title");
  // const { onChange } = register("contents");

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자
      <br />
      <input
        type="text"
        // onChange={onChangeWriter}
        {...register("writer")}
      ></input>
      {/* <ErrorMessage errors={errors} name="writer" />
      <ErrorMessage
        errors={errors}
        name="writer"
        render={({ message }) => <p>{message}</p>}
      /> */}
      <Error>{writerError}</Error>
      <br />
      비밀번호
      <br />
      <input
        type="password"
        // onChange={onChangePassword}
        {...register("password")}
      ></input>
      <Error>{passwordError}</Error>
      <br />
      제목
      <br />
      <input
        type="text"
        // onChange={onChangeTitle}
        {...register("title")}
      ></input>
      <Error>{titleError}</Error>
      <br />
      내용
      <br />
      <input
        type="text"
        // onChange={onChangeContents}
        {...register("contents")}
      ></input>
      <Error>{contentsError}</Error>
      <br />
      <Button isActive={false}>게시물 등록하기</Button>
    </form>
  );
}
