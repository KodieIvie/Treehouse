import React from 'react';

import './App.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

// Components
import Container from './components/Container';
import Nav from './components/Nav';
import NotHere from './components/NotHere';

const App = () => (
  
  <BrowserRouter>
    <div className="container">
      <Route component={Nav} />
      <Switch>
        <Route exact path='/' render={ () => <Redirect to={"/search"} /> } />
        <Route exact path="/search" component={Container} />
        <Route path="/search/:query" component={Container} />
        <Route path="/cats" render={ () => {return <Container query={'kittens'} /> }} />
        <Route path="/dogs" render={ () => {return <Container query={'puppys'} /> }} />
        <Route path="/birds" render={ () => {return <Container query={'birds'} /> }} />
        <Route component={NotHere} />
      </Switch> 
    </div>
  </BrowserRouter>
)

export default App;

