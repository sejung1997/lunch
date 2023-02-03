import styled from "@emotion/styled";

import { motion } from "framer-motion";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 66%;
`;
export const Contents = styled.div`
  margin: 20px auto;
  position: relative;
  display: flex;
  height: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const Circle = styled(motion.div)`
  width: 500px;
  height: 500px;
  top: 15px;
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
