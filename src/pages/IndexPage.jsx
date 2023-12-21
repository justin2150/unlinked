import { useNavigate } from 'react-router-dom';
import Button, { TextLine } from '../components/Button';

export default function IndexPage() {
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
      <TextLine>OR</TextLine>
      <Button onClick={() => navigate('/login')} type="primary">
        Proceed with an existing application
      </Button>
    </main>
  );
}
