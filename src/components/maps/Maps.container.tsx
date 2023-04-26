import MapsUI from "./Maps.presenter";
import gsap from "gsap/dist/gsap";
import { useRecoilState } from "recoil";
import { stepState, regionState } from "../../data/Atoms";
import { RegionInputs } from "../../types/type";
import ChungBook from "./mapsSource/ChungBook";
import ChungNam from "./mapsSource/ChungNam";
import GangOne from "./mapsSource/GangOne";
import GyoungBook from "./mapsSource/GyoungBook";
import Gyoungki from "./mapsSource/Gyoungki";
import GyoungNam from "./mapsSource/GyoungNam";
import JeonBook from "./mapsSource/JeonBook";
import JeonNam from "./mapsSource/JeonNam";
import React from "react";

type SvgMapProps = {
  inputs: RegionInputs;
  setInputs: React.Dispatch<React.SetStateAction<RegionInputs>>;
};
type RegionCoordinates = {
  [key: string]: number[];
};
const REGION_COORDINATES: RegionCoordinates = {
  // 충청북도: [36.628503, 127.929344, 0],
  // 충청남도: [36.557229, 126.779757, 1],
  // 강원도: [37.8304115, 128.2260705, 2],
  // 경상북도: [36.248647, 128.664734, 3],
  // 경기도: [37.567167, 127.190292, 4],
  // 경상남도: [35.259787, 128.664734, 5],
  // 전라북도: [35.716705, 127.144185, 6],
  // 전라남도: [34.8194, 126.893113, 7],

  제주특별자치도: [33.364805, 126.542671, -1],
  부산광역시: [35.198362, 129.053922, -1],
  대구광역시: [35.798838, 128.583052, -1],
  인천광역시: [37.469221, 126.573234, -1],
  울산광역시: [35.519301, 129.239078, -1],
  대전광역시: [36.321655, 127.378953, -1],
  서울특별시: [37.540705, 126.956764, -1],
  광주광역시: [35.126033, 126.831302, -1],
  세종특별자치시: [36.5040736, 127.2494855, -1],
};
const pushLocalStorage = (newItem: string) => {
  const temp= JSON.parse(localStorage.getItem('regionHistory') || "[]")
  temp.push(newItem)
  localStorage.setItem('regionHistory', JSON.stringify(temp))
}
export default function SvgMap() {
  const [step, setStep] = useRecoilState(stepState);
  const [region, setRegion] = useRecoilState(regionState);
  const [focusedRegion, setFocusedRegion] = React.useState("");
  const citiesRef = React.useRef<{ [key: string]: HTMLDivElement | null }>({
    충청북도: null,
    충청남도: null,
    강원도: null,
    경상북도: null,
    경기도: null,
    경상남도: null,
    전라북도: null,
    전라남도: null,
  });
  // const megalopolisRef = React.useRef<HTMLDivElement[]>([]);
  const wholeMapRef = React.useRef<HTMLDivElement>(null);
  const citiesRefCache = React.useRef<string>("");
  const selectMegalopolis = (event: any) => {
    console.log(event.target.id, citiesRef.current);

    gsap.to(wholeMapRef.current, 0.3, {
      display: "none",
      opacity: 0,
    });
    const selectedRef = citiesRef.current[event.target.id];
    setFocusedRegion("");

    if (selectedRef) {
      citiesRefCache.current = event.target.id;
      gsap.to(citiesRef.current[event.target.id], 0.3, {
        display: "block",
        opacity: 1,
      });
      setRegion({
        ...region,
        name: event.target.id,
      });
      return;
    }
    const [x, y, i] = REGION_COORDINATES[event.target.id];
    console.log(x, y, i);
    setRegion({
      x,
      y,
      name: event.target.id,
      level: 10,
    });
    setTimeout(() => {
      pushLocalStorage(event.target.id)
      setStep(1)
    }, 300);
  };
  console.log(region, "region");

  const reset = () => {
    if (!citiesRefCache.current) return console.log("오류");

    gsap.to(wholeMapRef.current, 0.3, {
      display: "block",
      opacity: 1,
    });
    gsap.to(citiesRef.current[citiesRefCache.current], 0.3, {
      display: "none",
      opacity: 0,
    });
    setRegion({ x: 0, y: 0, name: "", level: 3 });
    setFocusedRegion("");
  };
  const selectCity = (value: string) => {
    console.log(region, value, "region");
    pushLocalStorage(citiesRefCache.current  + value)
    setRegion({ ...region, name: value, level: 8 });
    setStep(1);

  };
  const onMouseEnter = (event: any) => {
    console.log(event, "mouseover");
    if (event.target instanceof Element) setFocusedRegion(event.target.id);
  };

  const CITY_REGION = React.useMemo(
    () => [
      {
        name: "충청북도",
        component: (
          <ChungBook setCityName={selectCity} onMouseEnter={onMouseEnter} />
        ),
      },
      {
        name: "충청남도",
        component: (
          <ChungNam setCityName={selectCity} onMouseEnter={onMouseEnter} />
        ),
      },
      {
        name: "강원도",
        component: (
          <GangOne setCityName={selectCity} onMouseEnter={onMouseEnter} />
        ),
      },
      {
        name: "경상북도",
        component: (
          <GyoungBook setCityName={selectCity} onMouseEnter={onMouseEnter} />
        ),
      },
      {
        name: "경기도",
        component: (
          <Gyoungki setCityName={selectCity} onMouseEnter={onMouseEnter} />
        ),
      },
      {
        name: "경상남도",
        component: (
          <GyoungNam setCityName={selectCity} onMouseEnter={onMouseEnter} />
        ),
      },
      {
        name: "전라북도",
        component: (
          <JeonBook setCityName={selectCity} onMouseEnter={onMouseEnter} />
        ),
      },
      {
        name: "전라남도",
        component: (
          <JeonNam setCityName={selectCity} onMouseEnter={onMouseEnter} />
        ),
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
      // megalopolisRef={megalopolisRef}
      onMouseEnter={onMouseEnter}
      wholeMapRef={wholeMapRef}
      citiesRefCache={citiesRefCache}
      focusedRegion={focusedRegion}
    />
  );
}
