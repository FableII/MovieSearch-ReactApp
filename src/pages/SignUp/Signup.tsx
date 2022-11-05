import { useState } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/FormInput/FormInput";
import "./Signup.css";

export const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "4-16 characters without special symbols !",
      label: "Username",
      pattern: "^[A-Za-z0-9]{4,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Enter a valid email address !",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "At least one number and symbol !",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match !",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  /*  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
      isAuth: false,
      favorites: [],
      historySearch: [],
    };

    dispatch(addUser(newUser));
    navigate('/signin');
  }; */

  const onChange = (value: string, name: string) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="app__signup">
      <div className="app__signup-form">
        <form onSubmit={/* handleSubmit */ () => console.log("submitted")}>
          <h1 className="app__signup-form-h">
            Ready to watch ? <br /> Create your membership
          </h1>
          <div>
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
        <div className="app__signup-redirect">
          <p className="app__signup-redirect-p">
            Already a member?
            <Link to="/signin">
              <span className="app__signup-redirect-span"> Log In Now!</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
