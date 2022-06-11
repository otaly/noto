import { Amplify, I18n } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import awsconfig from './aws-exports';
import { jaDict } from './constants';
import './index.css';
import reportWebVitals from './reportWebVitals';

Amplify.configure(awsconfig);
I18n.putVocabulariesForLanguage('ja', jaDict);
I18n.setLanguage('ja');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
