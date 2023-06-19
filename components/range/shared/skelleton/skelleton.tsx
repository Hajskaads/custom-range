import { FC } from "react";
import s from "./skelleton.module.css";

interface SkelletonProps {
  isFixedRange?: boolean;
}

const Skelleton: FC<SkelletonProps> = ({ isFixedRange }) => {
  return (
    // <div className={s.pulse}> //TODO: Doesn't work -> Please enable a CSS nesting plugin *before* Tailwind in your configuration.
    <div className="animate-pulse">
      <div className={s.root}>
        <div
          className={`${isFixedRange ? s.fixedLabel : s.inputLabel} ${
            s.leftLabel
          }`}
        />
        <div className={s.container}>
          <div className={s.bullet} />
          <div className={`${s.bullet} ${s.rightBullet}`} />
          <div className={s.line} />
        </div>
        <div
          className={`${isFixedRange ? s.fixedLabel : s.inputLabel} ${
            s.rightLabel
          }`}
        />
      </div>
    </div>
  );
};

export default Skelleton;
