import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import { useState } from 'react';

import styles from './IndexPage.module.css';
import { MainSpinner } from '../components/Loader';
import { SITE_URL } from '../utils/variables';
import { Modal } from '../components/Overlay';

export default function IndexPage() {
  const [isloading, setIsloading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isHidden] = useState(true);
  const [queryObj] = useSearchParams();
  const navigate = useNavigate();

  async function handleNavigate() {
    setIsloading(true);
    // 1) Obtain referral url and refferal
    let s = document.referrer;
    if (s) s = new URL(document.referrer).hostname;
    let ref = queryObj.get('ref');

    // 2) Send them to the api
    const res = await fetch(`${SITE_URL}/api/v1/client/referral`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ site: s, referral: ref }),
    });

    // 3) receive response from the api and navigate
    const { status, token } = await res.json();
    if (status !== 'success') return;
    localStorage.setItem('jwtToken', token);
    setIsloading(false);
    navigate('/register');
  }

  function delayNavigate(path) {
    setIsloading(true);
    setTimeout(() => {
      navigate(path);
      setIsloading(false);
    }, 4000);
  }
  return (
    <>
      {isloading && <MainSpinner>Processing your request</MainSpinner>}
      {isOpen && <ModalInstruction onClose={setIsOpen} />}
      <div className={`${styles.box} ${isloading ? 'opaque' : 'not-opaque'}`}>
        <Button onClick={handleNavigate} type="primary">
          Begin a new application
        </Button>
        {!isHidden && (
          <>
            <TextLine>OR</TextLine>
            <Button onClick={() => delayNavigate('/login')} type="primary">
              Proceed with an existing one
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export function TextLine({ children }) {
  return (
    <div className={styles.linetext}>
      <div className={styles.before}></div>
      {children}
      <div className={styles.after}></div>
    </div>
  );
}

function ModalInstruction({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h1>Welcome to the Integrated Ratification System</h1>
      <p>A well proven integrated verification and payment application.</p>
      <p>Kindly click the button below to begin your application.</p>
    </Modal>
  );
}
