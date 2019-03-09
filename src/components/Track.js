import React, { Component } from 'react';

export default class Track extends Component {
  render() {
    return (
      <div className="track">
        <h4>{this.props.track.name}</h4>
        <p>{this.props.track.artist}</p>
        
      </div>
    )
  }
}
