import React, { Component } from 'react';
import axios from "../axios";

import NavBar from "../components/NavBar";
import MainContent from "../components/MainContent";

var x;
export default class PlayScreen extends Component {
  
  state = {
    tracks: [],
    searchString: ""
  };

  _onSearchChanged = text => {
    x = text;
    this.setState({ searchString: text });
    
  }
  
  componentDidMount() {
    console.log('check')
    console.log(this.state.searchString)
    axios
      .post("/api/tracks/query",)
      .then(res => {
        console.log(res + 'check data');
        console.log(typeof(res));
        
        this.setState({
          tracks: res.data
        });
      })
      .catch(err => console.error(err));
  }


   
  // _onSubmit

  render() {
    // console.log(this.state.tracks);
    // console.log(x + ' check');
    
    const displayedTracks = this.state.tracks.filter(
      track =>
        track.name.includes(this.state.searchString) ||
        track.artist.name.includes(this.state.searchString)
    );
    
    
    return (
      <div>
        <NavBar
          onSearchChanged={this._onSearchChanged}
          />
        <MainContent tracks={displayedTracks} />
      </div>
    )
    
    console.log('check end of render');
  }
}
