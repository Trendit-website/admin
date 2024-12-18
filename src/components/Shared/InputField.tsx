import Icons from "./Icons";

const InputField = ({
  classNames,
  type,
  placeholder,
  rightIcon,
  leftIcon,
  register,
  id,
  containerStyle,
  value,
}: {
  classNames: string;
  containerStyle?: string;
  type: string;
  placeholder: string;
  rightIcon?: string;
  leftIcon?: string;
  register?: object;
  id?: string;
  value?: string;
}) => {
  return (
    <div
      className={
        containerStyle
          ? containerStyle
          : "flex items-center justify-between px-2 py-2"
      }
    >
      {rightIcon && <Icons type={rightIcon} />}
      <input
        className={classNames}
        placeholder={placeholder}
        type={type}
        value={value}
        id={id}
        {...register}
      />
      {leftIcon && <Icons type={leftIcon} />}
    </div>
  );
};
export default InputField;
