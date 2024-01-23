import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import { useState } from 'react';

import styles from './IndexPage.module.css';
import { MainSpinner } from '../components/Loader';
import { SITE_URL } from '../utils/variables';

export default function IndexPage() {
  const [isloading, setIsloading] = useState(false);
  const [isHidden] = useState(true);
  const [queryObj] = useSearchParams();
  const navigate = useNavigate();

  console.log(document.referrer);

  async function handleNavigate() {
    // 1) Obtain referral url and refferal
    let s = document.referrer;
    if (s)
      s = new URL(document.referrer).hostname
        .replace('www.', '')
        .replace('app.', '');
    let ref = queryObj.get('ref');
    console.log(ref, s);

    // 2) Send them to the api
    // const res = await fetch(`${SITE_URL}/api/v1/client`);
    // 3) receive response from the api and navigate
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
