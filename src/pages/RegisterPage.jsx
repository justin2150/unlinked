import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { updateStatus } from '../slices/infoSlice';
import Address from '../components/Address';
import { Buttons } from '../components/Button';
import FirstName from '../components/FirstName';
import LastName from '../components/LastName';
import PhoneNumber from '../components/PhoneNumber';
import Social from '../components/Social';
import DateOfBirth from '../components/DateOfBirth';
import { MainSpinner } from '../components/Loader';
import Logo from '../components/Logo';
import { Overlay, Modal } from '../components/Overlay';
import { SITE_URL } from '../utils/variables';
import saveData from '../utils/saveData';
import styles from './RegisterPage.module.css';

export default function LoginPage() {
  const [isOpened, setIsOpened] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    DOB,
    SSN,
    phone,
    address,
    addrError,
    fieldError,
  } = useSelector((store) => store.info);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateStatus('validate'));

    const errors = Object.values({ ...fieldError, ...addrError });
    if (errors.length !== 9 || errors.some((err) => err !== '')) return;

    setIsloading(true);

    const { status, message, token } = await saveData(
      {
        firstName,
        lastName,
        DOB,
        SSN,
        phone,
        address,
      },
      `${SITE_URL}/api/v1/client`
    );
    console.log(status, message, token);

    if (status === 'success' && message === 'request successful') {
      localStorage.setItem('jwtToken', token);
      navigate('/upload-id');
    }
  }
  return (
    <>
      {isOpened && <Modal onClose={setIsOpened} />}
      {isloading && <MainSpinner>Securely logging in</MainSpinner>}
      <main
        className={`main ${isOpened || isloading ? 'opaque' : 'not-opaque'}`}
      >
        <Logo />
        <form className={styles.form}>
          <FirstName />
          <LastName />
          <DateOfBirth />
          <Social />
          <PhoneNumber />
          <Address />
          <Buttons onClick={handleSubmit} />
        </form>
      </main>
    </>
  );
}
