export type BulletType = "min" | "max";
export type Error = {
  status: number;
  message: string;
};
export type DataResponse = {
  min: number;
  max: number;
  error?: string;
};
export type ErrorResponse = {
  error: string;
};
export type NormalSliderResponse = DataResponse | Error;
export type NormalSliderDataResponse = DataResponse | ErrorResponse;
