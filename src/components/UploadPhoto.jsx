import { useState } from 'react';
import { Spinner } from './Loader';
import { populatePhoto } from '../slices/uploadID';
import { useDispatch } from 'react-redux';
import styles from './UploadPhoto.module.css';

export default function UploadPhoto({ url, children, label }) {
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();

  async function handleChange(e) {
    const file = e.target.files[0];

    setStatus('uploading');
    let data = new FormData();
    data.append('photo', file);
    data = await fetch(`${import.meta.env.VITE_SITE_URL}/api/v1/client/image`, {
      method: 'POST',
      body: data,
    });
    const { path } = await data.json();
    if (path) {
      setStatus('uploaded');
      dispatch(populatePhoto(label, path));
    }
  }

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={styles.card}>
          {status === 'idle' && (
            <>
              <Illustration url={url} label={label} />
              <Label label={label}>choose file</Label>
              <FileInput label={label} onChange={handleChange} />
            </>
          )}
          {status === 'uploading' && (
            <>
              <Illustration url={url} label={label} />
              <Loader>uploading</Loader>
            </>
          )}
          {status === 'uploaded' && (
            <>
              <Uploaded />
              <Label label={label}>choose new file</Label>
              <FileInput label={label} onChange={handleChange} />
            </>
          )}
        </div>
        <p className={`${styles['card--text']}`}>{children}</p>
      </div>
    </>
  );
}

function Illustration({ url, label }) {
  return <img alt={label} className={styles.illustration} src={url} />;
}

function FileInput({ label, onChange }) {
  return (
    <input
      id={label}
      name={label}
      className={styles['file-input']}
      type="file"
      onChange={(e) => onChange(e)}
      multiple={false}
    />
  );
}

function Label({ label, children }) {
  return (
    <label htmlFor={label} className={styles.label}>
      <span>{children}</span>
    </label>
  );
}

function Loader({ children }) {
  return (
    <div className={styles.uploading}>
      <Spinner>{children}</Spinner>{' '}
    </div>
  );
}

function Uploaded() {
  return (
    <div className={styles['card--uploaded']}>
      <div className={styles['uploaded--box']}>
        <p className={styles['uploaded--text']}>Uploaded</p>
        <img
          className={styles['uploaded--icon']}
          alt="success"
          src="check.svg"
        />
      </div>
    </div>
  );
}
