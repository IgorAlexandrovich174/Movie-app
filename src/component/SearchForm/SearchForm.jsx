import debounce from "lodash.debounce";
import InputForm from "../InputForm/InputForm.jsx";
import PropTypes from "prop-types";

export default function SearchForm({ onSubmitForm, setCurrentPage }) {
  const debounceSubmit = debounce((text) => {
    setCurrentPage(1);
    onSubmitForm(text);
  }, 1500);
  return <InputForm debounceSubmit={debounceSubmit} />;
}

SearchForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
