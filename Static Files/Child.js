import React from "react";
import ReactDOM from "react-dom";

class Child extends React.Component {
  constructor(props) {
    super(props);

    console.log("Child Constructor");
  }
  static getDerivedStateFromProps(props, state) {
    console.log(" Child getDerivedStateFromProps", props);
    return props;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(" child Should component update", nextProps);
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(" child getSnapshotBeforeUpdate", prevProps);
  }
  componentDidMount() {
    console.log("Child componentDidMount");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(" child  componentDidUpdate", prevState);
  }

  render() {
    console.log(" child render");

    return <p>"child"</p>;
  }
}

export default Child;
