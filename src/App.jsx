import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import IdmePage from './pages/IdmePage';
import UploadID from './pages/UploadID';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="idme" element={<IdmePage />} />
        <Route path="upload-id" element={<UploadID />} />
      </Routes>
    </BrowserRouter>
  );
}
