import React from 'react';
import Routes from './Routes';

import { Provider } from 'react-redux';
import store, { persistor } from './reduxStore';
import { PersistGate } from 'redux-persist/integration/react';

import Loader from './components/Loader';

import './App.css';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Loader /> {/* Global app loader */}
          <Routes />
        </PersistGate>
      </Provider>
    )
  }

}

export default App;
