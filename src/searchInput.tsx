"use client";
import React from "react";
import produce from "immer";
import styled from "@emotion/styled";
import axios from "axios";
import { debounce } from "lodash";
type ResultType = {
  selectedSection?: boolean;
};
type optionType = {
  value: string;
  x: number;
  y: number;
  isNonButton: boolean;
};

const Input = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 100px;
  input {
    height: 20px;
    width: 300px;
  }
`;
const ResultsWrapper = styled.div`
  border: 1px solid gray;
  position: absolute;
  top: 105px;
  z-index: 3;
  background-color: #fff;
  width: 300px;
`;
const Result = styled.div`
  width: 100%;
  border: 1px solid gray;
  display: flex;
  justify-content: space-between;
  background-color: ${({ selectedSection }: ResultType) =>
    selectedSection ? "yellow" : ""};
`;
const ElCategory = styled.span`
  font-size: 10px;
`;
const placesSearchCB = (data, status) => {
  switch (status) {
    case Gkakao.services.Status.OK: {
      return data;
    }
    case Gkakao.services.Status.ZERO_RESULT: {
      return "no results";
    }
    case Gkakao.services.Status.ERROR: {
      return " error";
    }
  }
};
const instance = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/search",
  headers: {
    Authorization: `KakaoAK bbac5fb8d069d11d6659014e84aa534c`,
    // contentType: "application/json",
  },
});
interface SearchAddressResult {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const SearchInput = ({ setAddress }) => {
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState<SearchAddressResult[]>([]);
  const [isNonResultShow, setIsNonResultShow] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState(0);
  console.log(input, "input");
  const onChangeInp = (e) => {
    setInput(e.target.value);
  };

  // const handlerSearch = (keyWord: string) => {
  //   console.log(keyWord);
  //   return window.kakao.maps.load(() => {
  //     const Gkakao = window.kakao.maps;
  //     // 장소 검색 객체를 생성합니다
  //     const ps = new Gkakao.services.Places();
  //     console.log(ps);

  //     const placesSearchCB = (data: unknown, status: string) => {
  //       switch (status) {
  //         case Gkakao.services.Status.OK: {
  //           console.log(data);
  //           return data;
  //         }
  //         case Gkakao.services.Status.ZERO_RESULT: {
  //           console.log("no results");

  //           return "no results";
  //         }
  //         case Gkakao.services.Status.ERROR: {
  //           console.log("errora");

  //           return " error";
  //         }
  //       }
  //     };
  //     // // 키워드로 장소를 검색합니다
  //     return ps.keywordSearch(keyWord, placesSearchCB);
  //   });
  // };

  const onChangeInput = async (keyword: any) => {
    console.log(keyword, "e");
    try {
      const { data } = await instance.get(
        `keyword.json?y=37.51505354009884&x=126.89554077580914&radius=1000&category_group_code=FD6&query=${keyword}`
      );
      if (data.documents.length === 0) {
        setIsNonResultShow(true);
        setTimeout(() => setIsNonResultShow(false), 1000);
      }
      setData(data.documents);
      setSelectedSection(0);
    } catch (error: any) {
      console.log(error);
      if (error.response.data.errorType === "MissingParameter") setData([]);
    }
  };

  const keyDownInput = (e) => {
    console.log(e.code, "e");

    switch (e.code) {
      case "ArrowUp": {
        if (selectedSection === 0) return;
        setSelectedSection((prev) => prev - 1);
        break;
      }
      case "ArrowDown": {
        if (selectedSection === data.length - 1) return;
        setSelectedSection((prev) => prev + 1);
        break;
      }
      case "Enter": {
        console.log("enter cc");
        console.log(data[selectedSection], "cc");
        setAddress({
          value: data[selectedSection]?.place_name,
          y: Number(data[selectedSection]?.x),
          x: Number(data[selectedSection]?.y),
        });
        setData([]);
      }
      default:
        return;
    }
  };
  return (
    <Input>
      <h4>식당을 추가해주세요</h4>
      <input
        // value={input}
        onKeyDown={keyDownInput}
        onChange={debounce((e: any) => onChangeInput(e.target.value), 1000)}
      />

      {data.length > 0 ? (
        <ResultsWrapper>
          {data?.map((el: SearchAddressResult, index) => (
            <Result selectedSection={selectedSection === index} key={el.id}>
              {el.place_name}{" "}
              <ElCategory>{el.category_name.split(">").at(-1)}</ElCategory>
            </Result>
          ))}
        </ResultsWrapper>
      ) : (
        isNonResultShow && <Result>검색 결과가 없습니다</Result>
      )}
    </Input>
  );
};

export default SearchInput;
