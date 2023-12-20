import { useEffect, useState } from "react";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { fieldError, updateField } from "../slices/infoSlice";

function DateOfBirth() {
  const [DOB, setDOB] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const {
    status,
    fieldError: { DOBError },
  } = useSelector((store) => store.info);

  useEffect(
    function () {
      if (status !== "validate") return;
      if (DOB === "") {
        dispatch(fieldError("DOB", "This field is required"));
      } else if (DOB.split("").filter((d) => d !== "-").length < 8)
        dispatch(fieldError("DOB", "Date of birth is not valid"));
    },
    [DOB, dispatch, status]
  );

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.match(/[^0-9-]+/g)) return;
    if (val.length > 10) return;
    setDOB(val);

    if (val.length < 2 || val.length === 2) {
      let v = val;
      if (Number(val.at(0)) > 1) v = val.padStart(2, 0);
      if (Number(val) > 12) v = 12;
      setDOB(v);
    }
    if (val.length === 3) {
      let v = val.at(2);
      if (Number(v) > 3) v = v.padStart(2, 0);
      setDOB(`${val.slice(0, 2)}-${v}`);
    }
    if (val.length === 5) {
      let v = val.slice(3);
      if (Math.abs(Number(v)) > 31) v = 31;
      setDOB(`${val.slice(0, 2)}-${v}`);
    }
    if (val.length === 6) {
      setDOB(`${val.slice(0, 2)}-${val.slice(3, 5)}-${val.slice(-1)}`);
    }
    if (val.length === 6 && val.at(-1) === "-")
      setDOB(`${val.slice(0, 2)}-${val.slice(3, 5)}`);
    if (val.length === 3 && val.at(-1) === "-") setDOB(`${val.slice(0, 2)}`);
    dispatch(updateField("DOB", val));
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      value={DOB}
      onChange={handleChange}
      error={DOBError}
    >
      Date Of Birth
    </InputField>
  );
}

export default DateOfBirth;
