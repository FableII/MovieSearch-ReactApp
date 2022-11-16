import "./Button.css";

interface Props {
  className?: string;
  buttonName?: string;
}

export const Button = (props: Props) => {
  const { className, buttonName } = props;
  return <button className={className || "app__button"}>{buttonName}</button>;
};
