import { ReactNode } from "react";
const Button = ({
  label,
  clickFunction,
  classNames,
  disabled,
}: {
  label: ReactNode | string;
  clickFunction?: () => void;
  classNames: string;
  disabled?: boolean;
}) => {
  return (
    <div>
      <button
        className={classNames}
        disabled={disabled}
        onClick={() => (clickFunction ? clickFunction() : "")}
      >
        {label}
      </button>
    </div>
  );
};
export default Button;
