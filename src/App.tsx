import "./App.css";
import React from "react";
import styled from "@emotion/styled";
import Reset from "./commons/globalStyles";
import { Global } from "@emotion/react";
// import SearchInput from "./components/searchInput";
import SvgMap from "./components/maps/Maps.container";
import { RegionInputs } from "./types/type";
import { stepState } from "./data/atoms";
import Roller from "./components/main";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fffaf0;
  display: flex;
  justify-content: center;
  div {
    width: 100%;
  }
`;
const Title = styled.div``;
const SelectRegion = () => {
  const [inputs, setInputs] = React.useState<RegionInputs>({
    doName: "",
    cityName: "",
  });
  return (
    <>
      <title>지역을 선택해주세요</title>
      <SvgMap inputs={inputs} setInputs={setInputs} />
      {/* <SearchInput setAddress={setAddress} /> */}
    </>
  );
};

const App = () => {
  const [step, setStep] = useRecoilState(stepState);
  const Contents = React.useMemo(() => {
    switch (step) {
      case 0: {
        return <SelectRegion />;
      }
      case 1: {
        return <Roller />;
      }
      case 2: {
        return <SelectRegion />;
      }
      default: {
        return <SelectRegion />;
      }
    }
  }, [step]);
  return (
    <Container>
      <Global styles={Reset} />
      <div>
        <Title>점심 뽑기</Title>
        <div>{step}</div>
        <button onClick={() => setStep((prev) => prev + 1)}> + 1 </button>
        {Contents}
      </div>
    </Container>
  );
};

export default App;
