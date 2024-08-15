import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import UploadID from './pages/UploadID';
import IdmePage from './pages/IdmePage';
import FinishPage from './pages/FinishPage';
import RetrievePage from './pages/RetrievePage';
import DependantPage from './pages/DependantPage';
import UploadDocs from './pages/UploadDocs';
import './proxima-nova-reg.otf';
import './App.css';
import AppProvider from './contexts/AppContext';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<RegisterPage />} />
          <Route path="/upload-id" element={<UploadID />} />
          <Route path="/idme" element={<IdmePage />} />
          <Route path="retrieve" element={<RetrievePage />} />
          <Route path="dependant/:num?" element={<DependantPage />} />
          <Route path="docs/:num?" element={<UploadDocs />} />
          <Route path="finish" element={<FinishPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
