import "./SearchInput.css";

interface SearchInputProps {
  value: string;
  placeholder: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput = (props: SearchInputProps) => {
  const { onChange, ...inputProps } = props;

  return (
    <div className="app__SearchInput">
      <input className='app__searchSection-input'
        {...inputProps}
        onChange={onChange}
      />
    </div>
  );
};
