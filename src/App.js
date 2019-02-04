import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppBarTop from './components/Layout/AppBarTop';
import NavBottom from './components/Layout/NavBottom';
import Overview from './components/Dashboard/Overview';
import ListSummary from './components/Lists/Summary';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppBarTop />
          <Switch>
            <Route path="/dashboard" component={Overview}/>
            <Route path="/lists" component={ListSummary}/>
          </Switch>
          <NavBottom />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
