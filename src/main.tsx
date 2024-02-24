import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import awsconfig from './amplifyconfiguration.json';
import { jaDict } from './constants';
import './index.css';
import reportWebVitals from './reportWebVitals';

Amplify.configure(awsconfig);
I18n.putVocabulariesForLanguage('ja', jaDict);
I18n.setLanguage('ja');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
