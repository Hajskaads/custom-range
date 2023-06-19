import isNumber from "@lib/isNumber";
import { NormalSliderResponse } from "@lib/types";

export default async function getNormalSliderRange(): Promise<NormalSliderResponse> {
  try {
    const response: Response = await fetch("/api/normal-range", {
      method: "GET",
      cache: "no-store",
    });

    const { min, max, error }: NormalSliderResponse =
      (await response.json()) as NormalSliderResponse;
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
      const errorResponse: NormalSliderResponse = {
        error: error || "Something went wrong",
      };
      return errorResponse;
    }
  } catch (e: any) {
    // Create an error response
    const errorResponse: NormalSliderResponse = {
      error: "Something went wrong",
    };
    return errorResponse;
  }
}
