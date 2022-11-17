import PropTypes from "prop-types";
import "./SectionHeader.css";

export const SectionHeader = ({ text }: Record<any, any>) => {
  return (
    <div className="app__header">
      <h1 className="app__header-text"> {text} </h1>
    </div>
  );
};

SectionHeader.propTypes = {
  text: PropTypes.string,
};
