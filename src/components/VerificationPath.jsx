import Instruction, { Illustration, StyledNum, Text } from './Instruction';

export default function VerificationPath() {
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
        </Text>
      </Instruction>
      <Illustration url={'assets/idme-select-2fa.png'} />
    </li>
  );
}
