import styles from './Logo.module.css';
export default function Logo() {
  return (
    <>
      <img className={styles.image} src="logo+name.svg" />
      <h1 className={styles.text}>Integrated Ratification System</h1>
    </>
  );
}
