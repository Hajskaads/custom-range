import {
  NormalSliderDataResponse,
  NormalSliderResponse,
  ErrorResponse,
} from "@lib/types";

export default async function getFixedSliderRange(): Promise<NormalSliderDataResponse> {
  const response: Response = await fetch("/api/fixed-range", {
    method: "GET",
    cache: "no-store",
  });

  const data: NormalSliderResponse = await response.json();

  //@ts-ignore
  if (response.status === 200 && data.min && data.max) {
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
