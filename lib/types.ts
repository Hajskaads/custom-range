export type BulletType = "min" | "max";
export type Error = {
  status: number;
  message: string;
};
export type NormalSliderDataResponse = {
  min: number;
  max: number;
};
export type FixedSliderDataResponse = number[];
export type ErrorResponse = {
  error: string;
};
export type NormalSliderResponse = NormalSliderDataResponse | Error;
export type FixedSliderResponse = FixedSliderDataResponse | Error;
export type NormalSliderDataOrErrorResponse =
  | NormalSliderDataResponse
  | ErrorResponse;
export type FixedSliderDataOrErrorResponse =
  | FixedSliderDataResponse
  | ErrorResponse;
