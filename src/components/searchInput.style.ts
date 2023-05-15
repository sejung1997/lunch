import styled from "@emotion/styled";
type ResultType = {
  selectedSection?: boolean;
};
export const Input = styled.div`
  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  /* padding: 10px; */
  /* top: 100px; */
  left: calc(50% - 150px);
  height: 100px;
  top: 80px;
  input {
    margin-top: 10px;
    height: 30px;
    width: 300px;
  }
  h4 {
    font-size: 18px;
  }
`;
export const ResultsWrapper = styled.div`
  border: 1px solid gray;
  position: absolute;
  top: 60px;
  z-index: 3;
  background-color: #fff;
  width: 300px;
`;
export const Result = styled.div`
  width: 100%;
  border: 1px solid gray;
  display: flex;
  justify-content: space-between;
  background-color: ${({ selectedSection }: ResultType) => (selectedSection ? "yellow" : "")};
`;
export const ElCategory = styled.span`
  font-size: 10px;
`;
