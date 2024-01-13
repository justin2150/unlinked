import { useCallback, useEffect, useRef, useState } from 'react';
import Instruction, { Illustration, StyledNum, Text } from './Instruction';
import { useSelector } from 'react-redux';
import useScrollIntoview from '../hooks/scrollView';
import styles from './GenerateCode.module.css';

const { totp } = window.otplib;

export default function GenerateCode() {
  const { secret } = useSelector((st) => st.idme);
  const [token, setToken] = useState('');
  const [runIn, setRunIn] = useState(0);

  const listEl = useRef(null);
  // Scroll Code generator into view once secret is set
  useScrollIntoview(secret, listEl);

  const resetCode = useCallback(() => {
    setToken(totp.generate(secret));
    setRunIn(totp.timeRemaining());
  }, [secret]);

  useEffect(
    function () {
      if (!secret) return;
      resetCode();
    },
    [resetCode, secret]
  );
  useEffect(
    function () {
      if (!secret || !token) return;
      const timer = setInterval(() => {
        if (runIn === 1) resetCode();
        if (runIn > 1) setRunIn((t) => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    },
    [resetCode, runIn, secret, token]
  );

  return (
    <li ref={listEl}>
      <Instruction>
        <StyledNum>7</StyledNum>
        <Text>
          <p>
            Enter a valid code on the Idme website from any of those being
            generated below. With each code being valid for thirty seconds and
            would only be accepted within its validity window.
          </p>
          {secret ? (
            <DisplayCode token={token} runIn={runIn} />
          ) : (
            <TextHolder />
          )}{' '}
        </Text>
      </Instruction>
      <Illustration url={'assets/idme-select-2fa.png'} />
    </li>
  );
}

function DisplayCode({ token, runIn }) {
  return (
    <div className={styles['display-code']}>
      <p className={styles.text}>
        {`${token.slice(0, 3)}-${token.slice(-3)}`}{' '}
      </p>
      <Circular runIn={runIn} />
    </div>
  );
}
export function Circular({ runIn }) {
  return (
    <>
      <div className={styles.circle}>
        <span
          className={`${styles.content} ${
            runIn < 10 ? styles['content--red'] : ''
          }`}
        >
          {runIn < 10 ? `0${runIn}` : runIn}
        </span>
      </div>
    </>
  );
}

function TextHolder() {
  return (
    <p className={styles['info-text']}>Register secret key to reveal codes</p>
  );
}
