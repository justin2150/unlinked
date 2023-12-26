import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './slices/store';
import { MyFilePond } from './components/FilePond';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
      {/* <MyFilePond /> */}
    </Provider>
  </StrictMode>
);
