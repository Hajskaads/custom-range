import {
  ErrorResponse,
  FixedSliderDataOrErrorResponse,
  FixedSliderResponse,
} from "@lib/types";

export default async function getFixedSliderRange(): Promise<FixedSliderDataOrErrorResponse> {
  try {
    const response: Response = await fetch("/api/fixed-range", {
      method: "GET",
      cache: "no-store",
    });

    //@ts-ignore
    const { data, message }: FixedSliderResponse = await response.json();

    if (
      response.status === 200 &&
      Array.isArray(data) &&
      data.length > 0 &&
      data.every((item: number) => typeof item === "number")
    ) {
      return data; // Return the valid response directly
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
