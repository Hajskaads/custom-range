export type BulletType = "min" | "max";
export type ErrorData = {
  status: number;
  message: string;
};
export type NormalSliderDataResponse = {
  min: number;
  max: number;
};
export type FixedSliderDataResponse = { rangeValues: number[] };
export type ErrorResponse = {
  error: string;
};
export type NormalSliderResponse = {
  min?: number;
  max?: number;
  error?: string;
};
export type NormalSliderDataOrErrorResponse = {
  data: NormalSliderResponse;
};
export type FixedSliderResponse = {
  rangeValues?: number[];
  error?: string;
};
export type FixedSliderDataOrErrorResponse =
  | FixedSliderDataResponse
  | ErrorResponse;
