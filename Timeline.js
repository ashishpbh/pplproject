import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import Uploaded_post from "./Uploaded_post";
import Select from "react-select";
import SinglePost from "./SinglePost";

class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      email: "ashish@gmail.com",
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
      allResponseFrom:[],
      allResponse:[]
  
    };
  }

  categoryFilter = event => {
    let category_clicked = event.target.name;
    console.log("category filter is called", category_clicked);
   
    console.log("sghjklkshweeeeeeeeeeeeeeeeeeeeeek", category_clicked);
    var allData = {
      email: "ashish@gmail.com"
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
        console.log("alll response after hoone ke baad filter",this.state.allResponse);
      })
      .catch(error => {
        console.log("err this is", error);
      });




  };

  handleAddCategoryClick = () => {
    this.setState({ handleAddCategoryClickStatus: true });
  };
  componentDidMount() {
    
    <Route path="/timeline" component={Uploaded_post} />;



   





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

  //upload submit //......................................................
  handleSubmit = e => {
    e.preventDefault();
    let formData = new FormData();
    console.log("on drop onsubmit state", this.state.files[0]);
    //formData.append("myFile", this.state.myFile[0]);
    formData.append("files", this.state.files[0]);
    console.log("file drop is handle submit here", formData);
    formData.append("email", this.state.email);
    formData.append("description", this.state.description);
    formData.append("category", this.state.selectedOption);  

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
  };

  render() {
    const { selectedOption } = this.state;

    localStorage.getItem("userName");
    console.log(localStorage.getItem("userName"));
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
        <div className="header">
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
                <a href="#upload" onClick={this.handleUpload}>
                  Upload Post
                </a>{" "}
              </div>
              <div className="rght_btn" onClick={this.handleAddCategoryClick}>
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="#addCategory">Add Category</a>
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
                            >
                              <ul>
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
                            name="categoryAdd"
                            onChange={this.category_handleChange}
                            placeholder="Enter category"
                            value={this.state.categoryAdd}
                          />
                          <p style={{ color: "red" }}>
                            {/*this.state.categoryAdd*/}
                          </p>
                        </li>
                        <li>
                          <input
                            type="submit"
                            value="Submit"
                            onClick={this.handleAddCategory}
                          />
                        </li>
                      </ul>
                    </form>
                  ) : (
                    <div>
                      {this.state.allCategory.map(p => (
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
                    </div>
                  )}

                  {/*....add category here....add category h.....................................*/}
                </div>
                <div className="rght_list">
                  {/*........................................................*/}

                  {/*............................................vvvvvvvvvvvvvv*/}
                </div>
              </div>

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
                            </div>*/}
            </div>
            <div className="content_lft">
              <div className="contnt_1" id="upload">
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

              {/*



              {this.state.uploadRequest ? (
                <div className="contnt_2" id="upload">
                  {/*..................here is your  dropzone and image upload section.............................*/}
              {/* <form id="anything">
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
                        </div>}
              ) : (
                <div className="contnt_2">
                  <Uploaded_post />
                </div>
              )}
            */}

              <div className="contnt_2" id="uploaded" />
              {console.log("hjjjjjjjjjjjjhhhhhhhhhhhhhhhhhhhjjj",this.state.allResponse)}
              <Uploaded_post allResponse={this.state.allResponse}/>
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
      </div>
    );
  }
}
<Timeline />;
export default Timeline;
