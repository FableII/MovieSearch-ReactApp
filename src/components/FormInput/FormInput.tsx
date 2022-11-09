import { useState } from "react";
import "./FormInput.css";

interface FormInputProps {
  id: number;
  value: string;
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  label: string;
  pattern?: string;
  required: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FormInput = (props: FormInputProps) => {
  const [focus, setFocus] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocus(true);
  };

  return (
    <div className="app__formInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === "confirmPassword" && handleFocus()}
        data-focused={focus.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};
