import React, { Component } from "react";

var moment = require("moment");

class IndexPpl extends Component {
  constructor() {
    super();
    this.state = {
      allResponse: [],
      latestFirst: true
    };
  }

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

  componentDidMount() {
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
  }

  handleOldestFirst = event => {
    event.preventDefault();
    fetch("http://localhost:8081/timeline/oldestFirst", {})
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

  render() {
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
                  <img src="images/pic_small.png" alt="image" />
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
        <div className="header">
          <div className="header_lft">
            <div className="logo">
              <a>
                <img src="images/logo.png" alt="image" />
              </a>
            </div>
            <div className="navigatn">
              <ul>
                <li>
                  <a className="active">Home</a>
                </li>
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
              <img src="images/flag.png" />
            </div>
            <input type="text" placeholder="Search" className="txt_box" />
            <div className="msg_box">
              <a>
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
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a>Upload Post</a>{" "}
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a>Invite Friends</a>{" "}
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list">
                  <ul>
                    <li>
                      <a>
                        <span className="list_icon">
                          <img src="images/icon_01.png" alt="up" />
                        </span>{" "}
                        CATS
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="list_icon">
                          <img src="images/icon_02.png" alt="up" />
                        </span>{" "}
                        Dogs
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="list_icon">
                          <img src="images/icon_03.png" alt="up" />
                        </span>{" "}
                        Birds
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="list_icon">
                          <img src="images/icon_04.png" alt="up" />
                        </span>{" "}
                        Rabbit
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="list_icon">
                          <img src="images/icon_05.png" alt="up" />
                        </span>{" "}
                        Others
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">
                  Featured
                </div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img1.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Cats</div>
                    </div>
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
            </div>
            <div className="content_lft">
              <div className="contnt_1">
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
                <div className="post_div">
                  <div className="post_list">
                    <ul>
                      <li>
                        <a onClick={this.handleLatestFirst}>
                          <span className="list_img">
                            <img src="images/img_1.png" />
                          </span>
                          Latest First
                        </a>
                      </li>
                      <li>
                        <a onClick={this.handleOldestFirst}>
                          <span className="list_img">
                            <img src="images/img_2.png" />
                          </span>
                          Oldest First
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="list_img">
                            <img src="images/img_3.png" />
                          </span>
                          Most Pet
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="list_img">
                            <img src="images/img_4.png" />
                          </span>
                          Most Clicks
                        </a>
                      </li>
                      <li>
                        <a onClick={this.handleMostCommented}>
                          <span className="list_img">
                            <img src="images/img_5.png" />
                          </span>
                          Most Commented
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="post_txt">4 New Post Updates</div>
                </div>
              </div>
              <div className="contnt_2">
                {/*.......................................................................................*/}
                {this.state.allResponse.map(p => (
                  <div className="div_a">
                    <div className="div_title">{p.description}</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">{p.category}</div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft">
                        <img src="images/img_6.png" />
                        Steave Waugh
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
                        src={`http://localhost:8081/uploads/${p.selectedFiles}`}
                        alt="pet"
                      />
                    </div>
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
                            <a>
                              <span className="btn_icon">
                                <img src="images/icon_004.png" alt="share" />
                              </span>
                              {p.comment.length} Comments
                            </a>
                          </li>
                          <li>
                            <a>
                              <span className="btn_icon">
                                <img src="images/icon_003.png" alt="share" />
                              </span>
                              Likes
                            </a>
                          </li>
                          <div
                            className="like_count"
                            style={{ marginRight: 10 }}
                          >
                            <span className="lft_cnt" />
                            <span className="mid_cnt">{p.like.length}</span>
                            <span className="rit_cnt" />
                          </div>
                          <li>
                            <a>
                              <span className="btn_icon">
                                <img src="images/icon_003.png" alt="share" />
                              </span>
                              Unlike
                            </a>
                          </li>
                          <div className="like_count">
                            <span className="lft_cnt" />
                            <span className="mid_cnt">4</span>
                            <span className="rit_cnt" />
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/*////////////////////////////////*/}
            </div>
          </div>
          <div className="clear" />
        </div>
        <div className="footr">
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
                <a>
                  <img src="images/social_1.png" />
                </a>
              </li>
              <li>
                <a>
                  <img src="images/social_2.png" />
                </a>
              </li>
              <li>
                <a>
                  <img src="images/social_3.png" />
                </a>
              </li>
              <li>
                <a>
                  <img src="images/social_4.png" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default IndexPpl;
