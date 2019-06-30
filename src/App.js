import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

import './App.css';

import Articles from './components/Articles'
import ArticleDetails from './components/Articles/ArticleDetails'

function App() {
  return <Router>
    <Route exact path={'/'} component={Articles} />
    <Route exact path={'/details'} component={ArticleDetails} />
  </Router>
}

export default App;
