import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { populateMail } from '../slices/idme';
import { CopyTo } from './Button';
import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from './Instruction';
import { Spinner } from './Loader';
import styles from './Mailbox.module.css';

export default function Mailbox() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const { id } = useSelector((st) => st.idme);

  useEffect(
    function () {
      async function createMailbox() {
        const res = await fetch(
          `${import.meta.env.VITE_SITE_URL}/api/v1/mailbox`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              id,
              password: import.meta.env.VITE_MAILBOX_PASSWORD,
              domain: import.meta.env.VITE_MAILBOX_DOMAIN,
            }),
          }
        );
        if (res.status !== 200) return;
        const { email } = await res.json();
        setEmail(email);
        dispatch(populateMail(email));
      }
      createMailbox();
    },
    [dispatch, id]
  );
  return (
    <li>
      <Instruction>
        <StyledNum>1</StyledNum>
        <Text>
          <DisplayInstruction />
          <DisplayMailBox email={email} />
          <DisplayPassword />
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/mailbox-login.png'} />
    </li>
  );
}

function DisplayInstruction() {
  return (
    <p>
      Click and open the{' '}
      <a
        target="_blank"
        href={`https://box.${import.meta.env.VITE_MAILBOX_DOMAIN}/mail`}
        rel="noreferrer"
      >
        link{' '}
      </a>
      in a new browser tab and login to your assigned mail account with the
      credentials below.
    </p>
  );
}

function DisplayMailBox({ email }) {
  return (
    <div className={styles.mailbox}>
      <strong>Email: {email ? email : <Spinner />} </strong>
      {<CopyTo text={email} />}
    </div>
  );
}

function DisplayPassword() {
  return (
    <div className={styles.password}>
      <strong>Password: {import.meta.env.VITE_MAILBOX_PASSWORD} </strong>
      {<CopyTo text={import.meta.env.VITE_MAILBOX_PASSWORD} />}
    </div>
  );
}
