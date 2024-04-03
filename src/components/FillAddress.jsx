import { useEffect, useState } from 'react';
import useStates from '../hooks/useStates';

import InputField from './InputField';
import SelectField from './SelectField';
import { useDispatch } from 'react-redux';
import { updateAddr } from '../slices/infoSlice';

export default function FillAddress({ curSug }) {
  return (
    <>
      <Line2 />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <City curSug={curSug} />
        <State curSug={curSug} />
        <ZipCode curSug={curSug} />
      </div>
    </>
  );
}

function Line2() {
  const [line2, setLine2] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase();
    setLine2(val);
    dispatch(updateAddr('line2', val));
  };

  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      onChange={handleChange}
      value={line2}
    >
      Apt, Suite, P.O.box (Optional)
    </InputField>
  );
}

function City({ curSug }) {
  const [isFocus, setIsFocus] = useState(false);
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  useEffect(
    function () {
      if (curSug !== null) {
        setCity(curSug.city);
        dispatch(updateAddr('city', curSug.city));
        setIsFocus(true);
      }
    },
    [curSug, dispatch]
  );

  const handleChange = (e) => {
    setCity(e.target.value);
    dispatch(updateAddr('city', e.target.value));
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      onChange={handleChange}
      value={city}
      flex="flex-4"
    >
      City
    </InputField>
  );
}

export function State({ curSug }) {
  const [state, setState] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  // Custom hook below froms useStates
  const states = useStates();
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (curSug !== null) {
        setState(curSug.stateCode);
        setIsFocus(true);
        dispatch(updateAddr('state', curSug.stateCode));
      }
    },
    [curSug, dispatch]
  );
  const handleChange = (e) => {
    setState(e.target.value);
    dispatch(updateAddr('state', e.target.value));
  };
  return (
    <SelectField
      onChange={handleChange}
      value={state}
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      data={states}
      flex="flex-3"
    >
      State
    </SelectField>
  );
}

function ZipCode({ curSug }) {
  const [isFocus, setIsFocus] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (curSug === null) return;
      setZipCode(curSug.zipCode);
      setIsFocus(true);
      dispatch(updateAddr('zipCode', curSug.zipCode));
    },
    [curSug, dispatch]
  );

  const handleChange = (e) => {
    setZipCode(e.target.value);
    dispatch(updateAddr('zipCode', e.target.value));
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      onChange={handleChange}
      value={zipCode}
      flex="flex-3"
    >
      Zip Code
    </InputField>
  );
}
