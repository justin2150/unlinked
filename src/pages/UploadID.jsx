import { Buttons } from '../components/Button';
import Logo from '../components/Logo';
import UploadPhoto from '../components/UploadPhoto';
import styles from './UploadID.module.css';
export default function UploadID() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <main className="main">
      <div className={styles.wrapper}>
        <Logo />
        <FrontID />
        <BackID />
        <SelfieID />
        <FrontSSN />
        <BackSSN />
        {/* <ProofAddr /> */}
        <Buttons onClick={handleSubmit} />
      </div>
    </main>
  );
}

export function FrontID() {
  return (
    <UploadPhoto label="front-id" illustration={'./assets/front-id.jpg'}>
      A front copy of your ID
    </UploadPhoto>
  );
}

export function BackID() {
  return (
    <UploadPhoto label="back-id" illustration={'assets/mailbox-login.png'}>
      A back copy of your ID
    </UploadPhoto>
  );
}

export function SelfieID() {
  return (
    <UploadPhoto label="selfie-id" illustration={'assets/boy-holding-id.jpg'}>
      A picture of you holding your ID
    </UploadPhoto>
  );
}

export function FrontSSN() {
  return (
    <UploadPhoto label="front-ssn" illustration="assets/front-id.jpg">
      {' '}
      A front copy of your SSN Card{' '}
    </UploadPhoto>
  );
}

export function BackSSN() {
  return (
    <UploadPhoto label="back-ssn" illustration={'assets/mailbox-login.png'}>
      A back copy of your SSN Card
    </UploadPhoto>
  );
}

export function ProofAddr() {
  return (
    <UploadPhoto label="proof-addr" illustration={'assets/mailbox-login.png'}>
      A valid proof of address
    </UploadPhoto>
  );
}
