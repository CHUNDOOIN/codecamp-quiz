const classmates = [
  { name: "철수", age: 10, school: "토끼초등학교" },
  { name: "영희", age: 13, school: "다람쥐초등학교" },
  { name: "훈이", age: 11, school: "토끼초등학교" },
];

// 보너스1

// (1)
classmates
  .filter((el) => el.school === "토끼초등학교")
  .map((el) => ({ name: el.name, age: el.age, school: el.school, candy: 10 }));

// (2)
classmates
  .filter((el) => el.school === "다람쥐초등학교")
  .map((el) => ({ name: el.name + "어린이", age: el.age, school: el.school }));
