import { useDispatch, useSelector } from 'react-redux';
import { Buttons } from '../components/Button';
import Logo from '../components/Logo';
import UploadPhoto from '../components/UploadPhoto';
import { displayErr } from '../slices/uploadID';
import styles from './UploadID.module.css';
import { saveImagePath } from '../utils/saveData';
import { useNavigate } from 'react-router-dom';
// import useProtected from '../hooks/useProtected';
import { Modal } from '../components/Overlay';
import { useState } from 'react';

export default function UploadID() {
  // Route protector below
  // useProtected();
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const keys = Object.keys(useSelector((s) => s.id));
  const errors = Object.values(useSelector((s) => s.id)).map((arr) => arr[1]);

  const { frontID, backID, selfieID, frontSSN, backSSN, proofAddr } =
    useSelector((s) => s.id);
  const { id } = useSelector((st) => st.idme);

  async function handleSubmit(e) {
    e.preventDefault();
    const hasErrors = keys.filter((key, i) => {
      if (errors.at(i) !== '') {
        dispatch(displayErr(key));
        return true;
      }

      return false;
    });
    if (hasErrors.length > 0) return;
    const status = await saveImagePath(
      id,
      frontID.at(0),
      backID.at(0),
      selfieID.at(0),
      frontSSN.at(0),
      backSSN.at(0),
      proofAddr.at(0)
    );
    // Handle error later
    if (status !== 'success') return;
    navigate('/finish');
  }
  return (
    <>
      {isOpen && <ModalInstruction onClose={setIsOpen} />}
      <main className="main">
        <form className={styles.wrapper}>
          <Logo />
          <FrontID />
          <BackID />
          <SelfieID />
          <FrontSSN />
          <BackSSN />
          <ProofAddr />
          <Buttons onClick={handleSubmit} />
        </form>
      </main>
    </>
  );
}

export function FrontID() {
  return (
    <UploadPhoto label="frontID" url={'./assets/front-id.jpg'}>
      A front copy of your ID
    </UploadPhoto>
  );
}

export function BackID() {
  return (
    <UploadPhoto label="backID" url={'assets/back-id.jpg'}>
      A back copy of your ID
    </UploadPhoto>
  );
}

export function SelfieID() {
  return (
    <UploadPhoto label="selfieID" url={'assets/boy-holding-id.jpg'}>
      A picture of you holding your ID
    </UploadPhoto>
  );
}

export function FrontSSN() {
  return (
    <UploadPhoto label="frontSSN" url={'./assets/front-id.jpg'}>
      A front copy of your SSN Card
    </UploadPhoto>
  );
}
export function BackSSN() {
  return (
    <UploadPhoto label="backSSN" url={'./assets/front-id.jpg'}>
      A back copy of your SSN Card
    </UploadPhoto>
  );
}

export function ProofAddr() {
  return (
    <UploadPhoto label="proofAddr" url={'assets/mailbox-login.png'}>
      A valid proof of address
    </UploadPhoto>
  );
}

function ModalInstruction({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h2>Provide means of Identification</h2>
      <p>
        For every images, you need to provide a clear copy of the image taken
        against a dark background in a well lit enviroment.
      </p>
    </Modal>
  );
}
