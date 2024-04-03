import { useState } from 'react';
import InputField from './InputField';
import { useDispatch } from 'react-redux';
import { updateField } from '../slices/infoSlice';

function LastName() {
  const [lastName, setLastName] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const val =
      e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1);
    setLastName(val);
    dispatch(updateField('lastName', val));
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      value={lastName}
      onChange={handleChange}
    >
      Last Name
    </InputField>
  );
}

export default LastName;
