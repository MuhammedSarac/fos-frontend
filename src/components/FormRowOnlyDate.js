import { DatePicker } from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
const FormRowOnlyDate = ({ name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <DatePicker
        id={name}
        value={value}
        onChange={handleChange}
        // className="form-input"
      />
    </div>
  );
};
export default FormRowOnlyDate;
