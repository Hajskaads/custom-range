import s from "./errorMessage.module.css";
import m from "@styles/main.module.css";

interface ErrorMessageProps {
  errorMessage?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => (
  <div className={`${s.root} ${m.centerAligned}`}>
    {errorMessage || "Something went wrong"}
  </div>
);

export default ErrorMessage;
