import { useEffect, useState } from "react";
import InputField from "./InputField";
import FillAddress from "./FillAddress";
import DisplaySuggestions from "./DisplaySuggestions";
import { useDispatch, useSelector } from "react-redux";
import { updateAddr } from "../contexts/InfoContext";
import { addrError } from "../slices/infoSlice";
import { getSuggestions } from "../utils/getSuggestions";

export default function Address() {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [curSug, setCurSug] = useState(null);
  const [showSugs, setShowSugs] = useState(false);
  const [isManual, setIsManual] = useState(false);

  const dispatch = useDispatch();
  const {
    status,
    address,
    addrError: { streetError },
  } = useSelector((store) => store.info);

  // Auto fill street address
  useEffect(
    function () {
      if (curSug !== null) {
        const str = `${curSug.num} ${curSug.name}`;
        setValue(str);
        dispatch(updateAddr("street", str));
      }
    },
    [curSug, dispatch]
  );

  useEffect(
    function () {
      if (status !== "validate") return;
      if (
        address.street === undefined ||
        address.street === "" ||
        address.street === " "
      )
        dispatch(addrError("street", "This field is required"));

      if (address.street !== undefined && !address.street.match(/[A-z]/g))
        dispatch(addrError("street", "Street address is not valid"));
    },
    [address.street, dispatch, status]
  );

  const handleChange = async (e) => {
    setCurSug(null);
    setShowSugs(false);
    setValue(e.target.value);
    dispatch(updateAddr("street", e.target.value));
    if (e.target.value === "" || e.target.value === " ") return;
    if (isManual) return;
    const sugs = await getSuggestions(e.target.value);
    if (sugs.length === 0) return;
    setSuggestions(sugs);
    setShowSugs(true);
  };

  return (
    <>
      <InputField
        isFocus={isFocus}
        setIsFocus={setIsFocus}
        onChange={handleChange}
        value={value}
        error={streetError}
      >
        Street Address
      </InputField>
      {suggestions.length > 0 && showSugs && (
        <DisplaySuggestions
          suggestions={suggestions}
          setCurSug={setCurSug}
          setShowSugs={setShowSugs}
          setIsManual={setIsManual}
        />
      )}
      {showSugs || <FillAddress curSug={curSug} />}
    </>
  );
}
