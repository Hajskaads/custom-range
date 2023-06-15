import { NextApiRequest, NextApiResponse } from "next";

interface DataResponse {
  min: number;
  max: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>
) {
  const data: DataResponse = {
    min: 1,
    max: 100,
  };

  res.status(200).json(data);
}
