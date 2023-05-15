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
  justify-content: space-between;
  width: 1200px;
  padding-top: 150px;
`;
export const Contents = styled.div`
  position: relative;
  display: flex;
  height: 600px;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const Circle = styled(motion.div)`
  width: 500px;
  height: 500px;
  top: 20px;
  margin: 0 auto;
  position: absolute;
`;
export const RolletMark = styled.span`
  font-size: 40px;
  color: black;
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
