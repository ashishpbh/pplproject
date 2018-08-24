import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: ""
    };
  }
  componentDidMount() {
    console.log("header", localStorage.getItem("userName"));
    if (localStorage.getItem("userName") != null) {
      this.setState({ loginStatus: "logout" });
    } else {
      this.setState({ loginStatus: "login" });
    }
  }
  handleLogout = () => {
    console.log("logout called", localStorage.getItem("userName"));
    console.log("logout called", this.props);
    // console.log("logout called", this.props.props.history.push());

    if (localStorage.getItem("userName") != null) {
      this.setState({ loginStatus: "login" });
      localStorage.clear();
      this.props.props.history.push({
        pathname: "/"
        //state: { email: this.state.email, response: responseJson }
      });
      console.log("logout called", localStorage.getItem("userName"));
    }
  };

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link
          href="css/bootstrap-responsive.css"
          rel="stylesheet"
          type="text/css"
        />
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button
                type="button"
                className="btn btn-navbar"
                data-toggle="collapse"
                data-target=".nav-collapse"
              >
                {" "}
                <span className="icon-bar" /> <span className="icon-bar" />{" "}
                <span className="icon-bar" />{" "}
              </button>
              <a className="brand" href>
                PPL
              </a>
              <div className="pro_info pull-right">
                <div className="pro_icn">
                  <img src="images/pic_small.png" alt="img" />
                </div>
                <div className="pro_txt">
                  Me
                  <b className="caret" />
                </div>
                <ul
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="dLabel"
                >
                  <li>
                    <a tabIndex={-1}>My Profile</a>
                  </li>
                  <li>
                    <a tabIndex={-1}>Message Box</a>
                  </li>
                  <li>
                    <a tabIndex={-1}>Change Language</a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a tabIndex={-1}>
                      <input type="text" placeholder="search" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active">
                    {" "}
                    <Link
                      to={{
                        pathname: "/timeline"
                      }}
                    >
                      {" "}
                      <a href>Home</a>{" "}
                    </Link>{" "}
                  </li>

                  <li className>
                    {" "}
                    <a href>E-Coupons</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>E-Brands</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>Resuse Market</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>Lost and Found</a>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="header_lft">
            <div className="logo">
              <a>
                <img src="images/logo.png" alt="logo" />
              </a>
            </div>
            <div className="navigatn">
              <ul>
                {localStorage.getItem("userName") != null ? (
                  <Link to="/timeline">
                    <li>
                      <a className="active">Home</a>
                    </li>
                  </Link>
                ) : (
                  <li>
                    <a className="active">Home</a>
                  </li>
                )}
                <li>
                  <a> E-Coupons </a>
                </li>
                <li>
                  <a>E-Brands </a>
                </li>
                <li>
                  <a> Resuse Market </a>
                </li>
                <li>
                  <a> Lost and Found</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div">
              <img src="images/flag.png" alt="logo" />
            </div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box">
              <a>
                <span className="msg_count">100</span>
              </a>
            </div>
            <div className="info_div">
              <a onClick={this.handleLogout}>
                {this.state.loginStatus}
                {console.log(localStorage.getItem("userName"))}
              </a>
              <div className="image_div">
                {" "}
                <img src="images/pic.png" alt="pic" />
              </div>

              <div className="info_div1" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
