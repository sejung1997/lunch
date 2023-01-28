"use client";
import React from "react";
import produce from "immer";
import styled from "@emotion/styled";
import axios from "axios";
import { debounce } from "lodash";
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
const Input = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  input {
    height: 20px;
    width: 300px;
  }
`;
const ResultsWrapper = styled.div`
  border: 1px solid gray;
  width: 300px;
`;
const Result = styled.div`
  width: 100%;
  border: 1px solid gray;
  display: flex;
  justify-content: space-between;
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
const SearchInput = ({ setOptions }) => {
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState<SearchAddressResult[]>([]);
  console.log(input, "input");
  const onChangeInp = (e) => {
    setInput(e.target.value);
  };

  const handlerSearch = (keyWord: string) => {
    console.log(keyWord);
    return window.kakao.maps.load(() => {
      const Gkakao = window.kakao.maps;
      // 장소 검색 객체를 생성합니다
      const ps = new Gkakao.services.Places();
      console.log(ps);

      const placesSearchCB = (data: unknown, status: string) => {
        switch (status) {
          case Gkakao.services.Status.OK: {
            console.log(data);
            return data;
          }
          case Gkakao.services.Status.ZERO_RESULT: {
            console.log("no results");

            return "no results";
          }
          case Gkakao.services.Status.ERROR: {
            console.log("errora");

            return " error";
          }
        }
      };
      // // 키워드로 장소를 검색합니다
      return ps.keywordSearch(keyWord, placesSearchCB);
    });
  };

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=4e89be21e672c2ea6ecbba62c71fa54a&libraries=services,clusterer&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {};
  }, []);

  const onChangeInput = async (keyword: any) => {
    console.log(keyword, "e");

    const { data } = await instance.get(
      `keyword.json?y=37.51505354009884&x=126.89554077580914&radius=1000&category_group_code=FD6&query=${keyword}`
    );
    // .then((res) => console.log(res, "??"));
    setData(data.documents);
    // console.log(handlerSearch(e));
    // console.log(input, "input");
    // if (e.keyCode === 13) {
    //   setOptions(
    //     produce((draft: string[]) => {
    //       draft.push(input);
    //       return draft;
    //     })
    //   );
    //   setInput("");
    // }
  };
  const addMenu = (value: string, address: string) => () => {
    setOptions(
      produce((draft: string[]) => {
        draft.push(v);
        return draft;
      })
    );
  };
  const keyDownInput = () => {};
  return (
    <Input>
      <h4>식당을 추가해주세요</h4>
      <input
        // value={input}
        onKeyDown={keyDownInput}
        onChange={debounce((e: any) => onChangeInput(e.target.value), 1000)}
      />
      <ResultsWrapper>
        {data?.map((el: SearchAddressResult) => (
          <Result
            key={el.id}
            onClick={addMenu(el.place_name, el.road_address_name)}
          >
            {el.place_name}{" "}
            <ElCategory>{el.category_name.split(">").at(-1)}</ElCategory>
          </Result>
        ))}
      </ResultsWrapper>
    </Input>
  );
};

export default SearchInput;
