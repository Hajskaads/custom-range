"use client";

import FixedRange from "./fixedRange";
import NormalRange from "./normalRange";

interface RangeProps {
  isFixedRange?: boolean;
}

const Range: React.FC<RangeProps> = ({ isFixedRange }) => {
  return isFixedRange ? <FixedRange /> : <NormalRange />;
};

export default Range;
