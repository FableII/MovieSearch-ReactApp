import "./Button.css";

interface ButtonProps {
    className?: string;
    buttonName?: string;
  }

export const Button = (props: ButtonProps) => {
    const {className, buttonName} = props;
    return (
        <button className={className || 'app__button'}>{buttonName}</button>
    );
  };
  