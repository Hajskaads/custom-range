interface DataResponse {
  min: number;
  max: number;
}

async function getNormalRangeValues(): Promise<DataResponse> {
  try {
    const response = await fetch("/getNormalRange");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data as DataResponse;
  } catch (error) {
    // Handle error
    throw new Error("Failed to fetch data");
  }
}

export default getNormalRangeValues;
