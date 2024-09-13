import Icons from "./Icons";

const InputField = ({
  classNames,
  type,
  placeholder,
  rightIcon,
  leftIcon,
  register,
  id
}: {
  classNames: string;
  type: string;
  placeholder: string;
  rightIcon?: string;
  leftIcon?: string;
  register: object,
  id?: string
}) => {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      {rightIcon && <Icons type={rightIcon} />}
      <input className={classNames} placeholder={placeholder} type={type} {...register}/>
      {leftIcon && <Icons type={leftIcon} />}
    </div>
  );
};
export default InputField;
