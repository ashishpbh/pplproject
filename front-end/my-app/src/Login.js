import React, { Component } from "react";
//import { validateInstance } from "validate-react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(this.props, "mmmmmmmmmmmmmmm");

    this.state = {
      email: "",
      password: "",
      emailAlert: "",
      passAlert: "",
      _id: "",
      verifyAlert: "",
      error: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value
    }));
    console.log(event.target.name);
    if ("email" === event.target.name) {
      console.log(this.state.email);
      var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (this.state.email.match(mailFormat)) {
        this.setState({
          emailAlert: "",
          error: true
        });
      } else {
        this.setState({
          emailAlert: "input Valid email",
          error: false
        });
      }
    }
    if ("password" === event.target.name) {
      console.log(this.state.password);
      var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (this.state.password.trim().length > 5) {
        this.setState({
          passAlert: ""
        });
      } else {
        this.setState({
          passAlert: "Passwords must contain at least six characters"
        });
      }
    }
  };
  showPassword = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { userName, firstName, lastName, email, password } = this.state;
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.match(mailFormat)) {
      this.setState({
        emailAlert: "",
        error: true
      });
    } else {
      this.setState({
        emailAlert: "input valid email",
        error: true
      });
    }
    // On submit of the form, send a POST request with the data to the server.
    if (this.state.password.trim().length > 5 && this.state.error === true) {
      var allData = {
        email: email,
        password: password
      };
      console.log("this is all data", JSON.stringify(allData));
      fetch("http://localhost:8081/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(allData)
      })
        .then(response => response.json())
        .then(responseJsonEmailExist => {
          if (responseJsonEmailExist.length > 0) {
            console.log("Your email is exists", responseJsonEmailExist[0]._id);
            // this.setState({
            //   emailAlert: "Your email exists"
            // });
            fetch("http://localhost:8081/loginPass", {
              method: "post",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(allData)
            })
              .then(response => response.json())
              .then(EmailpassMatch => {
                if (EmailpassMatch.length > 0) {
                  console.log("Your hhhhhh", EmailpassMatch[0]);
                  if (EmailpassMatch[0].verifyStatus === true) {
                    localStorage.setItem("_id", EmailpassMatch[0]._id);
                    localStorage.setItem(
                      "userName",
                      EmailpassMatch[0].userName
                    );

                    this.props.history.push({
                      pathname: "/timeline",
                      state: {
                        email: EmailpassMatch[0].email,
                        _id: EmailpassMatch[0]._id
                      }
                    });
                    //console.log(typeof responseJson[0].verifyStatus);
                  } else {
                    console.log(" not verified");
                    this.setState({
                      passAlert: "pls go and verify your email"
                    });
                  }
                } else {
                  console.log(" password not match not match");
                  this.setState({ passAlert: "password not matched " });
                }
              })
              .catch(passMatch => {
                console.log("err this is", passMatch);
              });

            //
            // localStorage.setItem("_id", responseJson[0]._id);
            // localStorage.setItem("userName", responseJson[0].userName);
          } else {
            this.setState({
              emailAlert: "Your email not exist!"
            });
          }
        })
        .catch(error => {
          console.log("err this is", error);
        });
    } else {
      if (this.state.password.length < 6) {
        this.setState({
          passAlert: "enter at least 6 length"
        });
      }
    }
  };

  render() {
    // console.log("props by signup:", this.props.location.state._id);
    const { password, email } = this.state;
    return (
      <div className="login_sec">
        <h1 id="alert">
          Log In
          {this.state.verifyAlert}
        </h1>
        <ul>
          <form onSubmit={this.handleSubmit}>
            <li>
              <span>Email-ID</span>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={this.handleChange}
                style={{
                  borderColor: email === "" ? "red" : ""
                }}
                value={this.state.email}
              />
              <p style={{ color: "red" }}>{this.state.emailAlert}</p>
            </li>
            <li>
              <span>Password</span>
              <input
                type="password"
                name="password"
                id="myInput"
                placeholder="Enter Password"
                onChange={this.handleChange}
                style={{
                  borderColor: password === "" ? "red" : ""
                }}
                value={this.state.password}
              />
              <br />
              <br />
              <input type="checkbox" onClick={this.showPassword} />
              show Password
              <p style={{ color: "red" }}>{this.state.passAlert}</p>
            </li>
            <li />
            <li>
              <input type="submit" defaultValue="Log In" />
              <Link
                to={{
                  pathname: "/forget",
                  state: { _id: localStorage.getItem("_id") }
                }}
              >
                <a href>Forgot Password</a>
              </Link>
            </li>
          </form>
        </ul>

        <Link to="/">
          <div className="addtnal_acnt">
            I do not have any account yet.
            <a href>Create My Account Now !</a>
          </div>
        </Link>
      </div>
    );
  }
}
export default Login;
