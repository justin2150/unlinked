import Social from '../components/Social';
import { Buttons } from '../components/Button';
import { BirthYear } from '../components/DateOfBirth';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <main className={styles.main}>
      <form>
        <Social />
        <BirthYear />
        <Buttons onClick={handleSubmit} />
      </form>
    </main>
  );
}
