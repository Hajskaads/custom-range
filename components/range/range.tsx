"use client";

import { Suspense } from "react";
import FixedRange from "./fixedRange";
import NormalRange from "./normalRange";
import Skelleton from "./shared/skelleton";

interface RangeProps {
  isFixedRange?: boolean;
}

// TODO: Suspense no funciona como se espera, primero se muestra el componente con el state por default, luego el Skelleton y luego el componente con el state actualizado
const Range: React.FC<RangeProps> = async ({ isFixedRange }) => {
  return isFixedRange ? (
    <Suspense fallback={<Skelleton isFixedRange={true} />}>
      <FixedRange />
    </Suspense>
  ) : (
    <Suspense fallback={<Skelleton />}>
      <NormalRange />
    </Suspense>
  );
};

export default Range;
