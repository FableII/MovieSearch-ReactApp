export const USERNAME_PATTERN = "^[A-Za-z0-9]{4,16}$";
export const PASSWORD_PATTERN =
  "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$";

export const SIGNUP_INPUTS = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Username",
    errorMessage: "4-16 characters without special symbols !",
    label: "Username",
    pattern: USERNAME_PATTERN,
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
    pattern: PASSWORD_PATTERN,
    required: true,
  },
];

export const LOGIN_INPUTS = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage: "Please enter Password",
    label: "Password",
    pattern: PASSWORD_PATTERN,
    required: true,
  },
];
