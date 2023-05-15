import React from "react";
import { useRecoilState } from "recoil";
import { stepState, regionState } from "../data/Atoms";
import { RegionInputs } from "../types/type";

import styled from "@emotion/styled";
import { UpOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 180px;
  margin-left: 25px;

  :hover {
    cursor: pointer;
  }
  .anticon {
    margin-left: 30px;
    svg {
      width: 18px;
    }
  }
`;
const List = styled.ul`
  width: 190px;
  margin-top: 10px;

  li {
    width: 150px;
    margin-top: 4px;
    display: flex;
    div {
      font-size: 14px;
      margin-top: 1.5px;
    }
    justify-content: space-between;
    :hover {
      cursor: pointer;
    }
    span {
      svg {
        width: 14px;
      }
    }
  }
`;

const Container = styled.div`
  position: absolute;
  right: -180px;
  top: 50px;
  z-index: 100;
  display: flex;

  flex-direction: column;
`;

const RegionHistory = () => {
  const [isListShow, setIsListShow] = React.useState(false);
  const [region, setRegion] = useRecoilState(regionState);
  const [step, setStep] = useRecoilState(stepState);
  const [regionList, setRegionList] = React.useState([]);
  React.useEffect(() => {
    setRegionList(JSON.parse(localStorage.getItem("regionHistory") || "[]"));
  }, []);
  const onClickToggle = () => {
    setIsListShow((prev) => !prev);
  };
  const onClickDelete = (index: number) => () => {
    const temp = JSON.parse(localStorage.getItem("regionHistory") || "[]");
    temp.splice(index, 1);
    setRegionList(temp);

    localStorage.setItem("regionHistory", JSON.stringify(temp));
  };
  const onClickRegion = (el: string) => () => {
    if (!el) return;
    setStep(1);
    setRegion({ ...region, name: el, level: el.split(" ").length > 1 ? 8 : 10 });
  };
  return (
    <Container>
      {regionList.length > 0 && (
        <Title onClick={onClickToggle}>
          <span>최근 지역 목록</span>
          {isListShow ? <UpOutlined /> : <DownOutlined />}
        </Title>
      )}
      <List>
        {isListShow &&
          regionList?.map((el: string, index: number) => (
            <li>
              <div onClick={onClickRegion(el)}>{el}</div>
              <span onClick={onClickDelete(index)}>
                <DeleteOutlined />
              </span>
            </li>
          ))}
      </List>
    </Container>
  );
};
export default RegionHistory;
