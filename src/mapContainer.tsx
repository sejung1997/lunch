import styled from "@emotion/styled";
import produce from "immer";
import { add, drop } from "lodash";
import React from "react";
export const Map = styled.div`
  width: 100%;
  height: 400px;
  /* margin: 50px auto; */
  /* padding: 40px; */
  .IwContent {
    text-align: center;
  }
`;
type optionType = {
  value: string;
  x: number;
  y: number;
  isNonButton: boolean;
};
type MapContainerProps = {
  address: optionType;
  setOptions?: any;
};
const AddButton = styled.button`
  width: 150px;
  height: 30px;
  margin: 50px auto;

  /* position: absolute; */
`;
const Container = styled.div`
  height: 300px;
  width: 33%;
`;
const MapContainer = ({ address, setOptions }: MapContainerProps) => {
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
  return (
    <Container>
      <Map ref={container} id="map"></Map>
      {address.x && !address?.isNonButton && (
        <AddButton onClick={handlerAddOptions}>추가하기</AddButton>
      )}
    </Container>
  );
};
export default MapContainer;
