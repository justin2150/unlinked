import styles from './Loader.module.css';
import { Overlay } from './Overlay';

export function Loader({ type = '' }) {
  if (type === 'loader-sm') return <div className={styles['loader-sm']}></div>;
  if (type === 'spinner-arr')
    return <div className={styles['spinner-arr']}></div>;
  if (type === 'spinner') return <div className={styles['spinner']}></div>;
}

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
