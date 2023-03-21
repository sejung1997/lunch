import styled from "@emotion/styled";
// import { breakPoints } from "../../../commons/styles/Media";
export const Main = styled.div`
  width: 500px;
  height: 430px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fffaf0;
  align-items: center;
`;
export const Contents = styled.div`
  display: flex;
  fill: #fff;
  flex-direction: column;
  position: absolute;
  top: -20px;
  margin-top: 40px;
`;

export const Text = styled.text`
  font-size: 35px;
  font-weight: 500;
  padding: 20px;
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

export const BackBtn = styled.div`
  padding: 13px 20px;
  position: absolute;
  font-size: 16px;
  left: 10%;
  color: #3cb371;
  top: 20px;
  font-weight: 300;
  z-index: 11;
  /* color: #464646; */
  :hover {
    cursor: pointer;
  }
  img {
    margin-right: 11px;
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
