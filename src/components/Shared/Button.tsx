const Button = ({
  label,
  clickFunction,
  classNames,
}: {
  label: string;
  clickFunction?: () => void;
  classNames: string;
}) => {
  return (
    <div>
      <button
        className={classNames}
        onClick={() => (clickFunction ? clickFunction() : "")}
      >
        {label}
      </button>
    </div>
  );
};
export default Button;
