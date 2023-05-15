import styled from "@emotion/styled";
import React from "react";
import { Button } from "antd";
import { ButtonName } from "../types/type";

const AddButton = styled(Button)`
  /* padding: 0px 30px; */

  /* height: 40px; */
  margin-right: 10px;
  /* z-index: 101; */
  margin-top: 50px;
  /* font-size: 18px; */
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
  return (
    <AddButton onClick={onClick} size={"large"}>
      {contents}
    </AddButton>
  );
};
export const RollingButton = ({ contents, disabled, onClick }: RollingButton) => {
  return (
    <AddButton disabled={disabled} onClick={onClick} size={"large"}>
      {contents}
    </AddButton>
  );
};
