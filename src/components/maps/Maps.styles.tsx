import styled from "@emotion/styled";
// import { breakPoints } from "../../../commons/styles/Media";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
export const Main = styled.div`
  width: 500px;
  height: 470px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fffaf0;

  align-items: center;
  /* justify-content: center; */
`;
export const Contents = styled.div`
  display: flex;
  fill: #fff;
  flex-direction: column;
  position: absolute;
  top: 20px;
  margin-top: 40px;
`;
export const TextWrapper = styled.div`
  margin-bottom: 40px;
  display: flex;
  height: 30px;
  z-index: 100;
  justify-content: center;
  align-items: center;
  width: 500px;
`;

export const FocusedRegion = styled.div`
  z-index: 100;
  font-size: 16px;
`;

export const Text = styled.text`
  font-size: 35px;
  font-weight: 500;
  padding: 20px;
  /* display: none; */
  text-anchor: middle;
  alignment-baseline: middle;
  fill: #2c3131;
  cursor: pointer;
  :hover {
    fill: #2c3131;
  }
  :hover ~ Path {
    cursor: pointer;
    fill: #2c3131;
  }
`;

export const Path = styled.path`
  stroke-linejoin: round;
  stroke: #d6ecfa;
  stroke-width: 4;
  :hover {
    cursor: pointer;
    fill: #eaf7f2;
  }
  :hover + Text {
    display: block;
  }
`;
export const CityWrapper = styled.div`
  transition: 0.3s;
  display: none;
  position: absolute;
  opacity: 0;
  /* margin-top: 40px; */
`;

export const BackBtn = styled(ArrowBackIosNewIcon)`
  font-size: 25px;
  font-weight: 400;
  color: #5e5d5d;
  position: absolute;
  left: 0;
  :hover {
    cursor: pointer;
  }
`;
export const search = styled.div`
  z-index: 9;
  padding: 13px 20px;
  position: absolute;
  font-size: 18px;
  color: #3cb371;
  left: 24%;
  top: 7px;
  font-weight: 300;
  :hover {
    cursor: pointer;
  }
`;
