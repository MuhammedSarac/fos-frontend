import { DateTimePicker } from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
const FormRowDate = ({ name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <DateTimePicker
        id={name}
        value={value}
        onChange={handleChange}
        // className="form-input"
      />
    </div>
  );
};
export default FormRowDate;
