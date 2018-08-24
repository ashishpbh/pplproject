import React, { Component } from "react";

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
      commentResponse: [],
      likeResponse: [],
      likeUpdated: false
    };
  }

  handleDislike = event => {
    event.preventDefault();
    var user = localStorage.getItem("userName");
    var dislike = {
      dislikeBy: user,
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

        //var _id = this.props.match.params.imgId;

        var _id = this.props.location.state.id;
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
        // this.setState({ likeUpdated: true });
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
        console.log(
          "it is single fetch post on like ssssssssssssssssssssssssssssssssssssresponse:",
          this.state.singlePostResponse
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
    console.log(
      "local storage of username in Single post",
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
                          <img src="/images/icon_001.png" alt="share" />
                        </span>
                        Share
                      </a>
                    </li>
                    <li>
                      <a>
                        <span className="btn_icon">
                          <img src="/images/icon_002.png" alt="share" />
                        </span>
                        Flag
                      </a>
                    </li>
                    <li>
                      {console.log("state of like " + this.state.likeUpdated)}
                      <a onClick={this.handleLike}>
                        <span className="btn_icon">
                          <img src="/images/icon_003.png" alt="share" />
                        </span>
                        {p.like.length + " "}

                        {this.state.likeUpdated ? "Unlike" : "Like"}
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

          <div className="clear" />
        </div>
      </div>
    );
  }
}

export default SinglePost;
