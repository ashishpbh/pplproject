import React, { Component } from "react";
import { Link } from "react-router-dom";

var moment = require("moment");
var lastIndex = 2;

class SinglePost extends Component {
  constructor(props) {
    console.log("it is called from time line");
    super(props);
    this.state = {
      singlePostResponse: [],
      comment: "",
      like: "",
      error: false,
      commentResponse: [],
      likeResponse: [],
      likeUpdated: "like",
      allResponse: []
    };
  }

  handleLike = event => {
    event.preventDefault();
    var user = localStorage.getItem("userName");
    var like = {
      likedBy: user,
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
        console.log("liked data on ...........", responseJson);
        if (responseJson.msg === "false") {
          console.log("pulll ho gya");
          this.setState({ likeUpdated: "like" });
        } else {
          console.log("push ho gya");
          this.setState({ likeUpdated: "Unlike" });
        }
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
            console.log(
              "it is single fetch post on like ssssssssssssssssssssssssssssssssssssresponse:",
              this.state.singlePostResponse
            );
          })
          .catch(error => {
            console.log("err this is", error);
          });
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
    if (this.state.comment.length > 0) {
      this.setState({
        error: true
      });
    }
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.setState({
      error: false
    });
    var user = localStorage.getItem("userName");
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
          commentResponse: responseJson[0].comment,
          comment: ""
        });
        console.log("all comment:", this.state.commentResponse);
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };

  componentDidMount() {
    var _id = this.props.match.params.imgId;
    console.log(
      "local storage of username in Single component did mount call hua kya post",
      localStorage.getItem("userName")
    );
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
    console.log(
      "local storage id of user in single post img id ",
      localStorage.getItem("_id")
    );
    console.log(
      "local storage of username in Single post",
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

    return (
      <div>
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
                  <img src="/images/img_6.png" alt={p.category} />
                  {p.userName}
                </div>
                <div className="div_top_rgt">
                  <span className="span_date">
                    {moment(p.time).format("DD")}
                    {"-" + months[moment(p.time).months()]}
                    {"-" + moment(p.time).format("YYYY")}
                  </span>
                  <span className="span_time">
                    {moment(p.time).format("hh:mm A")}
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
                          <img src="/images/icon_001.png" alt="share" />
                        </span>
                        Share
                      </a>
                    </li>
                    <li>
                      <a onClick={this.handleLike}>
                        <span className="btn_icon">
                          <img src="/images/icon_002.png" alt="share" />
                        </span>
                        {this.state.likeUpdated}
                      </a>
                    </li>
                    <li>
                      {console.log("state of like " + this.state.likeUpdated)}
                      <a>
                        <span className="btn_icon">
                          <img src="/images/icon_003.png" alt="share" />
                        </span>
                        {p.like.length + " "}
                      </a>
                    </li>
                    <li>
                      <a>
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
                    <img src="/images/post_img.png" alt="ImageShown" />
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
                  required
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
                  disabled={!this.state.error}
                />
              </div>
              {/*                                                      */}
            </li>
          </ul>

          <div className="clear" />
        </div>
      </div>
    );
  }
}

export default SinglePost;
