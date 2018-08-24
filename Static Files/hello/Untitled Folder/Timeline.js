import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import Uploaded_post from "./Uploaded_post";
import Select from "react-select";
import SinglePost from "./SinglePost";
import Footer from "./Footer";
import Header from "./Header";
import RightFeatured from "./RightFeatured";

class Timeline extends Component {
  constructor() {
    console.log("it is called");
    super();
    this.state = {
      description: "",
      category: "",
      categoryAdd: "",
      files: [],
      categoryImg: [],
      selectedOption: null,
      options: [],
      uploadRequest: false,
      allCategory: [],
      handleAddCategoryClickStatus: false,
      categoryaddStatus: false,
      allResponseFrom: [],
      allResponse: [],
      category_clicked: ""
    };
  }
  handleMyUpload = event => {
    console.log("handlemyupload is called");
    var handleMyUpload = this.state.allResponse.filter(value => {
      return value.userName === localStorage.getItem("userName");
    });
    console.log("myupload ...............", handleMyUpload);
    this.setState({
      allResponse: handleMyUpload
    });
  };
  categoryFilter = event => {
    let category_clicked = event.target.name;

    this.setState({ category_clicked: category_clicked });
    var userName = localStorage.getItem("userName");

    localStorage.setItem("categoryName", this.state.category_clicked);
    console.log("category filter is called", category_clicked);

    console.log("sghjklkshweeeeeeeeeeeeeeeeeeeeeek", category_clicked);
    var allData = {
      userName: userName
    };
    console.log("this is all data", JSON.stringify(allData));
    fetch("http://localhost:8081/timeline/all_uploads", {
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
        console.log("responseJson", responseJson.length);

        this.setState({
          allResponseFrom: responseJson
        });
        var all = this.state.allResponseFrom.filter(value => {
          return value.category === category_clicked;
        });
        this.setState({
          allResponse: all
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };

  handleLike = () => {
    console.log("handlelike is called");
  };

  handleAddCategoryClick = () => {
    this.setState({ handleAddCategoryClickStatus: true });
  };
  componentDidMount() {
    fetch("http://localhost:8081/category/showCategory", {
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
        console.log("responseJson", responseJson.length);

        this.setState({
          allCategory: responseJson,
          options: responseJson
        });
      })
      .catch(error => {
        console.log("err this is", error);
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
        console.log("responseJson", responseJson.length);

        this.setState({
          allResponse: responseJson
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });

    //..................................................................

    //
  }

  handleChangeSelect = selectedOption => {
    this.setState({ selectedOption: selectedOption.target.value });
    console.log(`Option selected:`, selectedOption);
  };

  ///for files for category post
  handleUpload = () => {
    console.log("it is called");
    this.setState({
      uploadRequest: true
    });
  };

  onDropCategory = categoryImg => {
    this.setState({
      categoryImg
    });
    console.log("on drop category img state", this.state.categoryImg[0]);
  };

  //category change................................./
  category_handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name);
    //console.log("on drop event change  state", this.state.category_img[0]);
  };

  //category change..........................submit............................./

  handleAddCategory = e => {
    e.preventDefault();
    let formData = new FormData();
    console.log("on drop onsubmit state", this.state.categoryImg[0]);
    formData.append("categoryImg", this.state.categoryImg[0]);
    console.log("file drop is handle submit here", formData);
    formData.append("categoryAdd", this.state.categoryAdd);
    console.log("add category", this.state.categoryAdd);
    console.log("add category img", this.state.categoryImg[0]);
    fetch("http://localhost:8081/category/addCategory", {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        console.log("responseJson", responseJson);

        this.props.history.push({
          pathname: "/timeline",
          state: { email: this.state.email, response: responseJson }
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });

    fetch("http://localhost:8081/category/showCategory", {
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
        console.log("responseJson", responseJson.length);

        this.setState({
          allCategory: responseJson,
          options: responseJson,
          handleAddCategoryClickStatus: false
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };

  //upload post  change/............................................../,,,,,,,,,,,,/
  onDrop = files => {
    this.setState({
      files
    });
    console.log("on drop state", this.state.files[0]);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log("on drop event change  state", this.state.files[0]);
  };

  handleLike = event => {
    console.log("clicked image id", event.target.name);
    event.preventDefault();
    this.setState({ stateLiked: true });
    var user = localStorage.getItem("userName");
    var like = {
      likedBy: user,
      postId: event.target.name
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
        var allData = {};
        // console.log("this is all data", JSON.stringify(allData));

        // inserted data in in db
      })
      .catch(error => {
        console.log("err this is", error);
      });
    fetch("http://localhost:8081/timeline/all_uploads", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        console.log("responseJson", responseJson);

        this.setState({
          allResponse: responseJson
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };
  //upload submit //......................................................
  handleSubmit = e => {
    e.preventDefault();
    var userName = localStorage.getItem("userName");
    var email = localStorage.getItem("email");
    let formData = new FormData();
    console.log("on drop onsubmit state", this.state.files[0]);
    //formData.append("myFile", this.state.myFile[0]);
    formData.append("files", this.state.files[0]);
    console.log("file drop is handle submit here", formData);
    formData.append("email", email);

    formData.append("description", this.state.description);
    formData.append("category", this.state.selectedOption);
    formData.append("userName", userName);

    fetch("http://localhost:8081/timeline/timelinepost", {
      method: "post",
      body: formData
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        console.log("responseJson", responseJson);

        this.props.history.push({
          pathname: "/timeline",
          state: { email: this.state.email, response: responseJson }
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });
    this.setState({ uploadRequest: false });

    fetch("http://localhost:8081/timeline/all_uploads", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        // inserted data in in db
        console.log("responseJson", responseJson);

        this.setState({
          allResponse: responseJson
        });
      })
      .catch(error => {
        console.log("err this is", error);
      });
  };

  handleLatestFirst = event => {
    var latest = this.state.allResponse.sort(function(a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.time) - new Date(a.time);
    });
    console.log("latest first", latest);
    this.setState({
      allResponse: latest
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
    this.setState({
      allResponse: this.state.allResponse.reverse(),
      latestFirst: true
    });
    console.log("oldest first method is called");
  };

  render() {
    const { selectedOption } = this.state;
    localStorage.getItem("userName");
    localStorage.getItem("userName");
    {
      if (localStorage.getItem("userName") == null) {
        this.props.history.push({
          pathname: "/"
          //state: { email: this.state.email, response: responseJson }
        });
      }
    }
    console.log(localStorage.getItem("userName"));
    console.log(localStorage.getItem("email"));
    return (
      <div>
        <Header props={this.props} />
        <div className="container">
          {console.log("ccccccccccccccccccc", this.props)}
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
                <a onClick={this.handleUpload}>Upload Post</a>{" "}
              </div>
              <div className="rght_btn" onClick={this.handleAddCategoryClick}>
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a>Add Category</a>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list" id="addCategory">
                  {/*add category here.......................add category here.......................................*/}

                  {this.state.handleAddCategoryClickStatus ? (
                    <form id="anotherform">
                      <br />
                      <br />
                      <ul>
                        <section>
                          <div className="dropzone">
                            <Dropzone
                              onDrop={this.onDropCategory}
                              method="post"
                              content-type="multipart/form-data"
                              name="categoryImg"
                              type="file"
                              style={{
                                position: "relative",
                                width: "50px",
                                height: "50px",
                                border: "2px dashed red"
                              }}
                            >
                              {this.state.categoryImg.map(f => (
                                <li key={f.name}>
                                  <img
                                    src={f.preview}
                                    alt="uploaded image shown here"
                                    height="200px"
                                    width="200px"
                                  />
                                </li>
                              ))}
                            </Dropzone>
                            <input
                              type="text"
                              name="categoryAdd"
                              onChange={this.category_handleChange}
                              placeholder="Enter category"
                              value={this.state.categoryAdd}
                              style={{ float: "left", marginLeft: "60px" }}
                            />

                            <li>
                              <input
                                type="submit"
                                value="Submit"
                                onClick={this.handleAddCategory}
                              />
                            </li>
                            <p style={{ color: "red" }}>
                              {/*this.state.categoryAdd*/}
                            </p>
                          </div>
                          <aside />
                        </section>
                      </ul>
                    </form>
                  ) : (
                    <span>
                      {this.state.allCategory.map(p => (
                        <ul>
                          <li>
                            <a
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
                    </span>
                  )}

                  {/*....add category here....add category h.....................................*/}
                </div>
                <div className="rght_list">
                  {/*........................................................*/}

                  {/*............................................vvvvvvvvvvvvvv*/}
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

            {this.state.uploadRequest ? (
              <div className="content_lft">
                <div className="contnt_2" id="upload">
                  {/*..................here is your  dropzone and image upload section.............................*/}
                  <form id="anything">
                    <br />
                    <br />
                    <ul>
                      <section>
                        <div className="dropzone">
                          <Dropzone
                            onDrop={this.onDrop}
                            method="post"
                            content-type="multipart/form-data"
                            name="files"
                            type="file"
                          >
                            <ul>
                              {this.state.files.map(f => (
                                <li key={f.name}>
                                  <img
                                    src={f.preview}
                                    alt="uploaded image shown here"
                                    height="200px"
                                    width="200px"
                                  />
                                </li>
                              ))}
                            </ul>
                          </Dropzone>
                        </div>
                        <aside />
                      </section>
                    </ul>

                    <ul>
                      <li>
                        <input
                          type="text"
                          name="description"
                          placeholder="Enter post description"
                          onChange={this.handleChange}
                          value={this.state.description}
                        />
                        <p style={{ color: "red" }} />
                      </li>

                      <li>
                        <select
                          value={selectedOption}
                          onChange={this.handleChangeSelect}
                        >
                          {this.state.options.map(a => {
                            return (
                              <option value={a.categoryName}>
                                {a.categoryName}
                              </option>
                            );
                          })}
                        </select>
                      </li>
                      <br />

                      <li>
                        <input
                          type="submit"
                          value="Submit"
                          onClick={this.handleSubmit}
                        />
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            ) : (
              <div className="content_lft" id="singlePost">
                {this.props.location.pathname.length < 13 ? (
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
                ) : (
                  <h1 />
                )}
                <Switch>
                  <Route
                    exact
                    path="/timeline"
                    render={props => (
                      <Uploaded_post
                        {...props}
                        allResponse={this.state.allResponse}
                        categoryName={this.state.category_clicked}
                        handleLike={this.handleLike}
                        myUpload={this.handleMyUpload}
                      />
                    )}
                  />
                  <Route path="/timeline/:imgId" component={SinglePost} />
                </Switch>
              </div>
            )}

            {/*content left end here*/}
          </div>
          <div className="clear" />
        </div>
        <Footer />
      </div>
    );
  }
}
<Timeline />;
export default Timeline;
