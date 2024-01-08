import { Spinner } from './Loader';
import styles from './InputField.module.css';

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

export function PasteInput({ value, handleClick, status }) {
  console.log();
  return (
    <>
      <div className={styles['paste-wrapper']}>
        {status === 'loading' && <PasteLoader />}
        {status === 'success' && <PasteSuccess />}
        {status !== 'loading' && status !== 'success' && (
          <PasteLabel onClick={handleClick} />
        )}
        <Input value={value} />
      </div>
      {status === 'error' && (
        <Inform status="error">Invalid secret key, please try again</Inform>
      )}
      {status === 'success' && (
        <Inform status="success">
          Success! secret key registered successfully
        </Inform>
      )}
    </>
  );
}

function Input({ value }) {
  return (
    <input className={styles.input} type="text" value={value} disabled={true} />
  );
}

function PasteLabel({ onClick }) {
  return (
    <label onClick={onClick} className={styles.paste}>
      paste
    </label>
  );
}

function PasteLoader() {
  return (
    <div className={`${styles.paste} ${styles.loader}`}>
      <Spinner />
    </div>
  );
}

function PasteSuccess() {
  return (
    <div className={`${styles.paste} ${styles.loader} ${styles.success}`}>
      <img className={styles['success-img']} src="check.svg" />
    </div>
  );
}

function Inform({ status, children }) {
  return (
    <p className={status === 'success' ? styles.success : styles.error}>
      {children}
    </p>
  );
}
