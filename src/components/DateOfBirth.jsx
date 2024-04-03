import { useState } from 'react';
import InputField from './InputField';
import { useDispatch } from 'react-redux';
import { updateField } from '../slices/infoSlice';

export default function DateOfBirth() {
  const [DOB, setDOB] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

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
    if (val.length === 6 && val.at(-1) === '-')
      setDOB(`${val.slice(0, 2)}-${val.slice(3, 5)}`);
    if (val.length === 3 && val.at(-1) === '-') setDOB(`${val.slice(0, 2)}`);
    dispatch(updateField('DOB', val));
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      value={DOB}
      onChange={handleChange}
    >
      Date Of Birth
    </InputField>
  );
}

export function BirthYear() {
  const [year, setYear] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  function handleChange(e) {
    const val = e.target.value;
    if (val.match(/[^0-9]+/g)) return;
    if (val.length > 4) return;
    setYear(val);
  }
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      value={year}
      onChange={handleChange}
    >
      Year of birth
    </InputField>
  );
}
