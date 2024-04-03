import { useState } from 'react';
import InputField from './InputField';
import { useDispatch } from 'react-redux';
import { updateField } from '../slices/infoSlice';

function Social() {
  const [SSN, setSSN] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.match(/[^0-9-]+/g)) return;
    if (val.length > 11) return;
    setSSN(val);
    if (val.length === 4 && val[3] !== '-')
      setSSN((val) => val.slice(0, 3) + '-' + val.slice(-1));

    if (val.length === 7 && val[6] !== '-')
      setSSN((val) => val.slice(0, 6) + '-' + val.slice(-1));

    if (val.at(6) === '-' && val.length === 7) setSSN((val) => val.slice(0, 6));

    if (val.at(3) === '-' && val.length === 4) setSSN((val) => val.slice(0, 3));
    dispatch(updateField('SSN', val));
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      onChange={handleChange}
      value={SSN}
    >
      Social Security Number
    </InputField>
  );
}

export default Social;
