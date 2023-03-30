import { atom } from "recoil";

export const stepState = atom({
  key: "stepState",
  default: 0,
});
type RegionState = {
  x: number | null;
  y: number | null;
  name?: string;
  level: number;
};
export const regionState = atom({
  key: "regionState",
  default: {
    x: 0,
    y: 0,
    name: "",
    level: 3,
  },
});
