import { useDispatch, useSelector } from 'react-redux';
import InputField from './InputField';
import { useEffect, useState } from 'react';
import { fieldError, updateField } from '../slices/infoSlice';

export default function FirstName() {
  const [firstName, setfirstName] = useState('');
  const [isFocus1, setIsFocus1] = useState(false);
  const dispatch = useDispatch();
  const {
    status,
    fieldError: { firstNameError },
  } = useSelector((store) => store.info);

  useEffect(
    function () {
      if (status !== 'validate') return;
      if (firstName === '')
        dispatch(fieldError('firstName', 'This field is required'));
    },
    [status, firstName, dispatch]
  );

  const handleChange1 = (e) => {
    const val =
      e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1);
    setfirstName(val);
    dispatch(updateField('firstName', val));
  };
  return (
    <InputField
      isFocus={isFocus1}
      setIsFocus={setIsFocus1}
      value={firstName}
      onChange={handleChange1}
      error={firstNameError}
    >
      First Name
    </InputField>
    // </div>
  );
}
