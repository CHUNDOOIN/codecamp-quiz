import styled from "@emotion/styled";

export const BoardWrap = styled.div`
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
export const BoardNumber = styled.div`
  background-color: red;
  /* background-color: ${(props) => (props.isActive ? "yellow" : "none")}; */
`;
export const BoardWriter = styled.div`
  background-color: blue;
  /* background-color: ${(props) => (props.isActive ? "yellow" : "none")}; */
`;
export const BoardTitle = styled.div`
  background-color: green;
  /* background-color: ${(props) => (props.isActive ? "yellow" : "none")}; */
`;
export const BoardContents = styled.div`
  background-color: green;
  /* background-color: ${(props) => (props.isActive ? "yellow" : "none")}; */
`;
