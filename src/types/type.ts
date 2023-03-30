export type RegionInputs = {
  x: number | null;
  y: number | null;
  name?: string;
  level?: number;
};

export type DooRegionProps = {
  setCityName: React.Dispatch<React.SetStateAction<string>>;
  onMouseEnter: (event: any) => void;
};
export type optionType = RegionInputs & {
  address_name?: string;
  isNonButton?: boolean;
};
export type ButtonName = "돌리기!" | "다시 돌리기!" | "멈추기!";
