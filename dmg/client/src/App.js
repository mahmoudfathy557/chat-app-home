import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/MahmoudChat/Home';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/join" component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
