import { useState } from 'react';
import styles from './UploadPhoto.module.css';

const BASEURL = `http://localhost:8080`;

export default function UploadPhoto({
  illustration,
  children,
  label,
  type = 'image/*',
}) {
  const [url, setUrl] = useState(() => illustration);

  async function handleChange(e) {
    let data = new FormData();
    data.append('front-id', e.target.files[0]);
    data = await fetch(`${BASEURL}/api/v1/client/upload`, {
      method: 'POST',
      body: data,
    });
    const { path } = await data.json();
    path && setUrl(`${BASEURL}/${path}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <img className={styles.image} src={url} />
        <label htmlFor={label} className={styles.custom}>
          <input
            id={label}
            name={label}
            className={styles.file}
            type="file"
            accept={type}
            onChange={(e) => handleChange(e)}
          />
          Choose file
        </label>
      </div>
      <p className={styles.text}>{children} </p>
    </div>
  );
}
