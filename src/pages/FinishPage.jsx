import { useEffect, useRef, useState } from 'react';
import styles from './FinishPage.module.css';
// import Button from '../components/Button';
export default function Success() {
  const [top, setTop] = useState(0);
  const containerEl = useRef(null);

  useEffect(function () {
    <>
      <script
        src="//widget.manychat.com/102062299628220.js"
        defer="defer"
      ></script>
      <script src="https://mccdn.me/assets/js/widget.js" defer="defer">
        {' '}
      </script>
    </>;
  }, []);

  useEffect(function () {
    document.body.style.backgroundColor = '#f5f5f5';
  }, []);

  useEffect(function () {
    setTop((window.innerHeight - 500) / 2);
  }, []);
  return (
    <main
      style={{ marginTop: `${top}px` }}
      className={styles.container}
      ref={containerEl}
    >
      <img className={styles.image} src="check.svg" alt="success" />
      <p className={styles.text}>
        Your information has been received successfully. Next step Click on the
        button below to undergo an interactive session with a application
        referee.
      </p>
      <div data-widget-id="23650070" className="mcwidget-embed"></div>
      {/* <Button type="logout">Logout</Button> */}
    </main>
  );
}
