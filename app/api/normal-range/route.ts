import { NextResponse } from "next/server";

interface DataResponse {
  min: number;
  max: number;
}

/**
 * GET endpoint to fetch the range of the slider.
 *
 * @returns {Promise<NextResponse>} - A promise that resolves to the response object.
 */
export async function GET(): Promise<NextResponse> {
  const data: DataResponse = {
    min: 1,
    max: 100,
  };
  try {
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    // Handle error
    return NextResponse.json({ status: 500, message: "Something went wrong" });
  }
}
