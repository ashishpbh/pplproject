// These two containers are siblings in the DOM
import React from "react";
import ReactDOM from "react-dom";
const appRoot = document.getElementById("app-root");
const modalRoot = document.getElementById("modal-root");
const divStyle = {
  color: "blue",
  border: "2px solid black"
};
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    console.log("Component Did Mount");
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    console.log("Component  will Mount");
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

class App3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools to observe that the button is not a child
          of the div with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}
export default App3;
