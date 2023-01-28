"use client";

import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useMemo } from "react";
import produce from "immer";
import SearchInput from "../src/SearchInput";
import styled from "@emotion/styled";

const RESTAURANTS = [
  {
    name: "문래불백",
    addr: "서울특별시 영등포구 당산로 2-1",
    menus: [{ name: "불백", price: "9000" }],
  },
  {
    name: "골목집",
    addr: "서울특별시 영등포구 도림로139가길 11-1 1층 골목집",
    menus: [{ name: "오감탕", price: "8500" }],
  },
];
const MapContainer = styled.div`
  width: 600px;
  height: 400px;
  margin: 50px auto;
  padding: 40px;
  .IwContent {
    text-align: center;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Contents = styled.div`
  margin: 20px auto;
  position: relative;
  display: flex;
  height: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 50px;
  }
  button {
    width: 200px;
    font-size: 25px;
    height: 40px;
    z-index: 4;
    :hover {
      cursor: pointer;
    }
  }
`;
const Circle = styled(motion.div)`
  width: 500px;
  height: 500px;
  top: 15px;
  margin: 0 auto;
  position: absolute;
  div {
    width: 50px;
    height: 50px;
    background-color: red;
    position: absolute;
    top: 225px;
    left: 325px;
  }
`;

// declare const window: typeof globalThis & {
//   kakao: any;
// };
declare global {
  interface Window {
    kakao: any;
  }
}

const geom = {
  x: 250,
  y: 250,
  radius: 250,
  statrAngle: 0,
  endAngle: 360,
  anticlockwise: false,
};
const initialOptions = {
  duration: 1,
  repeat: Infinity,
  repeatDelay: 0,
  ease: "linear",
};
const duration = 0.3;
export default function Home() {
  const [options, setOptions] = React.useState<string[]>(["1", "2", "3", "4"]);
  const [btnName, setBtnName] = React.useState("돌리기!");
  const [rotateOptions, setRotateOptions] =
    React.useState<InitialOptions>(initialOptions);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const container = React.useRef(null);
  const circleRef = React.useRef(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const startTime = React.useRef<Date>();
  const endTime = React.useRef<Date>();
  const controls = useAnimationControls();

  const handleBallot = (): number => {
    const selectedNumber = Math.floor(Math.random() * options.length);
    console.log(selectedNumber, "ccc");
    return (
      selectedNumber * (360 / options.length) + Math.floor(Math.random() * 89)
    );
  };
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=4e89be21e672c2ea6ecbba62c71fa54a&libraries=services,clusterer&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      // window.kakao.maps.load(() => {
      //   const container = document.getElementById("map");
      //   const Gkakao = window.kakao.maps;
      //   const options = {
      //     center: new Gkakao.LatLng(37.51505354009884, 126.89554077580914),
      //     level: 2,
      //   };
      //   const infowindow = new Gkakao.InfoWindow({ zIndex: 1 });
      //   const map = new Gkakao.Map(container, options);
      //   // 장소 검색 객체를 생성합니다
      //   const ps = new Gkakao.services.Places();
      //   // 키워드로 장소를 검색합니다
      //   ps.keywordSearch("문래동 철판", placesSearchCB);
      //   // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      //   function placesSearchCB(data, status, pagination) {
      //     if (status === Gkakao.services.Status.OK) {
      //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      //       // LatLngBounds 객체에 좌표를 추가합니다
      //       const bounds = new Gkakao.LatLngBounds();
      //       console.log(data, "data");
      //       for (let i = 0; i < data.length; i++) {
      //         // displayMarker(data[i]);
      //         // bounds.extend(new Gkakao.LatLng(data[i].y, data[i].x));
      //       }
      //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      //       // map.setBounds(bounds);
      //     }
      //   }
      //   // 지도에 마커를 표시하는 함수입니다
      //   // function displayMarker(place) {
      //   //   // 마커를 생성하고 지도에 표시합니다
      //   //   const marker = new Gkakao.Marker({
      //   //     map: map,
      //   //     position: new Gkakao.LatLng(place.y, place.x),
      //   //   });
      //   //   // 마커에 클릭이벤트를 등록합니다
      //   //   Gkakao.event.addListener(marker, "click", function () {
      //   //     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      //   //     infowindow.setContent(
      //   //       '<div style="padding:5px;font-size:12px;">' +
      //   //         place.place_name +
      //   //         "</div>"
      //   //     );
      //   //     infowindow.open(map, marker);
      //   //   });
      //   // }
      //   // const ps = new Gkakao.services.Places(map);
      //   // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      //   // const placesSearchCB = (data: unknown, status, pagination) => {
      //   //   if (status === Gkakao.services.Status.OK) {
      //   //     for (const i = 0; i < data.length; i++) {
      //   //       displayMarker(data[i]);
      //   //     }
      //   //   }
      //   // };
      //   // const displayMarker = (place) => {
      //   //   // 마커를 생성하고 지도에 표시합니다
      //   //   const marker = new Gkakao.Marker({
      //   //     map: map,
      //   //     position: new Gkakao.LatLng(place.y, place.x),
      //   //   });
      //   //   // 마커에 클릭이벤트를 등록합니다
      //   //   Gkakao.event.addListener(marker, "click", () => {
      //   //     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      //   //     infowindow.setContent(
      //   //       '<div style="padding:5px;font-size:12px;">' +
      //   //         place.place_name +
      //   //         "</div>"
      //   //     );
      //   //     infowindow.open(map, marker);
      //   //   });
      //   // };
      //   // ps.categorySearch("FD6", placesSearchCB, { useMapBounds: true });
      // });
    };
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
      ctx.strokeText(`${options[0]}`, geom.x, geom.y);
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
        ctx.strokeText(`${options[i]}`, geom.x + x, geom.y + y);
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
    switch (btnName) {
      case "돌리기!": {
        startTime.current = new Date();

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
          setBtnName("멈추기!");
        }, 200);
        break;
      }
      case "멈추기!": {
        endTime.current = new Date();
        // controls.stop();
        if (!startTime.current) return alert("다시 실행해주세요");
        const durationTime =
          (endTime.current?.getTime() - startTime.current?.getTime()) / 1000;
        const selected = (durationTime * 360) / duration;

        console.log(selected % 360, "time");
        // controls.stop();
        const selectedSector = handleBallot();
        console.log(selectedSector, "selectedSector");
        controls.start({
          rotate: [0, 360 + selectedSector],

          transition: {
            duration: 4,
            ease: "circOut",
          },
        });

        setBtnName("돌리기!");

        break;
      }
    }
  };
  return (
    <Container>
      {/* <Script
        type="text/javascript"
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=4e89be21e672c2ea6ecbba62c71fa54a"
      ></Script> */}
      <SearchInput setOptions={setOptions} />
      <Contents>
        <span>▼</span>
        <Circle animate={controls} ref={circleRef}>
          <canvas ref={canvasRef} width="500" height="500" id="canvas" />
          {/* <div /> */}
        </Circle>
        <button
          type="button"
          onClick={onClickRoll}
          // btnName={btnName}
          disabled={btnLoading}
        >
          {btnName}
        </button>
      </Contents>
      <MapContainer ref={container} id="map"></MapContainer>
    </Container>
  );
}
