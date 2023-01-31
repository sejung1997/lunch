"use client";

import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useMemo } from "react";
import produce from "immer";
import SearchInput from "@/src/searchInput";
import LatelyItems from "@/src/latelyItems";
import MapContainer from "@/src/mapContainer";
import * as S from "../styles/pages";
import Modal from "@/src/modal";

// declare const window: typeof globalThis & {
//   kakao: any;
// };
declare global {
  interface Window {
    kakao: any;
  }
}
type optionType = {
  value: string;
  x: number;
  y: number;
  isNonButton?: boolean;
};
const geom = {
  x: 250,
  y: 250,
  radius: 250,
  statrAngle: 0,
  endAngle: 360,
  anticlockwise: true,
};
const initialOptions = {
  duration: 1,
  repeat: Infinity,
  repeatDelay: 0,
  ease: "linear",
};
const duration = 0.3;

export default function Home() {
  const [options, setOptions] = React.useState<optionType[]>([]);
  const [address, setAddress] = React.useState<optionType>({
    y: 126.570667,
    x: 33.450701,
    value: "뱅크몰",
    isNonButton: true,
  });
  const [buttonName, setButtonName] = React.useState("돌리기!");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState<Boolean>(false);

  const circleRef = React.useRef(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const startTime = React.useRef<Date>();
  const endTime = React.useRef<Date>();
  const controls = useAnimationControls();

  const handleBallot = (): { angle: number; selectedNumber: number } => {
    const selectedNumber = Math.floor(Math.random() * options.length);
    console.log(selectedNumber, "ccc");
    return {
      angle:
        selectedNumber * (360 / options.length) +
        Math.floor(Math.random() * 89),
      selectedNumber,
    };
  };
  React.useEffect(() => {
    controls.set({
      rotate: [0, 0],
    });
  }, []);

  const degToRad = React.useCallback((deg) => {
    return (Math.PI / 180) * deg;
  }, []);

  const draw = () => {
    if (!document.getElementById("canvas")) return;

    // const canvas = document.getElementById("canvas")<HTMLCanvasElement>;
    if (!canvasRef || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    const divideNum = options.length;
    console.log(options, divideNum, "circleInfo.divideNum");
    if (divideNum === 0)
      ctx.arc(
        geom.x,
        geom.y,
        geom.radius,
        degToRad(geom.statrAngle),
        degToRad(geom.endAngle),
        geom.anticlockwise
      );
    else if (divideNum === 1) {
      ctx.arc(
        geom.x,
        geom.y,
        geom.radius,
        degToRad(geom.statrAngle),
        degToRad(geom.endAngle),
        geom.anticlockwise
      );
      ctx.font = "18px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeText(`${options[0].value}`, geom.x, geom.y);
    } else {
      const eachDeg = 360 / divideNum;
      for (let i = 0; i < divideNum; i++) {
        // arc(x, y, radius, startAngle, endAngle, anticlockwise)
        ctx.arc(
          geom.x,
          geom.y,
          geom.radius,
          degToRad(i * eachDeg),
          degToRad(i * eachDeg + eachDeg),
          geom.anticlockwise
        );
        ctx.font = "18px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const Pi = (Math.PI / 180) * (eachDeg * (i - 1) + eachDeg / 2);
        const x = 125 * Math.cos(Pi);
        const y = 125 * Math.sin(Pi);
        ctx.strokeText(`${options[i].value}`, geom.x + x, geom.y + y);
        ctx.lineTo(geom.x, geom.y);
      }
    }
    console.log(degToRad(geom.statrAngle), degToRad(geom.endAngle));
    ctx.stroke();
  };
  console.log(options, "options");
  React.useEffect(() => {
    draw();
  }, [options]);

  const onClickRoll = async () => {
    switch (buttonName) {
      case "돌리기!":
      case "다시 돌리기!": {
        // startTime.current = new Date();

        controls.start({
          rotate: [0, 360],
          transition: {
            duration,
            repeat: Infinity,
            repeatDelay: 0,
            ease: "linear",
          },
        });

        setBtnLoading(true);
        setTimeout(() => {
          setBtnLoading(false);
          setButtonName("멈추기!");
        }, 200);
        break;
      }
      case "멈추기!": {
        // endTime.current = new Date();
        // controls.stop();
        // if (!startTime.current) return alert("다시 실행해주세요");
        // const durationTime =
        //   (endTime.current?.getTime() - startTime.current?.getTime()) / 1000;
        // const selected = (durationTime * 360) / duration;

        // console.log(selected % 360, "time");
        // controls.stop();
        const selected = handleBallot();

        console.log(selected, "selectedSector");
        controls.start({
          rotate: [0, 360 + selected.angle],

          transition: {
            duration: 4,
            ease: "circOut",
          },
        });

        setButtonName("다시 돌리기!");
        setTimeout(() => {
          setAddress({
            ...options[selected.selectedNumber],
            isNonButton: true,
          });
        }, 4500);
        break;
      }
    }
  };
  return (
    <S.Container>
      {/* {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <MapContainer address={address} />
        </Modal>
      )} */}

      {/* <Script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=4e89be21e672c2ea6ecbba62c71fa54a"
      ></Script> */}
      <S.SearchContainer>
        {/* <LatelyItems /> */}
        <SearchInput setAddress={setAddress} />

        <S.Contents>
          <span>▼</span>
          <S.Circle animate={controls} ref={circleRef}>
            <canvas ref={canvasRef} width="500" height="500" id="canvas" />
            {/* <div /> */}
          </S.Circle>
          <button type="button" onClick={onClickRoll} disabled={btnLoading}>
            {buttonName}
          </button>
        </S.Contents>
      </S.SearchContainer>

      <MapContainer address={address} setOptions={setOptions} />
    </S.Container>
  );
}
