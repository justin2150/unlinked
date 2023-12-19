import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from "./Instruction";

export default function FinalScreen() {
  return (
    <li>
      <Instruction>
        <StyledNum>09</StyledNum>
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
      <Illustration url={"assets/idme-select-2fa.png"} />
    </li>
  );
}
