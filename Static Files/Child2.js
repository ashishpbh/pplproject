import React, { Component } from "react";
import logo from "./logo.svg";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import "./App.css";

class Child2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var show2 = this.props.state;
    var sta = this.props.st;
    return (
      <div>
        <img src="/on.jpg" height="40" weight="50" />
      </div>
    );
  }
}

export default Child2;
