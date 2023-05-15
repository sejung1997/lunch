import { useAnimationControls } from "framer-motion";
import React from "react";
import produce from "immer";

import { stepState } from "../data/Atoms";

import SearchInput from "./SearchInput";
import MapContainer from "./MapContainer";
import * as S from "./Main.style";
import { optionType, ButtonName } from "../types/type";
import { SmallButton, RollingButton } from "../commons/SmallButton";
import { useRecoilState } from "recoil";
import { regionState } from "../data/Atoms";
const geom = {
  x: 250,
  y: 250,
  radius: 250,
  statrAngle: 0,
  endAngle: 360,
  anticlockwise: true,
};

const duration = 0.3;
export default function Roller() {
  const [region, setRegion] = useRecoilState(regionState);
  const [options, setOptions] = React.useState<optionType[]>([]);
  const [address, setAddress] = React.useState<optionType>({
    x: region.x,
    y: region.y,
    level: region.level,
  });
  const [buttonName, setButtonName] = React.useState<ButtonName>("돌리기!");
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [step, setStep] = useRecoilState(stepState);

  const circleRef = React.useRef(null);
  const isRerollingRef = React.useRef(false);
  const imgUrlRef = React.useRef<unknown>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const controls = useAnimationControls();
  // React.useEffect(() => {
  //   setAddress({
  //     ...region,
  //   });
  // }, [region]);
  const handleBallot = (): { selectedAngle: number; selectedIndex: number } => {
    const eachDeg = 360 / options.length;

    const selectedAngle = Math.floor(Math.random() * 360);
    const startDeg = 90 - eachDeg;
    const index = Math.floor((selectedAngle - 90) / eachDeg);

    let selectedIndex;
    if (startDeg < 0) {
      if (index >= options.length - 1) selectedIndex = 0;
      else selectedIndex = index + 1;
    } else {
      if (selectedAngle <= startDeg) {
        const temp = Math.floor((startDeg - selectedAngle) / eachDeg);
        selectedIndex = options.length - 1 - temp;
      } else selectedIndex = index + 1;
    }

    return {
      selectedAngle,
      selectedIndex,
    };
  };
  React.useEffect(() => {
    controls.set({
      rotate: [0, 0],
    });
  }, []);

  const degToRad = React.useCallback((deg: number) => {
    return (Math.PI / 180) * deg;
  }, []);

  const draw = React.useCallback(() => {
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
      ctx.arc(geom.x, geom.y, geom.radius, degToRad(geom.statrAngle), degToRad(geom.endAngle), geom.anticlockwise);
    else if (divideNum === 1) {
      ctx.arc(geom.x, geom.y, geom.radius, degToRad(geom.statrAngle), degToRad(geom.endAngle), geom.anticlockwise);
      ctx.font = "18px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeText(`${options[0].name}`, geom.x, geom.y);
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
        ctx.strokeText(`${options[i].name}`, geom.x + x, geom.y + y);
        ctx.lineTo(geom.x, geom.y);
      }
    }
    ctx.stroke();
  }, [options]);

  React.useEffect(() => {
    draw();
    if (!isRerollingRef.current) return;
    onClickRoll();
  }, [options]);

  const onClickRoll = async () => {
    switch (buttonName) {
      case "돌리기!":
      case "다시 돌리기!": {
        isRerollingRef.current = false;

        controls.start({
          rotate: [0, -360],
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
        }, 2200);
        break;
      }
      case "멈추기!": {
        isRerollingRef.current = true;

        const selected = handleBallot();

        console.log(selected, "selectedSector");
        controls.start({
          rotate: [0, -360 - selected.selectedAngle],

          transition: {
            duration: 4.5,
            ease: "circOut",
          },
        });
        setTimeout(() => {
          setAddress({
            ...options[selected.selectedIndex],
            isNonButton: true,
          });
          setButtonName("다시 돌리기!");
        }, 4500);
        break;
      }
    }
  };
  const onClickReRoll = () => {
    console.log("ccc");
    setOptions(
      produce((draft) => {
        return draft.filter((x) => x.name !== address.name);
      })
    );
    isRerollingRef.current = true;
  };
  const reset = () => {
    setStep(0);
    setRegion({
      x: 0,
      y: 0,
      name: "",
      level: 3,
    });
  };
  return (
    <S.Container>
      <SearchInput setAddress={setAddress} address={address} region={region} />
      <S.SearchContainer>
        <S.Contents>
          <S.RolletMark>▼</S.RolletMark>
          <S.Circle animate={controls} ref={circleRef}>
            <canvas ref={canvasRef} width="550" height="550" id="canvas" />
          </S.Circle>
          <S.ButtonGroup>
            <SmallButton contents="지역 다시 선택하기" onClick={reset} />
            <RollingButton onClick={onClickRoll} disabled={btnLoading} contents={buttonName} />

            {buttonName === "다시 돌리기!" && isRerollingRef.current && (
              <SmallButton
                contents={`${address.name} 제외하고 다시 돌리기`}
                onClick={onClickReRoll}
                disabled={btnLoading}
              />
            )}
          </S.ButtonGroup>
        </S.Contents>
        <MapContainer address={address} setOptions={setOptions} canvasRef={canvasRef} />
      </S.SearchContainer>
    </S.Container>
  );
}
