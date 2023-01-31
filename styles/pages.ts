import styled from "@emotion/styled";

import { motion, useAnimationControls } from "framer-motion";

export const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
`;
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
export const Contents = styled.div`
  margin: 20px auto;
  position: relative;
  display: flex;
  height: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 50px;
  }
  button {
    width: 200px;
    font-size: 25px;
    height: 40px;
    z-index: 4;
    :hover {
      cursor: pointer;
    }
  }
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
