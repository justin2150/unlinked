import styles from './FinishPage.module.css';

export default function Success() {
  return (
    <main className="main">
      <section className={styles.section}>
        <Image />
        <Paragraph />
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
      button below to undergo an interactive session with a application referee.
    </p>
  );
}
