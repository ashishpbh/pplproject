import React, { Component } from "react";
import ReactDOM from "react-dom";
var moment = require("moment");
var lastIndex = 2;
var k = [];
class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singlePostResponse: [],
      comment: "",
      like: "",
      commentResponse: [],
      likeResponse: [],
      likeUpdated: false
    };
  }

  handleDislike = event => {
    event.preventDefault();
    var user = localStorage.getItem("userName");
    var dislike = {
      dislikeBy: "ashu",
      postId: this.props.match.params.imgId
    };

    console.log("disliked data", JSON.stringify(dislike));
    fetch("http://localhost:8081/timeline/dislike", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dislike)
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        //this.setState({ likeUpdated: false });

        var _id = this.props.match.params.imgId;
        var allData = {
          _id: _id
        };
        console.log("this is all data", JSON.stringify(allData));
        fetch("http://localhost:8081/timeline/singlePost", {
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
            console.log("responseJson", responseJson);

            this.setState({
              singlePostResponse: responseJson,
              commentResponse: responseJson[0].comment,
              likeUpdated: false
            });
            console.log(
              "it is single fetch post on dddddddddddddddddddddd dislike from all data response:",
              this.state.singlePostResponse
            );
          })
          .catch(error => {
            console.log("err this is", error);
          });
        console.log(
          "dislike ddddddddddddddddddddddddddddddddddddd response",
          responseJson
        );
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };

  handleLike = event => {
    event.preventDefault();
    var user = localStorage.getItem("userName");
    var like = {
      likedBy: "ashu",
      postId: this.props.match.params.imgId
    };
    console.log("this is likes all Data", JSON.stringify(like));
    fetch("http://localhost:8081/timeline/addlike", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(like)
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        // this.setState({ likeUpdated: true });
        var _id = this.props.match.params.imgId;
        var allData = {
          _id: _id
        };
        console.log("this is all data", JSON.stringify(allData));
        fetch("http://localhost:8081/timeline/singlePost", {
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
            console.log("responseJson", responseJson);

            this.setState({
              singlePostResponse: responseJson,
              commentResponse: responseJson[0].comment,
              likeUpdated: true
            });
            console.log(
              "it is single fetch post on like ssssssssssssssssssssssssssssssssssssresponse:",
              this.state.singlePostResponse
            );
          })
          .catch(error => {
            console.log("err this is", error);
          });

        console.log(
          "responseJson aaaaaaaaaaaaaaaaaaaaaaaaof like",
          responseJson
        );
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };

  handleOnChange = event => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value
    }));
  };

  handleOnSubmit = event => {
    event.preventDefault();
    console.log("local storage of username ", localStorage.getItem("userName"));
    var user = "ashu";
    var comments = {
      comment: this.state.comment,
      commentedBy: user,
      postId: this.props.match.params.imgId
    };
    console.log("this is comments all Data", JSON.stringify(comments));
    fetch("http://localhost:8081/timeline/addComment", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comments)
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        console.log("responseJson", responseJson);

        console.log("comment upload", responseJson);
      })
      .catch(error => {
        console.log("err this is", error);
      });

    var _id = this.props.match.params.imgId;
    var allData = {
      _id: _id
    };
    console.log("this is all data", JSON.stringify(allData));
    fetch("http://localhost:8081/timeline/singlePost", {
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
        console.log("responseJson", responseJson);

        this.setState({
          singlePostResponse: responseJson,
          commentResponse: responseJson[0].comment
        });
        console.log("all comment:", this.state.commentResponse);
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };

  componentDidMount() {
    var _id = this.props.match.params.imgId;
    var allData = {
      _id: _id
    };
    console.log("this is all data", JSON.stringify(allData));
    fetch("http://localhost:8081/timeline/singlePost", {
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
        console.log("responseJson", responseJson);

        this.setState({
          singlePostResponse: responseJson,
          commentResponse: responseJson[0].comment
        });
        console.log("all comment:", this.state.commentResponse);
      })
      .catch(error => {
        console.log("err this is", error);
      });
  }

  render() {
    {
      console.log(
        "local storage id of user in single post ",
        localStorage.getItem("_id")
      );
      console.log(
        "local storage of username ",
        localStorage.getItem("userName")
      );
      console.log("it is image id", this.props.match.params.imgId);

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
      console.log(
        "showall comment is called",
        this.state.commentResponse.slice(0, lastIndex)
      );
    }
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Singal Post</title>

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
                  <img src="/images/pic_small.png" />
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

        <div className="header">
          <div className="header_lft">
            <div className="logo">
              <a href="#">
                <img src="/images/logo.png" />
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
                <img src="/images/pic.png" />{" "}
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
                  <img src="/images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="/images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="#">Upload Post</a>{" "}
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="/images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="/images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="#">Invite Friends</a>{" "}
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list">
                  <ul>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_01.png" alt="up" />
                        </span>{" "}
                        CATS
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_02.png" alt="up" />
                        </span>{" "}
                        Dogs
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_03.png" alt="up" />
                        </span>{" "}
                        Birds
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_04.png" alt="up" />
                        </span>{" "}
                        Rabbit
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_05.png" alt="up" />
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
                      <img src="/images/feat_img1.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="/images/feat_img2.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="/images/feat_img3.png" alt="image" />
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
              {/*................................................*/}
              <div className="contnt_2">
                {this.state.singlePostResponse.map(p => (
                  <div className="div_a">
                    <div className="div_title">{p.description}</div>
                    <div className="btm_rgt">
                      <div className="btm_arc"> {p.category}</div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft">
                        <img src="/images/img_6.png" />
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
                            <a href="#">
                              <span className="btn_icon">
                                <img src="/images/icon_001.png" alt="share" />
                              </span>
                              Share
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="btn_icon">
                                <img src="/images/icon_002.png" alt="share" />
                              </span>
                              Flag
                            </a>
                          </li>
                          <li>
                            {console.log(
                              "state of like " + this.state.likeUpdated
                            )}
                            <a
                              href="#"
                              onClick={
                                this.state.likeUpdated
                                  ? this.handleDislike
                                  : this.handleLike
                              }
                            >
                              <span className="btn_icon">
                                <img src="/images/icon_003.png" alt="share" />
                              </span>
                              {p.like.length + " "}

                              {this.state.likeUpdated ? "Unlike" : "Like"}
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span className="btn_icon">
                                <img src="/images/icon_004.png" alt="share" />
                              </span>
                              {p.comment.length + " "}
                              Comments
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="contnt_3">
                {this.state.commentResponse.map(p => (
                  <ul>
                    <li>
                      <div class="list_image">
                        <div class="image_sec">
                          <img src="/images/post_img.png" />
                        </div>
                        <div class="image_name">{p.commentBy}</div>
                      </div>
                      <div class="list_info">{p.comment}</div>
                    </li>
                  </ul>
                ))}

                <ul>
                  <li>
                    {/*..............................................................*/}
                    <div className="cmnt_div1">
                      <input
                        name="comment"
                        type="text"
                        placeholder="Enter your Comment"
                        className="cmnt_bx1"
                        value={this.state.comment}
                        style={{
                          color: "black",
                          borderColor: "2px solid red"
                        }}
                        onChange={this.handleOnChange}
                      />
                      <input
                        type="submit"
                        className="sub_bttn1"
                        onClick={this.handleOnSubmit}
                        defaultValue="Submit Comment"
                      />
                    </div>
                    {/*                                                      */}
                  </li>
                </ul>
              </div>
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
                <a href="#">
                  <img src="/images/social_1.png" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_2.png" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_3.png" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/social_4.png" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default SinglePost;
