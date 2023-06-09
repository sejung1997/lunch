import React, { SetStateAction } from "react";
import produce from "immer";
import styled from "@emotion/styled";
import axios from "axios";
import { debounce } from "lodash";
import * as S from "./SearchInput.style";
import { optionType } from "../types/type";

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
type SearchInputProps = {
  setAddress: React.Dispatch<React.SetStateAction<optionType>>;
  address: optionType;
  region: any;
};
declare global {
  interface Window {
    Kakao: any;
  }
}
const instance = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/search",
  headers: {
    Authorization: `KakaoAK bbac5fb8d069d11d6659014e84aa534c`,
    // contentType: "application/json",
  },
});

const SearchInput = ({ setAddress, region }: SearchInputProps) => {
  const [input, setInput] = React.useState<string>("");
  const [data, setData] = React.useState<SearchAddressResult[]>([]);
  const [isNonResultShow, setIsNonResultShow] = React.useState(false);
  const [selectedSection, setSelectedSection] = React.useState(0);
  const isFirstKeyDown = React.useRef<boolean>(true);
  const inputRef = React.useRef<HTMLInputElement>(null);
  console.log(region, "region1");
  const onChangeInput = async (keyword: any) => {
    console.log(keyword, "onChangeInput");
    try {
      const { data } = await instance.get(
        `keyword.json?y=${region.x}&x=${region.y}&radius=20000&category_group_code=FD6&query=${keyword}`
      );
      if (data.documents.length === 0) {
        setIsNonResultShow(true);
        setTimeout(() => setIsNonResultShow(false), 1000);
      }
      setData(data.documents);
    } catch (error: any) {
      console.log(error);
      if (error.response.data.errorType === "MissingParameter") setData([]);
    } finally {
      setSelectedSection(0);
      isFirstKeyDown.current = true;
    }
  };
  const handleSetAddress = (index: number) => () => {
    setAddress({
      name: data[index]?.place_name,
      y: Number(data[index]?.x),
      x: Number(data[index]?.y),
      isNonButton: false,
    });
    setData([]);
    if (inputRef?.current) inputRef.current.value = "";
  };
  const keyDownInput = (e: any) => {
    console.log(e.code, e.repeat, selectedSection, "keyDownInput");
    if (data.length === 0) return;
    switch (e.code) {
      case "ArrowUp": {
        if (selectedSection === 0) return;
        setSelectedSection((prev) => prev - 1);
        break;
      }
      case "ArrowDown": {
        if (selectedSection === data.length - 1) return;
        if (isFirstKeyDown.current) {
          isFirstKeyDown.current = false;
          return;
        }
        if (selectedSection === 0) {
        }
        setSelectedSection((prev) => prev + 1);

        break;
      }
      case "Enter": {
        setAddress({
          name: data[selectedSection]?.place_name,
          address_name: data[selectedSection]?.address_name,
          y: Number(data[selectedSection]?.x),
          x: Number(data[selectedSection]?.y),
          isNonButton: false,
        });
        setData([]);
        if (inputRef?.current) inputRef.current.value = "";
        break;
      }
      default:
        return;
    }
  };
  console.log(selectedSection, "selectedSection");
  return (
    <S.Input>
      <h4>식당을 추가해주세요</h4>
      <input
        ref={inputRef}
        onKeyDown={keyDownInput}
        onChange={debounce((e: any) => onChangeInput(e.target.value), 600)}
      />

      {data.length > 0 ? (
        <S.ResultsWrapper>
          {data?.map((el: SearchAddressResult, index) => (
            <S.Result selectedSection={selectedSection === index} key={el.id} onClick={handleSetAddress(index)}>
              {el.place_name} <S.ElCategory>{el.category_name.split(">").at(-1)}</S.ElCategory>
            </S.Result>
          ))}
        </S.ResultsWrapper>
      ) : (
        isNonResultShow && <S.Result>검색 결과가 없습니다</S.Result>
      )}
    </S.Input>
  );
};

export default SearchInput;
