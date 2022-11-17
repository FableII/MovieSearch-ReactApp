import PropTypes from "prop-types";
import "./SectionHeader.css";

interface Prop {
  text: string;
}

export const SectionHeader = ({ text }: Prop) => {
  return (
    <div className="app__header">
      <h1 className="app__header-text"> {text} </h1>
    </div>
  );
};

SectionHeader.propTypes = {
  text: PropTypes.string,
};
