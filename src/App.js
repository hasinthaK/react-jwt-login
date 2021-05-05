import React from 'react';
import Routes from './Routes';
import ConfigProvider from './services/ConfigProvider';

import './App.css';

class App extends React.Component {

  render() {
    return (
      <ConfigProvider>
        <Routes />
      </ConfigProvider>
    )
  }

}

export default App;
