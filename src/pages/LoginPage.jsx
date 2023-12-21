import Social from '../components/Social';
import { Buttons } from '../components/Button';
import { BirthYear } from '../components/DateOfBirth';
import styles from './LoginPage.module.css';
import Logo from '../components/Logo';

export default function LoginPage() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <main className={styles.main}>
      <Logo />
      <form>
        <Social />
        <BirthYear />
        <Buttons onClick={handleSubmit} />
      </form>
    </main>
  );
}
