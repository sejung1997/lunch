import styled from "@emotion/styled";
import produce from "immer";
import { add, drop } from "lodash";
import React from "react";
import { optionType } from "../types/type";
export const Map = styled.div`
  width: 100%;
  height: 400px;
`;

type MapContainerProps = {
  address: optionType;
  setOptions?: any;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
};
declare global {
  interface Window {
    Kakao: any;
    kakao: any;
  }
}
const AddButton = styled.button`
  width: 150px;
  height: 30px;
  margin: 50px auto;
`;
const Container = styled.div`
  height: 300px;
  width: 40%;
  margin: 160px 60px;
`;

const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
const MapContainer = ({
  address,
  setOptions,
  canvasRef,
}: MapContainerProps) => {
  const container = React.useRef(null);
  React.useEffect(() => {
    console.log(Number(address?.x), "address");

    if (!address) return;
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=4e89be21e672c2ea6ecbba62c71fa54a&libraries=services,clusterer&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const Gkakao = window.kakao.maps;
        const options = {
          center: new Gkakao.LatLng(Number(address.x), Number(address.y)),
          level: 3,
        };
        //   const infowindow = new Gkakao.InfoWindow({ zIndex: 1 });
        const map = new Gkakao.Map(container, options);
        // 마커가 표시될 위치입니다
        const markerPosition = new Gkakao.LatLng(
          Number(address.x),
          Number(address.y)
        );

        // 마커를 생성합니다
        const marker = new Gkakao.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        const iwContent = `<div style="padding:5px;">${address.value} <br> <a href="https://map.kakao.com/link/to/${address.value},${address.x},${address.y}" style="color:blue" target="_blank">길찾기</a></div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        const iwPosition = new Gkakao.LatLng(
          Number(address.x),
          Number(address.y)
        ); //인포윈도우 표시 위치입니다

        // 인포윈도우를 생성합니다
        const infowindow = new Gkakao.InfoWindow({
          position: iwPosition,
          content: iwContent,
        });

        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, marker);
      });
    };
  }, [address]);
  const handlerAddOptions = () => {
    setOptions(
      produce((draft: optionType[]) => {
        draft.push(address);
        return draft;
      })
    );
  };
  React.useEffect((): (() => void) => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const shareKakao = () => {
    // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
    if (!canvasRef?.current) return;
    const imgUrl = canvasRef.current.toDataURL();
    const blobURl = dataURLtoBlob(imgUrl);
    console.log(blobURl, "temp_url");

    const temp_url = window.URL.createObjectURL(blobURl);
    console.log(temp_url, "temp_url");
    // const objectURL = window.URL.createObjectURL(imgUrl);

    // const fileReader = new FileReader();
    // fileReader.readAsText(imgUrl);
    // fileReader.onload = (data) => {
    //   console.log(data.target?.result);
    //   if (typeof data.target?.result === "string")
    //     console.log(data.target?.result);
    // };
    // const file = dataURLtoFile(imgUrl, "a.png");
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("128db4cb5e3c20292dd0427f6c744e24"); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
      }

      kakao.Share.sendDefault({
        objectType: "location", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
        address: address.address,
        addressTitle: address.value,
        content: {
          title: "롤렛 추첨 결과", // 인자값으로 받은 title
          description: `${address.value}입니다`, // 인자값으로 받은 title
          imageUrl:
            "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
          link: {
            mobileWebUrl: "http/192.169.42.59:3000/",
            webUrl: "http/192.169.42.59:3000/",
          },
        },
        buttons: [
          {
            title: "지도로 확인하기",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              // webUrl: `https://map.kakao.com/link/to/${address.value},${addres js.x},${address.y}`,
              webUrl: "https://developers.kakao.com",
            },
          },
        ],
      });
    }
  };
  return (
    <Container>
      <Map ref={container} id="map"></Map>
      {address.x && !address?.isNonButton && (
        <AddButton onClick={handlerAddOptions}>추가하기</AddButton>
      )}
      {address.x && address?.isNonButton && (
        <AddButton onClick={shareKakao}>공유하기</AddButton>
      )}
    </Container>
  );
};
export default MapContainer;
