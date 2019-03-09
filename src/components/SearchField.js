import React, { Component } from "react";
// import { EventEmitter } from "events";
    
class SearchField extends Component {
    _handleTextChange = event => 
    {
        // this.props.onSearchChanged &&
        this.props.onSearchChanged(event.target.value);
        console.log(event.target.value);
    }

    // _handleSubmit (event) {
    //     event.preventDefault();
    //     console.log("aa");
    // }
    
    render() {
        return (
            <form className="col-4">
            <input 
                onChange={this._handleTextChange}
                className="form-control"
                type="text"
                placeholder="Search your track, artist,..."
                
            />
            <input type="submit" value="Submit" />    
            </form>
        )
        
    }
}

export default SearchField;