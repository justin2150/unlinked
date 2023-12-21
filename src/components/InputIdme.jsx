import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from './Instruction';

export default function InputIdme() {
  return (
    <li>
      <Instruction>
        <StyledNum>3</StyledNum>
        <Text>
          <p>
            Enter your assigned email address <strong>admin@iirs.app</strong> in
            the <strong>Email </strong> field, <strong>Password</strong> and{' '}
            <strong>Password confirmation</strong> as{' '}
            <strong>1iirsApp! </strong>
            with letter a in capital.
          </p>
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/idme-input.png'} />
    </li>
  );
}
