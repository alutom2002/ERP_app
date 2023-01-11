import './style/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import allReducer from './redux/reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from "react-router-dom";

const store = createStore(allReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
