/**
 * ====================================================
 * 
 * Created on the 27/10/2023
 * 
 * Copyright © 2023 Nathan Queme. All rights reserved.
 * 
 * ====================================================
 */

import ReactDOM from 'react-dom/client';
import './index.css';
import './utils/main/daysjsInitialization'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import RenderApp from './renderApp';
import { Provider } from 'react-redux'
import store from './data/state/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RenderApp />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
