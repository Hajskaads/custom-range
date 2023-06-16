import { NormalSliderDataResponse } from "@lib/types";
import { NextResponse } from "next/server";

/**
 * GET endpoint to fetch the range of the slider.
 *
 * @returns {Promise<NextResponse>} - A promise that resolves to the response object.
 */
export async function GET(): Promise<NextResponse> {
  const data: NormalSliderDataResponse = {
    min: 10,
    max: 70,
  };
  try {
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    // Handle error
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
}
