import React, { Component } from 'react';
import Track from "./Track";
import { Link } from "react-router-dom";

export default class MainContent extends Component {
  render() {
    console.log(this.props.tracks);
    const allTracks = this.props.tracks.map(track => (
        <div key={track._id} className="col-3">
            <Link to={`/tracks/${track._id}`}>
                <Track track={track}/>
            </Link>
        </div>
    ));

    return (
      <div className="container main_content">
        <div className="row">{allTracks}</div>
      </div>
    );
  }
}

