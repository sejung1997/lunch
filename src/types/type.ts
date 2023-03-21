export type RegionInputs = {
  doName: string;
  cityName: string;
};

export type DooRegionProps = {
  setCityName: React.Dispatch<React.SetStateAction<string>>;
};
export type optionType = {
  value: string;
  x: number;
  address?: string;
  y: number;
  isNonButton?: boolean;
};
