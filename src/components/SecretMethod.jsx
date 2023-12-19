import Instruction, { Illustration, StyledNum, Text } from "./Instruction";
import InputField from "./InputField";

export default function SecretMethod() {
  return (
    <li>
      <Instruction>
        <StyledNum>06</StyledNum>
        <Text>
          <p>
            On the following screen, scroll down and click the{" "}
            <strong>Enter secret key option</strong> which will provide you with
            some random characters which should be copy pasted in the field
            below.
          </p>
          <InputField />
        </Text>
      </Instruction>
      <Illustration url={"assets/idme-select-2fa.png"} />
    </li>
  );
}
