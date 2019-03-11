import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from './axios';

import PlayScreen from "./containers/PlayScreen";

import { BrowserRouter, Route } from "react-router-dom";


class App extends Component {
  state = {}

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route 
            exact
            path="/"
            render={props => {
              return <PlayScreen
                {...props}
              />;
            }}
          />

        
        
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
