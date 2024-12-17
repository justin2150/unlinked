// import { useAppProvider } from '../contexts/AppContext';
import styles from './FinishPage.module.css';

export default function Success() {
  return (
    <main className="main">
      <section className={styles.section}>
        <Image />
        <Paragraph />
        <Btn />
      </section>
    </main>
  );
}

function Image() {
  return <img className={styles.image} src="check.svg" alt="success" />;
}

function Paragraph() {
  return (
    <p className={styles.text}>
      Your information has been received successfully. Next step Click on the
      button below to undergo an interactive session with a application referee
      from our facebook page.
    </p>
  );
}

function Btn() {
  // let { origin } = useAppProvider();
  // origin = `${origin}/support`;
  return (
    <a href={`https://facebook.com/forgiviy`} className={styles.btn}>
      {' '}
      Begin interactive session
    </a>
  );
}
