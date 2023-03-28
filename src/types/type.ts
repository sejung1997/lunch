export type RegionInputs = {
  x: string;
  y: string;
  name: string;
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
