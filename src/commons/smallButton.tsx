import styled from "@emotion/styled";
import React from "react";
import { ButtonName } from "../types/type";

const AddButton = styled.button`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  /* height: 30px; */
  z-index: 101;
  margin-top: 50px;
  font-size: 18px;
`;
type SmallButtonProps = {
  contents: string;
  onClick: () => void;
  disabled?: boolean;
};
type RollingButton = SmallButtonProps & {
  contents: ButtonName;
};
export const SmallButton = ({ contents, onClick }: SmallButtonProps) => {
  return <AddButton onClick={onClick}>{contents}</AddButton>;
};
export const RollingButton = ({
  contents,
  disabled,
  onClick,
}: RollingButton) => {
  return (
    <AddButton disabled={disabled} onClick={onClick}>
      {contents}
    </AddButton>
  );
};
