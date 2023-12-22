import CreateIDME from '../components/CreateIdme';
import InputIdme from '../components/InputIdme';
import Mailbox from '../components/Mailbox';
import ConfirmIdme from '../components/ConfirmIdme';
import styles from './IdmePage.module.css';
import Select2FA from '../components/Select2FA';
import SecretMethod from '../components/SecretMethod';
import GenerateCode from '../components/GenerateCode';
import VerificationPath from '../components/VerificationPath';
import FinalScreen from '../components/FinalScreen';
import { Buttons } from '../components/Button';
import Logo from '../components/Logo';
// import useProtected from "../hooks/useProtected";
export default function Idme() {
  // Route protector below
  // const user = useProtected();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="main">
      <Logo />
      <ul className={styles.wrapper}>
        <Mailbox />
        <CreateIDME />
        <InputIdme />
        <ConfirmIdme />
        <Select2FA />
        <SecretMethod />
        <GenerateCode />
        <VerificationPath />
        <FinalScreen />
        <Buttons onClick={handleSubmit} />
      </ul>
    </main>
  );
}
