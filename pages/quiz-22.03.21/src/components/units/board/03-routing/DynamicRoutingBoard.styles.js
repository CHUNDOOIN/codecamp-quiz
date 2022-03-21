import styled from "@emotion/styled";

export const Wrap = styled.div`
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

export const Writer = styled.input`
  width: 100%;
  border-color: blue;
`;

export const Title = styled.input`
  width: 100%;
  border-color: red;
`;

export const Contents = styled.input`
  width: 100%;
  border-color: yellow;
`;

export const SubmitButton = styled.button`
  width: 100%;
  border-color: green;

  background-color: ${(props) => (props.isActive ? "yellow" : "none")};
`;
