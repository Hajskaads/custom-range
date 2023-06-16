import {
  ErrorResponse,
  FixedSliderDataOrErrorResponse,
  FixedSliderResponse,
} from "@lib/types";

export default async function getFixedSliderRange(): Promise<FixedSliderDataOrErrorResponse> {
  const response: Response = await fetch("/api/fixed-range", {
    method: "GET",
    cache: "no-store",
  });

  const data: FixedSliderResponse = await response.json();

  //@ts-ignore
  if (
    response.status === 200 &&
    Array.isArray(data) &&
    data.length > 0 &&
    data.every((item: number) => typeof item === "number")
  ) {
    //@ts-ignore
    return data; // Return the valid response directly
  } else {
    // Create an error response
    const errorResponse: ErrorResponse = {
      //@ts-ignore
      error: data.message || "Something went wrong",
    };
    //@ts-ignore
    return errorResponse;
  }
}
