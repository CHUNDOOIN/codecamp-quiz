import axios from "axios";
import { useState } from "react";

export default function QuizPage() {
  const [state, setState] = useState("");
  const [state2, setState2] = useState("");
  const [state3, setState3] = useState("");

  const onClickCallback = () => {
    const aaa = new XMLHttpRequest();
    aaa.open("get", "http://numbersapi.com/random?min=1&max=200");
    aaa.send();
    aaa.addEventListener("load", (res) => {
      const num = res.target.response.split(" ")[0];
      console.log(num);

      const bbb = new XMLHttpRequest();
      bbb.open("get", `http://koreanjson.com/posts/${num}`);
      bbb.send();
      bbb.addEventListener("load", (res) => {
        const b = JSON.parse(res.target.response);
        const userId = b.UserId;
        // console.log(userId);

        const ccc = new XMLHttpRequest();
        ccc.open("get", `http://koreanjson.com/posts?userId=${userId}`);
        ccc.send();
        ccc.addEventListener("load", (res) => {
          const c = JSON.parse(res.target.response);
          // console.log(c);
          setState(c); // 최종 결과값!!!
        });
      });
    });
  };

  const onClickPromise = () => {
    axios
      .get("http://numbersapi.com/random?min=1&max=200")
      .then((res) => {
        const num = res.data.split(" ")[0]; // 71(랜덤숫자)
        return axios.get(`http://koreanjson.com/posts/${num}`);
      })
      .then((res) => {
        const userId = res.data.UserId;
        return axios.get(`http://koreanjson.com/posts?userId=${userId}`);
      })
      .then((res) => {
        const promisestate = res.data;
        setState2(promisestate); // 최종 결과값!!!
      });
  };

  const onClickAsyncawait = async () => {
    const aaa = await axios.get("http://numbersapi.com/random?min=1&max=200");
    const aaaNum = aaa.data.split(" ")[0];
    console.log(aaaNum);

    const bbb = await axios.get(`http://koreanjson.com/posts/${aaaNum}`);
    const bbbUser = bbb.data.UserId;
    console.log(bbb.data.UserId);

    const ccc = await axios.get(
      `http://koreanjson.com/posts?userId=${bbbUser}`
    );
    console.log(ccc.data);
    setState3(ccc);
  };

  return (
    <div>
      결과 : <button onClick={onClickCallback}>Callback</button>
      {state ? (
        <div>게시글 목록 : {state?.map((el) => el.id + "번 ")}</div>
      ) : (
        <div></div>
      )}
      <br />
      <br />
      결과 : <button onClick={onClickPromise}>Promise</button>
      {state2 ? (
        <div>게시글 목록 : {state2?.map((el) => el.id + "번 ")}</div>
      ) : (
        <div></div>
      )}
      <br />
      <br />
      결과 : <button onClick={onClickAsyncawait}>Async/Await</button>
      {state3 ? (
        <div>게시글 목록 : {state3?.data.map((el) => el.id + "번 ")}번</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
