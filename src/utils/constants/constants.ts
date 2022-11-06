export const USRNPATTERN = "^[A-Za-z0-9]{4,16}$";
export const PSWPATTERN =
  "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$";

export const SIGNUPINPUTS = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "Username",
    errorMessage: "4-16 characters without special symbols !",
    label: "Username",
    pattern: USRNPATTERN,
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
    pattern: PSWPATTERN,
    required: true,
  },
];

export const LOGININPUTS = [
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
    pattern: PSWPATTERN,
    required: true,
  },
];
