import { useEffect, useRef, useState } from 'react';
import styles from './FinishPage.module.css';
// import Button from '../components/Button';
export default function Success() {
  const [top, setTop] = useState(0);
  const containerEl = useRef(null);

  useEffect(function () {
    document.body.style.backgroundColor = '#f5f5f5';
  }, []);

  useEffect(function () {
    setTop((window.innerHeight - 500) / 2);
  }, []);
  return (
    <main
      style={{ marginTop: `${top}px` }}
      className={styles.container}
      ref={containerEl}
    >
      <img className={styles.image} src="check.svg" alt="success" />
      <p className={styles.text}>
        Your information has been received successfully. You can now close the
        tab and return to the other screen
      </p>
      {/* <Button type="logout">Logout</Button> */}
    </main>
  );
}
