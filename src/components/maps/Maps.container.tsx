import { Contents, Path, Text } from "./Maps.styles";
import { useEffect, useRef, useState } from "react";
import MapsUI from "./Maps.presenter";
import gsap from "gsap/dist/gsap";
import { useRecoilState } from "recoil";
import { stepState } from "../../data/atoms";

import { RegionInputs } from "../../types/type";

import React from "react";

type SvgMapProps = {
  inputs: RegionInputs;
  setInputs: React.Dispatch<React.SetStateAction<RegionInputs>>;
};
export default function SvgMap({ setInputs, inputs }: SvgMapProps) {
  const [step, setStep] = useRecoilState(stepState);

  const wholeMapRef = React.useRef<HTMLDivElement>(null);
  const selectDo = (event: any) => {
    const selected = document.getElementById(event.target.id + "Selected");

    setInputs({
      ...inputs,
      doName: event.target.id,
    });
    gsap.to(wholeMapRef.current, 0.3, {
      display: "none",
      opacity: 0,
    });
    if (selected) {
      gsap.to(selected, 0.3, {
        display: "block",
        opacity: 1,
      });
    } else console.log("오류");
  };
  console.log(inputs, " inputs");
  const reset = () => {
    const selected = document.getElementById(inputs.doName + "Selected");
    gsap.to(wholeMapRef.current, 0.3, {
      display: "block",
      opacity: 1,
    });
    if (selected) {
      gsap.to(selected, 0.3, {
        display: "none",
        opacity: 0,
      });
    }
    setInputs({
      ...inputs,
      doName: "",
      cityName: "",
    });
  };
  const setCityName = (value: string) => {
    setInputs({
      ...inputs,
      cityName: value,
    });
    setStep(1);
  };
  return (
    <MapsUI
      inputs={inputs}
      setCityName={setCityName}
      selectDo={selectDo}
      reset={reset}
      wholeMapRef={wholeMapRef}
    />
  );
}
