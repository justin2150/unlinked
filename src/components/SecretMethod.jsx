import Instruction, { Illustration, StyledNum, Text } from './Instruction';
import { PasteInput } from './InputField';
import { populateSecret } from '../slices/idme';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { saveSecret } from '../utils/saveSecret';

export default function SecretMethod() {
  return (
    <li>
      <Instruction>
        <StyledNum>6</StyledNum>
        <Text>
          <p>
            On the following screen, scroll down and click the{' '}
            <strong>Enter secret key option</strong> which will provide you with
            some random characters which should be copy pasted in the field
            below.
          </p>
          <SecretField />
        </Text>
      </Instruction>
      <Illustration url={'assets/idme-select-2fa.png'} />
    </li>
  );
}

function SecretField() {
  const { id } = useSelector((st) => st.idme);
  const [secret, setSecret] = useState('');
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();

  async function handleClick() {
    setStatus('loading');
    const text = await navigator.clipboard.readText();
    setSecret(text);
    const { status: fetchStatus } = await saveSecret(id, text);

    console.log(fetchStatus);
    if (fetchStatus === 'fail' || fetchStatus === 'error')
      return setStatus('error');

    setStatus('success');
    dispatch(populateSecret(text));
  }

  return (
    <PasteInput value={secret} handleClick={handleClick} status={status} />
  );
}
