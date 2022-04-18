export default function HofPage() {
  const onClickButton = (one) => (two) => (three) => () => {
    console.log(one);
    console.log(two);
    console.log(three);
  };

  return (
    <div>
      <button onClick={onClickButton(1)(2)(3)}>숙제완료</button>
    </div>
  );
}
