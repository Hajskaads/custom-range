import isNumber from "@lib/isNumber";
import {
  NormalSliderResponse,
  ErrorResponse,
  NormalSliderDataOrErrorResponse,
} from "@lib/types";

export default async function getNormalSliderRange(): Promise<NormalSliderDataOrErrorResponse> {
  try {
    const response: Response = await fetch("/api/normal-range", {
      method: "GET",
      cache: "no-store",
    });

    //@ts-ignore
    const { min, max, message }: NormalSliderResponse = await response.json();

    if (
      response.status === 200 &&
      min &&
      max &&
      isNumber(min) &&
      isNumber(max) &&
      max >= min
    ) {
      return { min, max };
    } else {
      // Create an error response
      const errorResponse: ErrorResponse = {
        error: message || "Something went wrong",
      };
      return errorResponse;
    }
  } catch (e: any) {
    // Create an error response
    const errorResponse: ErrorResponse = {
      error: "Something went wrong",
    };
    return errorResponse;
  }
}
