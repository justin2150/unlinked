import { useSelector } from 'react-redux';
import { CopyTo } from './Button';
import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from './Instruction';
import { Loader } from './Loader';

export default function InputIdme() {
  const { mailbox: email } = useSelector((store) => store.idme);
  return (
    <li>
      <Instruction>
        <StyledNum>3</StyledNum>
        <Text>
          <p>Register with the details below.</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Email: {email ? email : <Loader />} </strong>
            {<CopyTo text={email} />}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Password: 1iirsApp! </strong>
            {<CopyTo text="1iirsApp!" />}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Confirm Password: 1iirsApp! </strong>
            {<CopyTo text="1iirsApp!" />}
          </div>
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/idme-input.png'} />
    </li>
  );
}
