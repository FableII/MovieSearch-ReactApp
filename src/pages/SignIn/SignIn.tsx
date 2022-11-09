import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormInput } from "../../components/FormInput/FormInput";
import { signIn } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { LOGIN_INPUTS } from "../../utils/constants/constants";
import "./SignIn.css";

export const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const checkUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      let checkEmail = user[values.email as keyof typeof user]["email"];

      if (
        checkEmail &&
        values.password === user[values.email as keyof typeof user]["password"]
      ) {
        dispatch(signIn(values.email));

        navigate("/");
      } else {
        alert("Invalid password.");
      }
    } catch (err) {
      alert("User doesn't exist.");
    }
  };

  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <div className="app__signin">
      <div className="app__signin-form">
        <form onSubmit={checkUser}>
          <h1 className="app__signin-form-h">Log in</h1>
          <div className="app__signin-form-inputs">
            {LOGIN_INPUTS.map((input) => (
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
                onChange={onChange}
              />
            ))}
          </div>
          <button className="app__form-button">Login</button>
        </form>
        <div className="app__signin-redirect">
          <Link to="/signup">
            <span className="app__signin-redirect-span">Sign up Now!</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
