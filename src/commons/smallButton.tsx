import styled from "@emotion/styled";
import React from "react";
import {Button} from "antd"
import { ButtonName } from "../types/type";

const AddButton = styled(Button)`
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 40px;
  margin-right: 10px;
  /* height: 30px; */
  z-index: 101;
  margin-top: 50px;
  font-size: 18px;
  span {
    text-align: center;
    line-height: 40px;
  }
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
