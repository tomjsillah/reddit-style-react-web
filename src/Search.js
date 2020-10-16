import React, { Component } from "react";

export default class Search extends Component {
  
  render() {
    return (
          <input
            type="text"
            onChange={this.props.onChange}
            className="search"
            placeholder="Search"
          />
    );
  }
}
