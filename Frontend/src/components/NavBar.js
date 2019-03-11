import React, { Component } from 'react';

import SearchField from './SearchField';

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar navbar-expand">
        <div className="container">
          <SearchField onSearchChanged={this.props.onSearchChanged} />

        </div>

      </div>
    )
  }
}





