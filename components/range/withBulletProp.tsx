import React from "react";
import { BulletType } from "@lib/types";

const withBulletProp =
  (bulletType: BulletType) => (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => <WrappedComponent {...props} bullet={bulletType} />;
  };

export default withBulletProp;
