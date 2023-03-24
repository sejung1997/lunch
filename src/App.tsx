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
  overflow: hidden;
  flex-direction: column;
  height: 100vh;
  background-color: #fffaf0;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 100%;
  }
`;
const Title = styled.div`
  text-align: center;
  strong {
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 35px;
  }
  p {
  }
`;
const MapContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const SelectRegion = () => {
  const [inputs, setInputs] = React.useState<RegionInputs>({
    doName: "",
    cityName: "",
  });
  return (
    <MapContainer>
      <SvgMap inputs={inputs} setInputs={setInputs} />;
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
      <Title>
        <strong>점심 뽑기</strong>
        <p>지역을 선택해주세요</p>
      </Title>
      {/* <div>{step}</div>
      <button onClick={() => setStep((prev) => prev + 1)}> + 1 </button> */}
      {Contents}
    </Container>
  );
};

export default App;
