import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';

import Header from './components/header';
import Items from './components/items'
import Details from './components/item';


const Routs = () => (
    <div>
      <Switch>
        <Route exact path="/" component={Header}/>
        <Route path="/items" component={Items}/>
        <Route path="/item/:id" component={Details}/>
      </Switch>
    </div>
)


ReactDOM.render((
    <Router>
      <Routs /> 
    </Router>
), document.getElementById('app'));
