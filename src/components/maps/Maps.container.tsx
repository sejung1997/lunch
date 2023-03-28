import MapsUI from "./Maps.presenter";
import gsap from "gsap/dist/gsap";
import { useRecoilState } from "recoil";
import { stepState, regionState } from "../../data/atoms";
import { RegionInputs } from "../../types/type";
import ChungBook from "./mapsSource/chungBook";
import ChungNam from "./mapsSource/chungNam";
import GangOne from "./mapsSource/gangOne";
import GyoungBook from "./mapsSource/gyoungBook";
import Gyoungki from "./mapsSource/gyoungki";
import GyoungNam from "./mapsSource/gyoungNam";
import JeonBook from "./mapsSource/jeonBook";
import JeonNam from "./mapsSource/jeonNam";
import React from "react";

type SvgMapProps = {
  inputs: RegionInputs;
  setInputs: React.Dispatch<React.SetStateAction<RegionInputs>>;
};
const REGION_COORDINATE = {
  제주특별자치도: [33.364805, 126.542671],
  경상남도: [35.259787, 128.664734],
  경상북도: [36.248647, 128.664734],
  부산광역시: [35.198362, 129.053922],
  대구광역시: [35.798838, 128.583052],
  충청남도: [36.557229, 126.779757],
  인천광역시: [37.469221, 126.573234],
};
export default function SvgMap() {
  const [step, setStep] = useRecoilState(stepState);
  const [region, setRegion] = useRecoilState(regionState);
  const citiesRef = React.useRef<HTMLDivElement[]>([]);
  const megalopolisRef = React.useRef<HTMLDivElement[]>([]);
  const wholeMapRef = React.useRef<HTMLDivElement>(null);
  const findMapRefIndex = React.useCallback((name: string) => {
    let cache = null;
    if (name === "reset") return cache;

    const selectedIndex = CITY_REGION.findIndex(
      (region) => region.name === name
    );
    cache = selectedIndex;
    return selectedIndex;
  }, []);
  const selectMegalopolis = (event: any) => {
    console.log(event.target.id);

    const [x, y, name] = event.target.id.split(",");
    console.log(x, y, name);

    // const selected = document.getElementById(name + "Selected");

    const index = findMapRefIndex(name);
    if (index === null) return console.log("오류");

    setRegion({
      x,
      y,
      name,
      level: 10,
    });
    if (index === -1) return setStep(1);
    gsap.to(wholeMapRef.current, 0.3, {
      display: "none",
      opacity: 0,
    });
    gsap.to(citiesRef.current[index], 0.3, {
      display: "block",
      opacity: 1,
    });
  };
  const reset = () => {
    const selectedIndex = findMapRefIndex("reset");
    if (selectedIndex === null) return console.log("오류");

    gsap.to(wholeMapRef.current, 0.3, {
      display: "block",
      opacity: 1,
    });
    gsap.to(citiesRef.current[selectedIndex], 0.3, {
      display: "none",
      opacity: 0,
    });
    setRegion({ x: "", y: "", name: "", level: 3 });
  };
  const selectCity = (value: string) => {
    setRegion({ ...region, name: value, level: 7 });
    setStep(1);
  };

  const CITY_REGION = React.useMemo(
    () => [
      {
        name: "충청북도",
        component: <ChungBook setCityName={selectCity} />,
      },
      {
        name: "충청남도",
        component: <ChungNam setCityName={selectCity} />,
      },
      {
        name: "강원도",
        component: <GangOne setCityName={selectCity} />,
      },
      {
        name: "경상북도",
        component: <GyoungBook setCityName={selectCity} />,
      },
      {
        name: "경기도",
        component: <Gyoungki setCityName={selectCity} />,
      },
      {
        name: "경상남도",
        component: <GyoungNam setCityName={selectCity} />,
      },
      {
        name: "전라북도",
        component: <JeonBook setCityName={selectCity} />,
      },
      {
        name: "전라남도",
        component: <JeonNam setCityName={selectCity} />,
      },
    ],
    []
  );

  return (
    <MapsUI
      region={region}
      CITY_REGION={CITY_REGION}
      selectMegalopolis={selectMegalopolis}
      citiesRef={citiesRef}
      reset={reset}
      megalopolisRef={megalopolisRef}
      wholeMapRef={wholeMapRef}
    />
  );
}
