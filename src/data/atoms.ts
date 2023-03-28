import { atom } from "recoil";

export const stepState = atom({
  key: "stepState",
  default: 0,
});
export const regionState = atom({
  key: "regionState",
  default: {
    x: "",
    y: "",
    name: "",
    level: 3,
  },
});
