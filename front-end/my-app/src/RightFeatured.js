import React, { Component } from "react";

class RightFeatured extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div classname="rght_cate">
        <div classname="rght_cate_hd" id="opn_cat_bg">
          Featured
        </div>
        <div classname="sub_dwn">
          <div classname="feat_sec">
            <div classname="feat_sec_img">
              <img src="images/feat_img1.png" alt="image" />
            </div>
            <div classname="feat_txt">Lorem Ipusum Text</div>
            <div classname="btm_rgt">
              <div classname="btm_arc">Cats</div>
            </div>
          </div>
          <div classname="feat_sec">
            <div classname="feat_sec_img">
              <img src="images/feat_img2.png" alt="image" />
            </div>
            <div classname="feat_txt">Lorem Ipusum Text</div>
            <div classname="btm_rgt">
              <div classname="btm_arc">Dogs</div>
            </div>
          </div>
          <div classname="feat_sec">
            <div classname="feat_sec_img">
              <img src="images/feat_img3.png" alt="image" />
            </div>
            <div classname="feat_txt">Lorem Ipusum Text</div>
            <div classname="btm_rgt">
              <div classname="btm_arc">Rabbits</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RightFeatured;
