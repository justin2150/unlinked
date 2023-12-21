import { useNavigate } from 'react-router-dom';
import Button, { TextLine } from '../components/Button';
import { useState } from 'react';

export default function IndexPage() {
  const [isHidden] = useState(true);
  const navigate = useNavigate();
  return (
    <main style={{ textAlign: 'center', marginTop: 'calc(30vh)' }}>
      <Button
        onClick={() => navigate('/register')}
        type="primary"
        margin="t-margin"
      >
        Begin a new application
      </Button>
      {isHidden && (
        <>
          <TextLine>OR</TextLine>
          <Button onClick={() => navigate('/login')} type="primary">
            Proceed with an existing application
          </Button>
        </>
      )}
    </main>
  );
}
