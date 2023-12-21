import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from './Instruction';

export default function VerifyIdme() {
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
