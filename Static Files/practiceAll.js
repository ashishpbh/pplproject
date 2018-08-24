import React, { Component } from "react";
import logo from "./logo.svg";
import ReactDOM from "react-dom";
import "./App.css";
//forceUpdate setState and react Dom manipulation
class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      d: ""
    };

    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  forceUpdateHandler() {
    console.log("forceUpdate is called");
    var n = Math.random();
    this.setState({ d: n });
  }
  setStateHandler = () => {
    var item = "setState...";
    var myArray = this.state.data.slice();
    console.log(myArray);
    myArray.push(item);
    this.setState({ data: myArray }, () => {
      // we can define call back  here
    }); // set state method called
  };

  DOMUpdateHandler = () => {
    //var paraId = document.getElementById("d1");
    console.log("DomUpdate is called");
    var para = document.createElement("p");
    var node = document.createTextNode("This is new.");
    para.appendChild(node);

    var element = document.getElementById("d1");
    element.appendChild(para);
    ReactDOM.findDOMNode(element).style.color = "red";
  };

  render() {
    return (
      <div>
        <button onClick={this.setStateHandler}>SET STATE</button>
        <h4>State Array: {this.state.data}</h4>

        <button onClick={this.forceUpdateHandler}>FORCE UPDATE</button>
        <h4>Random number: {this.state.d}</h4>

        <button onClick={this.DOMUpdateHandler}>DOM UPDATE</button>
        <p id="d1">this is dom paragraph</p>
      </div>
    );
  }
}

//

export default App;
