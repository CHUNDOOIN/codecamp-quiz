import { useState } from "react";
import { Rate } from "antd";

export default function LibraryStarPage() {
  const [value, setValue] = useState(3);

  const handleChange = (value) => {
    setValue(value);
    alert(`별점은 ${value}점 입니다.`);
    console.log(`별점은 ${value}점 입니다.`);
  };

  return (
    <div>
      <Rate onChange={handleChange} value={value} />
      <div>{value}점</div>
    </div>
  );
}
