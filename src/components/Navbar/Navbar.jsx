import React from "react";
import banner from "../../assets/images/slider1.jpg";
import "./Navbar.css";

import thumb1 from "../../assets/images/anh1.jpg";
import thumb2 from "../../assets/images/anh2.jpg";
import thumb3 from "../../assets/images/anh3.jpg";
const Navbar = () => {
  return (
    <div className="banner slide">
      <div className="carousel-item active">
        <img src={banner} alt="" />
        <div className="title">
          <h1>Mua sắm đồ dụng cụ thể thao ở Firefly</h1>
          <h3>Giảm giá 50% cho bộ sưu tập giày thể thao</h3>
          <button>Đến cửa hàng ngay</button>
        </div>
      </div>
      {/* <div className="container">
        <div className="list_item">
          <div className="item">
            <a href="" className="dungcu">
              <img src={thumb1} alt="" />
              
            <div className="dungcu">
              <p>Giày thể thao</p>
            </div>
            </a>
          </div>
          <div className="item">
            <a href="" className="">
              <img src={thumb2} alt="" />
              
            <div className="giay">
              <p>Giày thể thao</p>
            </div>
            </a>
          </div>
          <div className="item">
            <a href="" className="">
              <img src={thumb3} alt="" />
              
            <div className="aoquan">
              <p>Giày thể thao</p>
            </div>
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
