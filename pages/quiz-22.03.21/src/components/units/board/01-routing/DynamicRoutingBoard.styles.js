import styled from "@emotion/styled";

export const ButtonWrap = styled.div`
  width: 500px;
  height: 500px;
  background-color: gray;

  margin: 100px auto;
  padding: 50px;

  display: flex;

  flex-direction: column;
  justify-content: space-around;
  /* background-color: ${(props) => (props.isActive ? "yellow" : "none")}; */
`;
export const Button1 = styled.button`
  background-color: red;
  /* background-color: ${(props) => (props.isActive ? "yellow" : "none")}; */
`;
export const Button2 = styled.button`
  background-color: blue;
  /* background-color: ${(props) => (props.isActive ? "yellow" : "none")}; */
`;
export const Button3 = styled.button`
  background-color: green;
  /* background-color: ${(props) => (props.isActive ? "yellow" : "none")}; */
`;
