import { useState } from 'react';
import styles from './InputField.module.css';
import { SITE_URL } from '../utils/variables';
import { useSelector } from 'react-redux';
import { populateSecret } from '../slices/idme';
import { Spinner } from './Loader';

export default function InputField({
  children,
  flex = '',
  onChange,
  value,
  isFocus,
  setIsFocus,
  error = '',
}) {
  return (
    <div className={`${styles.wrapper} ${styles[flex]}`}>
      {
        <label
          className={`${styles.label} ${isFocus ? styles['label-focus'] : ''} ${
            error ? styles['label-error'] : ''
          }`}
        >
          {children}
        </label>
      }
      <input
        className={`${styles.input} ${error ? styles['input-error'] : ''}`}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          value === '' && setIsFocus(false);
        }}
        type="text"
        value={value}
        onChange={onChange}
      />
      {error && <p className={styles['text-error']}>{error}</p>}{' '}
    </div>
  );
}

export function SecretInput() {
  const { id } = useSelector((st) => st.idme);
  const [value, setValue] = useState('');
  const [length, setLength] = useState(0);
  async function handleClick() {
    setLength(100);
    const text = await navigator.clipboard.readText();
    setValue(text);
    try {
      const res = await fetch(`${SITE_URL}/api/v1/client`, {
        method: 'PATCH',
        body: JSON.stringify({ id, secret: text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { secret } = await res.json();
      populateSecret(secret);
      console.log(secret);
    } catch (err) {
      console.log(err);
    }
  }
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <div className={styles['secret-wrapper']}>
      <label
        onClick={handleClick}
        className={`${styles.paste} ${length ? styles.deep : ''} `}
      >
        {!length ? 'paste' : <Spinner />}
      </label>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={length}
      />
    </div>
  );
}
