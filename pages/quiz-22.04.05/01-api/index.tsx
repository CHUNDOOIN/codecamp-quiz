import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenApiPage() {
  const [url, setUrl] = useState();

  useEffect(() => {
    const aaa = async () => {
      const result = await axios.get("https://dog.ceo/api/breeds/image/random");
      console.log(result);
      setUrl(result.data.message);
    };
    aaa();
  }, []);

  return (
    <div>
      <div>퀴즈!!!</div>
      <img src={url}></img>
    </div>
  );
}
