import { ErrorResponse, FixedSliderResponse } from "@lib/types";

export default async function getFixedSliderRange(): Promise<FixedSliderResponse> {
  try {
    const response: Response = await fetch("/api/fixed-range", {
      method: "GET",
      cache: "no-store",
    });

    const { rangeValues, error }: FixedSliderResponse =
      (await response.json()) as FixedSliderResponse;

    if (
      response.status === 200 &&
      rangeValues &&
      Array.isArray(rangeValues) &&
      rangeValues.length > 0 &&
      rangeValues.every((item: number) => typeof item === "number")
    ) {
      return { rangeValues }; // Return the valid response directly
    } else {
      // Create an error response
      const errorResponse: FixedSliderResponse = {
        error: error || "Something went wrong",
      };
      return errorResponse;
    }
  } catch (e: any) {
    // Create an error response
    const errorResponse: FixedSliderResponse = {
      error: "Something went wrong",
    };
    return errorResponse;
  }
}
