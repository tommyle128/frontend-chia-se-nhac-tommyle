import React, { Component } from 'react';
import axios from "../axios";

import NavBar from "../components/NavBar";
import MainContent from "../components/MainContent";

export default class PlayScreen extends Component {
  
  state = {
    tracks: [],
    searchString: ""
  };

  _onSearchChanged = text => {
    // event.preventDefault()
    axios
      .post("/api/tracks/query", {
        query: text
      })
      .then(res => {
        this.setState({ tracks: res.data })
      })
      .catch(err => console.log(err));
      
  }
  

  // componentDidMount() {
  //   console.log('check')
  //   console.log(this.state.searchString)
  //   axios
  //     .post("/api/tracks/query",)
  //     .then(res => {
  //       console.log(res + 'check data');
  //       console.log(typeof(res));
        
  //       this.setState({
  //         tracks: res.data
  //       });
  //     })
  //     .catch(err => console.error(err));
  // }
   
  // _onSubmit

  render() {
    
    const displayedTracks = this.state.tracks;
    console.log(displayedTracks);
     
    return (
      <div>
        <NavBar
          onSearchChanged={this._onSearchChanged}
        />
        <MainContent 
          tracks={displayedTracks} 
        />
      </div>
    )
    
    console.log('check end of render');
  }
}
