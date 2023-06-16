import {
  NormalSliderResponse,
  ErrorResponse,
  NormalSliderDataOrErrorResponse,
} from "@lib/types";

export default async function getNormalSliderRange(): Promise<NormalSliderDataOrErrorResponse> {
  const response: Response = await fetch("/api/normal-range", {
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
    return errorResponse;
  }
}
