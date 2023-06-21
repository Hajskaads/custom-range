import { useEffect, useState } from "react";
import { FixedSliderResponse, NormalSliderResponse } from "./types";
import getFixedSliderRange from "@services/getFixedSliderRange";
import getNormalSliderRange from "@services/getNormalSliderRange";

export function useFetch(isFixedRange: boolean) {
  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);
  const [rangeValues, setRangeValues] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        if (isFixedRange) {
          const { rangeValues, error }: FixedSliderResponse =
            await getFixedSliderRange();
          if (error) {
            setError(error);
          } else if (rangeValues) {
            const newMin = Math.min(...rangeValues);
            const newMax = Math.max(...rangeValues);
            setRangeValues(rangeValues);
            setMin(newMin);
            setMax(newMax);
          }
        } else {
          const { min, max, error }: NormalSliderResponse =
            await getNormalSliderRange();
          if (error) {
            setError(error);
          } else if (min && max) {
            setMin(min);
            setMax(max);
          }
        }
      } catch (err: any) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, [isFixedRange]);

  return { min, max, rangeValues, error, loading };
}
