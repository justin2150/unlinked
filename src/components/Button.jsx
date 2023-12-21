import { useNavigate } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({ children, onClick, type, margin }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]} ${styles[margin]}`}
    >
      {children}
    </button>
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

export function Buttons({ onClick }) {
  const navigate = useNavigate();
  return (
    <div className={styles.buttons}>
      <Button onClick={() => navigate('/')} type="back">
        Back
      </Button>
      <Button onClick={onClick} type="primary">
        Proceed
      </Button>
    </div>
  );
}
