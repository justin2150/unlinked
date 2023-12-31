import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { populateMail } from '../slices/idme';
import { CopyTo } from './Button';
import Instruction, {
  Checkbox,
  Illustration,
  StyledNum,
  Text,
} from './Instruction';
import { SITE_URL } from '../utils/variables';
import { Loader } from './Loader';

export default function Mailbox({ id }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const password = '1iirsApp!';
  const domain = 'iirs.email';

  useEffect(
    function () {
      async function createMailbox() {
        const res = await fetch(`${SITE_URL}/api/v1/mailbox`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ id, password, domain }),
        });
        if (res.status !== 200) throw new Error('unhandled error occured');
        const { email } = await res.json();
        setEmail(email);
        dispatch(populateMail(email));
      }
      createMailbox();
    },
    [dispatch, id]
  );
  return (
    <li>
      <Instruction>
        <StyledNum>1</StyledNum>
        <Text>
          <p>
            Click and open the link <a href="#">https://box.iirs.email/mail </a>
            in a new browser tab and login to your assigned mail account with
            the credentials below.
          </p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Email: {email ? email : <Loader />} </strong>
            {<CopyTo text={email} />}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Password: 1iirsApp! </strong>
            {<CopyTo text="1iirsApp!" />}
          </div>
          <Checkbox />
        </Text>
      </Instruction>
      <Illustration url={'assets/mailbox-login.png'} />
    </li>
  );
}
