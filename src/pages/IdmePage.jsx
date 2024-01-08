import Mailbox from '../components/Mailbox';
import InputIdme from '../components/InputIdme';
import SecretMethod from '../components/SecretMethod';
import GenerateCode from '../components/GenerateCode';
import { Buttons } from '../components/Button';
import Logo from '../components/Logo';
import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from '../components/Instruction';
import styles from './IdmePage.module.css';

export default function Idme() {
  // Route protector below
  // const id = useProtected();

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
        <VerifyIdme />
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

export function VerifyIdme() {
  return (
    <li>
      <Instruction>
        <StyledNum>4</StyledNum>
        <Text>
          <p>
            You&apos;ll then be asked to confirm the{' '}
            <strong>assigned email address</strong> which could be done by
            opening and clicking the link in the <strong>email</strong> that
            came in to the <strong>assigned email address</strong> or by
            entering the six digit code just at the end of the email.
          </p>
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/idme-confirm-email.jpeg'} />
    </li>
  );
}

export function CreateIDME() {
  return (
    <li>
      <Instruction>
        <StyledNum>2</StyledNum>
        <Text>
          <p>
            Click and open <a href="#">this link</a> in a new tab, and click the
            create account option to begin the process of verifying your
            identity
          </p>
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/irs-signin.png'} />
    </li>
  );
}

export function Select2FA() {
  return (
    <li>
      <Instruction>
        <StyledNum>5</StyledNum>
        <Text>
          <p>
            The next screen will ask you to choose a multi factor authentication
            method which you must select the
            <strong> Code generator application</strong> option.
          </p>
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/idme-select-2fa.png'} />
    </li>
  );
}

export function VerificationPath() {
  return (
    <li>
      <Instruction>
        <StyledNum>8</StyledNum>
        <Text>
          <p>
            You&apos;ll then be asked to select a verification path. The self
            service path is the fastest and requires you to upload your Id along
            with a selfie while the video chat agent requires you to commit to a
            video chat session with a trusted Idme referee.
          </p>
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/idme-select-2fa.png'} />
    </li>
  );
}

export function FinalScreen() {
  return (
    <li>
      <Instruction>
        <StyledNum>9</StyledNum>
        <Text>
          <p>
            Once your identity is successfully verified by Idme, you&apos;ll be
            redirected into your dashboard which you then need to close the
            browesr tab and mark this step as complete to submit your
            application.
          </p>
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/idme-select-2fa.png'} />
    </li>
  );
}
