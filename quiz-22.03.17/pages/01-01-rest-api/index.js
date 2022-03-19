import axios from "axios";
import { useState } from "react";

export default function RestGetPage() {
  const [data, setData] = useState("");

  //   async function callRestApi() {
  //     const result = await axios.get("https://koreanjson.com/posts/1");
  //     console.log(result);
  //     console.log(result.data.title);
  //     setData(result.data.title);
  // }

  const callRestApi = async () => {
    const result = await axios.get("https://koreanjson.com/users/1");
    console.log(result);
    console.log(result.data.name);
    setData(result.data.name);
  };

  return (
    <div>
      <div>{data}</div>
      <button onClick={callRestApi}>REST-API요청하기!!!</button>
    </div>
  );
}
