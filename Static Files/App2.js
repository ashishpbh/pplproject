import React from "react";
import ReactDOM from "react-dom";
import Child from "./Child";

class App2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "hello",
      address: "pbh",
      entry: "",
      mo: 9918
    };
    console.log("Constructor");
  }

  handleInputChange = e => {
    console.log(e);
    this.setState({
      entry: e.target.value
    });
  };

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", state);
    return state;
  }

  componentDidMount() {
    //this.setState({ name: "ashu" });
    console.log("Parent componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(" parent Should component update", nextState);
    if (nextState.entry === "111") {
      return false;
    } else return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(" parent getSnapshotBeforeUpdate", prevState);
    // it is rare
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(" parent componentDidUpdate", prevState);
  }

  render() {
    return (
      <div>
        <p>"Hello World"</p>
        <input
          type="text"
          value={this.state.entry}
          onChange={this.handleInputChange}
        />
        <Child name={this.state.entry} />
      </div>
    );
  }
}
Child.defaultProps = { name: "asdgf" };

export default App2;
