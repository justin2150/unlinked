import { useState } from 'react';
import InputField from './InputField';
import { useDispatch } from 'react-redux';
import { updateField } from '../slices/infoSlice';

function PhoneNumber() {
  const [phone, setPhone] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.value === '') return setPhone(value);

    const replace = (inp) => inp.replace(/[^0-9]/g, '');
    const evalChar = (inp) => inp.match(/[^0-9]/g);

    if (value.at(-1)?.match(/[^0-9()-\s]+/g)) return;
    if (replace(value).length > 10) return;

    setPhone(value);

    if (replace(value).length === 3 && evalChar(value) === null)
      setPhone(`(${value.slice()}) `);

    if (replace(value).length === 4 && evalChar(value) === null)
      setPhone(`(${value.slice(0, 3)}) ${value.at(-1)}`);

    if (replace(value).length === 7 && evalChar(value.at(-1)) === null)
      setPhone(value.slice(0, 9) + '-' + value.slice(-1));

    if (evalChar(value.at(-1)) !== null) {
      evalChar(value.at(-1)).some((i) => i === '-')
        ? setPhone((val) => val.slice(0, 9))
        : setPhone((val) => val.slice(1, 4));
    }
    dispatch(updateField('phone', value));
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      value={phone}
      onChange={handleChange}
    >
      Phone Number
    </InputField>
  );
}

export default PhoneNumber;
