import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from './Instruction';

export default function GenerateCode() {
  return (
    <li>
      <Instruction>
        <StyledNum>7</StyledNum>
        <Text>
          <p>
            Enter a valid code on the Idme website from any of those being
            generated below. With each code being valid for thirty seconds and
            would only be accepted within its validity window.
          </p>
        </Text>
        <Checkbox />
      </Instruction>
      <Illustration url={'assets/idme-select-2fa.png'} />
    </li>
  );
}
