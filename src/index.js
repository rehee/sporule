import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import initialState from "./reducers/InitialState";
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import App from './pages/App';
import "./styles/styles.css";

if ('serviceWorker' in navigator) {  
    OfflinePluginRuntime.install({
        onUpdateReady: () => {console.log("update is ready");OfflinePluginRuntime.applyUpdate();},
        onUpdated: () => console.log("sw assets updated"),
      });
}


export const store = configureStore(initialState);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

