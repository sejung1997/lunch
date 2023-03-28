import styled from "@emotion/styled";
import React from "react";

const AddButton = styled.button`
  width: 150px;
  height: 30px;
  margin-top: 50px;
`;
type SmallButtonProps = {
  contents: string;
  onClick: () => void;
};
const SmallButton = ({ contents, onClick }: SmallButtonProps) => {
  return <AddButton onClick={onClick}>{contents}</AddButton>;
};
export default SmallButton;
