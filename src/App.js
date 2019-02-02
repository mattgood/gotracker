import React, { Component } from 'react';
import './App.css';
import AppBarTop from './components/Layout/AppBarTop';
import NavBottom from './components/Layout/NavBottom';
import LuckyList from './components/LuckyList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBarTop />
        <LuckyList />
        <NavBottom />
      </div>
    );
  }
}

export default App;
