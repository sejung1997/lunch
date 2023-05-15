import "./App.css";
import React from "react";
import styled from "@emotion/styled";
import Reset from "./commons/GlobalStyles";
import { Global } from "@emotion/react";
// import SearchInput from "./components/searchInput";
import SvgMap from "./components/maps/Maps.container";
import { RegionInputs } from "./types/type";
import { stepState } from "./data/Atoms";
import Roller from "./components/Main";
import RegionHistory from "./components/RegionHIstory";

import { useRecoilState } from "recoil";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  flex-direction: column;
  height: 100vh;
  background-color: #fffaf0;
  display: flex;
  padding-top: 70px;
  align-items: center;
`;
const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  justify-content: center;
`;
const RegionTitle = styled.div`
  font-size: 22px;
  margin-bottom: 60px;
`;
const SelectRegion = () => {
  return (
    <MapContainer>
      <RegionTitle>지역을 선택해주세요!</RegionTitle>
      <RegionHistory />

      <SvgMap />
    </MapContainer>
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
      {/* <Title>점심 뽑기</Title> */}
      {/* <div>{step}</div>
      <button onClick={() => setStep((prev) => prev + 1)}> + 1 </button> */}
      {Contents}
    </Container>
  );
};

export default App;
