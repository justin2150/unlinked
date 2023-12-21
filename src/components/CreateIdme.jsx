import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from './Instruction';

export default function CreateIDME() {
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
