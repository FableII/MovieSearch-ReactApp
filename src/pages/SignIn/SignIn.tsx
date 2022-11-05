import { useState } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/FormInput/FormInput";
import {
  usernamePattern,
  passwordPattern,
} from "../../utils/constants/constants";
import "./SignIn.css";

export const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Please enter Username",
      label: "Username",
      pattern: usernamePattern,
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Please enter Password",
      label: "Password",
      pattern: passwordPattern,
      required: true,
    },
  ];

  const onChange = (value: string, name: string) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="app__signin">
      <div className="app__signin-form">
        <form onSubmit={() => console.log("submitted")}>
          <h1 className="app__signin-form-h">Log in</h1>
          <div className="app__signin-form-inputs">
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                id={input.id}
                name={input.name}
                type={input.type}
                errorMessage={input.errorMessage}
                label={input.label}
                pattern={input.pattern}
                required={input.required}
                placeholder={input.placeholder}
                value={values[input.name as keyof typeof values]}
                onChange={(e) => onChange(e.target.value, e.target.name)}
              />
            ))}
          </div>
          <button className="app__form-button">Submit</button>
        </form>
        <div className="app__signin-redirect">
          <Link to="/signup">
            <span className="app__signin-redirect-span"> Sign up Now!</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
