import styled from "@emotion/styled";

import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
export const SearchContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  width: 1200px;
  padding-top: 50px;
`;
export const Contents = styled.div`
  position: relative;
  display: flex;

  height: 530px;
  width: 50%;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  justify-content: space-between;
`;
export const Circle = styled(motion.div)`
  width: 500px;
  height: 500px;
  top: 10px;
  margin: 0 auto;
  position: absolute;
  div {
    width: 50px;
    height: 50px;
    background-color: red;
    position: absolute;
    top: 225px;
    left: 325px;
  }
`;
export const RolletMark = styled.span`
  font-size: 40px;
  color: #333;
`;
export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const Button = styled.button`
  font-size: 20px;
  padding: 5px 20px;
  z-index: 5;
  :hover {
    cursor: pointer;
  }
`;
