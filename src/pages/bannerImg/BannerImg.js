import React from 'react'
import "../home/home.css"

const BannerImg = () => {
  return (
    <div className="banner">
        <img
          src={require("../../assets/images/banner_img.png")}
          alt="Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Welcome to Our Website UtsavKiBhoj</h1>
          <p></p>
        </div>
      </div>
  )
}

export default BannerImg;
