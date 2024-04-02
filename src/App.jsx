import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import UploadID from './pages/UploadID';
import IdmePage from './pages/IdmePage';
import FinishPage from './pages/FinishPage';
import './proxima-nova-reg.otf';
import './App.css';
import RetrivePage from './pages/RetrievePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="/upload-id" element={<UploadID />} />
        <Route path="/idme" element={<IdmePage />} />
        <Route path="retrieve" element={<RetrivePage />} />
        <Route path="finish" element={<FinishPage />} />
      </Routes>
    </BrowserRouter>
  );
}
