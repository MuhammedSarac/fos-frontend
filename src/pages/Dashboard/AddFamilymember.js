import { useState } from "react";
import { FormRow, FormRowOnlyDate } from "../../components";
import Wrapper from "../../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerFamilymember } from "../../features/familyMember/familymemberSlice";

const initialState = {
  name: "",
  birthday: new Date(),
};

function AddFamilymember() {
  const [values, setValues] = useState(initialState);
  const { isLoading } = useSelector((store) => store.familymember);
  const family = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const HandleDateBirthday = (e) => {
    setValues({ ...values, birthday: e });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, birthday } = values;
    const familyId = family.id;

    if (!name || !birthday) {
      toast.error("Please fill out all fields");
      return;
    }
    dispatch(registerFamilymember({ name, birthday, familyId: familyId }));
  };

  return (
    <Wrapper className="full-page" style={{ marginTop: "-200px" }}>
      <form className="form" onSubmit={onSubmit}>
        {/* <Logo /> */}
        <h3>{values.isMember ? "Logind" : "Register"}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* birthday field */}
        <FormRowOnlyDate
          name="birthday"
          labelText="birthday"
          value={values.birthday}
          handleChange={HandleDateBirthday}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
      </form>
    </Wrapper>
  );
}
export default AddFamilymember;
