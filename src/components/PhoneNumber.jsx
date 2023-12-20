import { useEffect, useState } from "react";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { fieldError, updateField } from "../slices/infoSlice";

function PhoneNumber() {
  const [phone, setPhone] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const {
    status,
    fieldError: { phoneError },
  } = useSelector((store) => store.info);

  useEffect(
    function () {
      if (status !== "validate") return;
      if (phone === "") {
        dispatch(fieldError("phone", "This field is required"));
      } else if (
        phone
          .split("")
          .filter((d) => d !== "-" && d !== "(" && d !== ")" && d !== " ")
          .length < 10
      )
        dispatch(fieldError("phone", "Phone number is not valid"));
    },
    [dispatch, phone, status]
  );

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.at(-1)?.match(/[^0-9()-\s]+/g)) return;
    if (val.length > 14) return;
    setPhone(val);
    if (val.length === 3 && val[2] !== "-") setPhone(`(${val.slice()}) `);
    if (val.length === 10 && val[9] !== "-")
      setPhone(val.slice(0, 9) + "-" + val.slice(-1));
    if (val.length === 10 && val.at(9) === "-")
      setPhone((val) => val.slice(0, 9));
    if (val.length === 6 && val.at(5) === " ")
      setPhone((val) => val.slice(1, 4));
    dispatch(updateField("phone", val));
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      value={phone}
      onChange={handleChange}
      error={phoneError}
    >
      Phone Number
    </InputField>
  );
}

export default PhoneNumber;
