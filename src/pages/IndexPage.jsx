import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useState } from 'react';

import styles from './IndexPage.module.css';
import { MainSpinner } from '../components/Loader';

export default function IndexPage() {
  const [isloading, setIsloading] = useState(false);
  const [isHidden] = useState(true);
  const navigate = useNavigate();

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
        <Button onClick={() => delayNavigate('/register')} type="primary">
          Begin a new application
        </Button>
        {isHidden && (
          <>
            <TextLine>OR</TextLine>
            <Button onClick={() => delayNavigate('/login')} type="primary">
              Proceed with an existing application
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
