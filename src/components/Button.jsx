import { useNavigate } from 'react-router-dom';
import styles from './Button.module.css';
import { useRef, useState } from 'react';

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

const copyText = async (text) => {
  if ('clipboard' in navigator) await navigator.clipboard.writeText(text);
  else document.execCommand('copy', true, text);
};

export function CopyTo({ text = 'Default text' }) {
  const [isCopied, setIsCopied] = useState(false);
  const informEl = useRef(null);

  function handleClick() {
    copyText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }

  return (
    <>
      {isCopied && (
        <span ref={informEl} className={styles.inform}>
          Copied
        </span>
      )}
      <img onClick={handleClick} className={styles.copy} src="copy.svg" />
    </>
  );
}
