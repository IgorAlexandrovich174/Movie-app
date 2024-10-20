import { Input, Form } from "antd";
import PropTypes from "prop-types";

export default function InputForm({ debounceSubmit }) {
  return (
    <Form
      onValuesChange={(text) => {
        debounceSubmit(text.searchInput);
      }}
    >
      <Form.Item name="searchInput">
        <Input placeholder="Type to search..." style={{ marginBottom: 35 }} />
      </Form.Item>
    </Form>
  );
}

InputForm.propTypes = {
  debounceSubmit: PropTypes.func.isRequired,
};
