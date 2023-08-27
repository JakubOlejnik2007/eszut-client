import Form from "react-bootstrap/Form";
import { IFormInputComponentProps } from "../../types/input";
import TFormNames from "../../types/form-inputs-names";

const FormInput: React.FC<IFormInputComponentProps<TFormNames>> = (props) => {
  const { label, onChange, id, type, options, ...inputProps } = props;

  let controlProps: any = {
    id: String(id),
    onChange,
    required: true,
  };

  if (type === "textarea") {
    controlProps.as = "textarea";
  } else if (type === "select") {
    controlProps.as = "select";
  } else {
    controlProps.type = type;
  }

  return (
    <Form.Group className='m-1'>
      <Form.Label htmlFor={String(id)}>{label}</Form.Label>
      {type === "select" ? (
        <Form.Select {...controlProps} {...inputProps}>
          {options &&
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </Form.Select>
      ) : (
        <Form.Control {...controlProps} {...inputProps} />
      )}
    </Form.Group>
  );
};

export default FormInput;
