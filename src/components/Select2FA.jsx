import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from './Instruction';

export default function Select2FA() {
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
