import React, { Component } from "react";

import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    console.log(this.state);
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      nameAlert: "",
      passAlert: "",
      fNameAlert: "",
      lNameAlert: "",
      emailAlert: "",
      error: false,
      signUp_State: false,
      _id: ""
    };
  }

  handleChange = e => {
    // const { userName, firstName, lastName, email, password } = this.state;
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value
    }));

    console.log(e.target.name);

    if ("email" === e.target.name) {
      console.log(this.state.email);
      var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.state.email.match(mailFormat)) {
        this.setState({
          emailAlert: "now valid",
          error: true
        });
      } else {
        this.setState({
          emailAlert: "input Valid email",
          error: false
        });
      }
    }
    //password validation
    if ("password" === e.target.name) {
      console.log(this.state.password);
      // var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // var pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (this.state.password.length > 6) {
        this.setState({
          passAlert: "valid",
          error: true
        });
      } else {
        this.setState({
          passAlert:
            "Passwords must contain at least six characters, including uppercase, lowercase letters and numbers",
          error: false
        });
      }
    }
  };
  handleSubmit = event => {
    event.preventDefault();

    const { userName, firstName, lastName, email, password } = this.state;

    // On submit of the form, send a POST request with the data to the server.

    var allData = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    console.log("this is all data", JSON.stringify(allData));
    fetch("http://localhost:8081/submitData", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(allData)
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db

        this.setState({
          signUp_State: true
        });
        localStorage.setItem("userName", responseJson.userName);
        localStorage.setItem("email", responseJson.email);
        console.log("responseJson", responseJson);
        this.props.history.push({
          pathname: "/reg",
          state: {
            email: this.state.email,
            _id: responseJson,
            userName: this.state.userName
          }
        });
      })
      .catch(error => {
        console.log("err", error);
        alert("", error);
        this.setState({ signUp_State: false });
      });

    if (userName === "") {
      this.setState({
        nameAlert: "cant be empty",
        error: false
      });
    } else {
      this.setState({
        nameAlert: "",
        error: true
      });
    }

    if (firstName === "") {
      this.setState({
        fNameAlert: "cant be empty",
        error: false
      });
    } else {
      this.setState({
        fNameAlert: "",
        error: true
      });
    }

    if (lastName === "") {
      this.setState({
        lNameAlert: "cant be empty",
        error: false
      });
    } else {
      this.setState({
        lNameAlert: "",
        error: true
      });
    }
  };

  render() {
    const {
      userName,
      firstName,
      lastName,
      email,
      password,
      fNameAlert,
      lNameAlert,
      emailAlert,
      passAlert,
      nameAlert
    } = this.state;
    return (
      <div className="register_sec">
        <h1>Create An Account</h1>
        <ul>
          <form onSubmit={this.handleSubmit}>
            <li>
              <span>Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                name="userName"
                style={{
                  borderColor: userName === "" ? "red" : "white"
                }}
                onChange={this.handleChange}
                value={userName}
              />
              <p style={{ color: "red" }}>{nameAlert}</p>
            </li>
            <li>
              <span>Password</span>
              <input
                type="text"
                name="password"
                placeholder="Enter your password"
                onChange={this.handleChange}
                style={{
                  borderColor: password === "" ? "red" : ""
                }}
                value={password}
              />
              <p style={{ color: "red" }}>{passAlert}</p>
            </li>
            <li>
              <span>Email</span>
              <input
                type="text"
                name="email"
                placeholder="Enter Your Email"
                style={{
                  borderColor: email === "" ? "red" : ""
                }}
                onChange={this.handleChange}
                value={email}
              />
              <p style={{ color: "red" }}>{emailAlert}</p>
            </li>
            <li>
              <span>First Name</span>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                onChange={this.handleChange}
                style={{
                  borderColor: firstName === "" ? "red" : "white"
                }}
                value={firstName}
              />
              <p style={{ color: "red" }}>{fNameAlert}</p>
            </li>
            <li>
              <span>Last Name</span>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                onChange={this.handleChange}
                value={lastName}
                style={{
                  borderColor: lastName === "" ? "red" : "white"
                }}
              />
              <p style={{ color: "red" }}>{lNameAlert}</p>
            </li>
            <li>
              <input type="checkbox" required />I agree to Term &amp; Conditions
            </li>
            <li>
              <input
                type="submit"
                defaultValue="Register"
                disabled={!this.state.error}
              />
            </li>
          </form>
        </ul>
        <div className="addtnal_acnt">
          I already have an account.{" "}
          <Link to={{ pathname: "/reg", state: { foo: "bar" } }}>
            {" "}
            <a
              onClick={() => {
                this.setState({
                  signUp_State: true
                });
              }}
            >
              Login My Account !
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
export default Register;
