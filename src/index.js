import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './redux/reducer/reducer';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//  applymiddleware để dành giải thích sau 
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
