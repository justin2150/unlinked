import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import styles from './Button.module.css';

export default function Button({
  children,
  onClick,
  type,
  margin,
  length = 'short',
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[length]} ${styles[type]} ${styles[margin]}`}
    >
      {children}
    </button>
  );
}

export function Buttons({ onClick }) {
  const navigate = useNavigate();
  return (
    <div className={`${styles.buttons}`}>
      {/* <Button onClick={() => navigate('/')} type="back">
        Back
      </Button> */}
      <Button onClick={onClick} type="primary" length="long">
        Submit
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
