import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBarTop from './components/AppBarTop';
import NavBottom from './components/NavBottom';
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
