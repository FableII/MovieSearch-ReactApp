import "./Button.css";

interface Props {
  className?: string;
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const Button = (props: Props) => {
  const { className, buttonName, onClick } = props;
  return (
    <button onClick={onClick} className={className || "app__button"}>
      {buttonName}
    </button>
  );
};
