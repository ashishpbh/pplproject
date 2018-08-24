import React, { Component } from "react";

class SignupVerify extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.email);
  }
  handleVerify = () => {
    var allData = {
      email: this.props.match.params.email
    };
    console.log("this is all data", JSON.stringify(allData));
    fetch("http://localhost:8081/verifyonSignup", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(allData)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("yor signup is verified", responseJson);
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="content">
          <div className="content_lft">
            <a onClick={this.handleVerify}>
              welcome to verify your email click
              herefffffffffffffffffffffffffffffffhjjjjjjjhfffffffffffffffffffgfhfjhfghf{" "}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default SignupVerify;
