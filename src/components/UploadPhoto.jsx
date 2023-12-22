import { useEffect, useRef, useState } from 'react';
import { SITE_URL } from '../utils/variables';
import { Spinner } from './Loader';
import styles from './UploadPhoto.module.css';

export default function UploadPhoto({ illustration, children, label }) {
  const [url, setUrl] = useState(() => illustration);
  const [isUploading, setIsUploading] = useState(false);
  const image = useRef(null);

  useEffect(
    function () {
      if (!isUploading || url === illustration) return;

      const handler = () => setIsUploading(false);
      // WAS FORCED BY VSCODE TO CREATE A COPY OF THE REF
      const refCopy = image.current;

      image.current.addEventListener('load', handler);
      return () => refCopy.removeEventListener('load', handler);
    },
    [illustration, isUploading, url]
  );
  async function handleChange(e) {
    setIsUploading((v) => !v);
    let data = new FormData();
    data.append('front-id', e.target.files[0]);
    data = await fetch(`${SITE_URL}/api/v1/client/upload`, {
      method: 'POST',
      body: data,
    });
    const { path } = await data.json();
    if (path) setUrl(`${SITE_URL}/${path}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <img className={styles.image} src={url} ref={image} />
        {/* <embed
          src={`${SITE_URL}/uploads/1703257944005.pdf`}
          type="application/pdf"
        /> */}
        {isUploading ? (
          <div className={styles.uploading}>
            <Spinner>uploading</Spinner>{' '}
          </div>
        ) : (
          <FileInput label={label} onChange={handleChange} />
        )}
      </div>
      <p className={styles.text}>{children} </p>
    </div>
  );
}

// export function UploadDocs() {

// }

function FileInput({ label, onChange }) {
  return (
    <label htmlFor={label} className={styles.custom}>
      <input
        id={label}
        name={label}
        className={styles.file}
        type="file"
        onChange={(e) => onChange(e)}
      />
      <span>Choose file</span>
    </label>
  );
}
