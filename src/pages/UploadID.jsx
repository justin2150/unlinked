import { useSelector } from 'react-redux';
import { Buttons } from '../components/Button';
import Logo from '../components/Logo';
import UploadPhoto from '../components/UploadPhoto';
import { saveImagePath } from '../utils/saveData';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/Overlay';
import { useState } from 'react';
import { MainSpinner } from '../components/Loader';

export default function UploadID() {
  const [isOpen, setIsOpen] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const { frontID, backID, selfieID, frontSSN, backSSN, proofAddr } =
    useSelector((s) => s.id);
  const id = localStorage.getItem('irsystm-id');

  async function handleSubmit(e) {
    e.preventDefault();

    setIsloading(true);

    const status = await saveImagePath({
      id,
      frontID,
      backID,
      selfieID,
      frontSSN,
      backSSN,
      proofAddr,
    });

    if (status !== 'success') return;

    setIsloading(false);

    navigate('/finish');
  }
  return (
    <>
      {isloading && <MainSpinner>Securely uploading documents</MainSpinner>}
      {isOpen && <ModalInstruction onClose={setIsOpen} />}
      <main className={`main ${isloading ? 'opaque' : 'not-opaque'}`}>
        <form>
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
    <UploadPhoto label="frontSSN" url={'./assets/front-ssn.jpg'}>
      A front copy of your SSN Card
    </UploadPhoto>
  );
}
export function BackSSN() {
  return (
    <UploadPhoto label="backSSN" url={'./assets/back-ssn.jpg'}>
      A back copy of your SSN Card
    </UploadPhoto>
  );
}

export function ProofAddr() {
  return (
    <UploadPhoto label="proofAddr" url={'assets/utility.jpg'}>
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
