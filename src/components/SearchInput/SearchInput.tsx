import "./SearchInput.css";

interface Props {
  value: string;
  placeholder?: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput = (props: Props) => {
  const { onChange, ...inputProps } = props;

  return (
    <div className="app__searchSection">
      <input
        className="app__searchSection-input"
        {...inputProps}
        onChange={onChange}
      />
    </div>
  );
};
