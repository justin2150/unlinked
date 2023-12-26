import styles from './Loader.module.css';
import { Overlay } from './Overlay';

export function MainSpinner({ children }) {
  return (
    <>
      <Overlay />
      <div className={styles['spinner-box']}>
        <div className={`${styles.spinner} ${styles.center}`}></div>
        <p className={styles['text']}>{children}</p>
      </div>
    </>
  );
}

export function Spinner({ children }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{children}</p>
      <div className={styles['spinner-sm']}></div>
    </div>
  );
}

export function Loader() {
  return (
    <div className={styles['loader-wrapper']}>
      <div className={styles.loader}></div>
    </div>
  );
}
