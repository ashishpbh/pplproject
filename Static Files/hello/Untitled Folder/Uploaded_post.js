import React, { Component } from "react";

import { Link } from "react-router-dom";

import TimeLineLeftContent1 from "./TimelineLeftContent1";
var moment = require("moment");
class Uploaded_post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allResponse: [],
      stateLiked: false
    };
  }

  componentDidMount() {
    console.log("all response in component did mount", this.props.allResponse);
    var k = localStorage.getItem("categoryName");
    console.log("category Name", this.props.categoryName);
    console.log(k, "value of category through local storage");
    this.setState({
      allResponse: this.props.allResponse
    });
    fetch("http://localhost:8081/timeline/all_uploads", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
      // body: JSON.stringify(allData)
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        this.setState({
          allResponse: responseJson
        });
        console.log("responseJson", responseJson.length);
      })
      .catch(error => {
        console.log("err this is", error);
      });
  }

  handleLatestFirst = event => {
    fetch("http://localhost:8081/timeline/latestFirst", {})
      .then(response => response.json())
      .then(responseJson => {
        //response from db
        this.setState({
          allResponse: responseJson,
          latestFirst: true
        });
        console.log("responseJson", responseJson);
      })
      .catch(error => {
        console.log("errThis is", error);
      });
  };
  handleMostCommented = event => {
    event.preventDefault();
    console.log("handle most commented called");
    this.setState({
      allResponse: this.state.allResponse.sort((a, b) => {
        if (a.comment.length > b.comment.length) return -1;
        else return 1;
      })
    });
    console.log(this.state.allResponse);
  };

  handleOldestFirst = event => {
    console.log("oldest first method is called");

    event.preventDefault();
    fetch("http://localhost:8081/timeline/oldestFirst", {})
      .then(response => response.json())
      .then(responseJson => {
        //response from db
        this.setState({
          allResponse: responseJson,
          latestFirst: true
        });
        console.log("responseJson oldest First ", responseJson);
      })
      .catch(error => {
        console.log("errThis is", error);
      });
  };

  render() {
    console.log(this.state.allResponse, "before filter update");

    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return (
      <div>
        <TimeLineLeftContent1 myUpload={this.props.myUpload} />

        {/* <div className="navbar navbar-inverse navbar-fixed-top">
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
                  <img src="images/pic_small.png" />
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
                    <a tabIndex={-1} href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Message Box
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Change Language
                    </a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a tabIndex={-1} href="#">
                      <input type="text" placeholder="search" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active">
                    {" "}
                    <a href>Home</a>{" "}
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
    */}
        {/* <div className="header">
          <div className="header_lft">
            <div className="logo">
              <a href="#">
                <img src="images/logo.png" />
              </a>
            </div>
            <div className="navigatn">
              <ul>
                <li>
                  <a href="#" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#"> E-Coupons </a>
                </li>
                <li>
                  <a href="#">E-Brands </a>
                </li>
                <li>
                  <a href="#"> Resuse Market </a>
                </li>
                <li>
                  <a href="#"> Lost and Found</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header_rgt">
            <div className="flag_div">
              <img src="images/flag.png" />
            </div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box">
              <a href="#">
                <span className="msg_count">100</span>
              </a>
            </div>
            <div className="info_div">
              <div className="image_div">
                {" "}
                <img src="images/pic.png" />{" "}
              </div>
              <div className="info_div1">Me</div>
            </div>
          </div>
        </div>
  */}

        {/*<div className="content_rgt">
              {/*<div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="#">Upload Post</a>{" "}
</div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="#">Invite Friends</a>{" "}
              </div>
*/}

        {/*<div className="rght_cate_hd" id="rght_cat_bg">
                Categories
              </div>
              <div className="rght_list">
                {/*........................................................*/}
        {/*    {this.state.allCategory.map(p => (
                  <ul>
                    <li>
                      <a
                        href="#"
                        onClick={this.categoryFilter}
                        name={p.categoryName}
                      >
                        <span className="list_icon">
                          <img
                            src={`http://localhost:8081/category/${
                              p.categoryImg
                            }`}
                            alt="up"
                            height="50px"
                            width="50px"
                          />
                        </span>{" "}
                        {p.categoryName}
                      </a>
                    </li>
                  </ul>
                ))}
                {/*............................................vvvvvvvvvvvvvv*/}
        {/*  </div>*/}

        {/*<div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">
                  Featured
                </div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img1.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img2.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img3.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
                
              </div>*/}

        {/*<div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends
                    </li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged
                    </li>
                  </ul>
                </div>
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="images/timeline_img1.png" />
                      <div className="profile_text">
                        <a href="#">Change Profile Pic</a>
                      </div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div">
                        <a href="#">
                          Edit <img src="images/timeline_img.png" />
                        </a>
                      </div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">Stefiney Gibbs</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">Female</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">
                              This is an example of a comment. You can create as
                              many comments like this one or sub comments as you
                              like and manage all of your content inside
                              Account.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li>
                        <a href="#" className="active">
                          Timeline{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">About </a>
                      </li>
                      <li>
                        <a href="#">Album</a>
                      </li>
                      <li>
                        <a href="#"> Pets</a>
                      </li>
                      <li>
                        <a href="#">My Uploads </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              */}

        {/*......................................................................................./3456*/}
        <div className="contnt_2" id="uploaded">
          <ul>
            {this.props.allResponse.map(p => (
              //....................................................................................

              <div>
                <div className="div_a">
                  <Link to={`/timeline/${p._id}`}>
                    <div className="div_title">{p.description}</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">{p.category}</div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft">
                        <img src="images/img_6.png" alt="imageHere" />
                        {p.userName}
                      </div>
                      <div className="div_top_rgt">
                        <span className="span_date">
                          {moment(p.time).format("DD")}
                          {"-" + months[moment(p.time).months()]}
                          {"-" + moment(p.time).format("YYYY")}
                        </span>
                        <span className="span_time">
                          {moment(p.time).hour() > 12
                            ? moment(p.time).hour() - 12
                            : moment(p.time).hour()}{" "}
                          {":" + moment(p.time).format("MM:A")}
                        </span>
                      </div>
                    </div>
                    <div className="div_image">
                      <img
                        alt="pet"
                        // src={`uploads/${
                        //   this.props.location.state.response.selectedFiles
                        // }`}
                        src={`http://localhost:8081/uploads/${p.selectedFiles}`}
                      />
                    </div>
                  </Link>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li>
                          <a>
                            <span className="btn_icon">
                              <img src="images/icon_001.png" alt="share" />
                            </span>
                            Share
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="btn_icon">
                              <img src="images/icon_002.png" alt="share" />
                            </span>
                            Flag
                          </a>
                        </li>
                        <li>
                          <a name={p._id} onClick={this.props.handleLike}>
                            <span className="btn_icon">
                              <img src="images/icon_003.png" alt="share" />
                            </span>
                            {p.like.length + " "}
                            Likes
                          </a>
                        </li>
                        <li>
                          <a>
                            <span className="btn_icon">
                              <img src="images/icon_004.png" alt="share" />
                            </span>
                            {p.comment.length + " "} Comments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              ///iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii

              //<li key={p._id}>{p._id}</li>
            ))}
          </ul>
        </div>
        {/*<div className="footr">
          <div className="footr_lft">
            <div className="footer_div1">
              Copyright © Pet-Socail 2014 All Rights Reserved
            </div>
            <div className="footer_div2">
              <a href="#">Privacy Policy </a>|{" "}
              <a href="#"> Terms &amp; Conditions</a>
            </div>
          </div>
          <div className="footr_rgt">
            <ul>
              <li>
                <a href="#">
                  <img src="images/social_1.png" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="images/social_2.png" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="images/social_3.png" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="images/social_4.png" />
                </a>
              </li>
            </ul>
          </div>
        </div>
                */}
      </div>
    );
  }
}

export default Uploaded_post;
