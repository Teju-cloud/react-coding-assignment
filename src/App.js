import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { store } from './store';
import Navbar from './components/Navbar';
import SpaceX from './components/SpaceX';
import SpaceXPayload from './components/SpaceXPayload';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <Router>
            <Navbar />
            <Route exact path="/" strict component={SpaceX} />
            <Route path="/payloads" component={SpaceXPayload} />
          </Router>
      </div>
    </Provider>
  );
}

export default App;
