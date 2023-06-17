import { FC } from "react";
import s from "./skelleton.module.css";

const Skelleton: FC = () => {
  return <div className={`${s.bullet}`} />;
};

export default Skelleton;
