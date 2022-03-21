import styled from "@emotion/styled";

export const BoardWrap = styled.div`
  width: 500px;
  height: 500px;
  background-color: gray;

  display: flex;

  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  margin: 100px auto;
  padding: 100px;
`;

export const BoardNumber = styled.div`
  width: 100%;
  border-color: blue;
`;
export const BoardWriter = styled.div`
  width: 100%;
  border-color: red;
`;
export const BoardTitle = styled.div`
  width: 100%;
  border-color: red;
`;

export const BoardContents = styled.div`
  width: 100%;
  border-color: yellow;
`;

export const SubmitButton = styled.button`
  width: 100%;
  /* background-color: ${(props) => (props.isActive ? "yellow" : "none")}; */
  /* border-color: green; */
`;
