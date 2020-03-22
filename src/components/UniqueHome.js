import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UniqueHome extends Component {
  render() {
    return (
      <div className="container">
        <div className="center-section">
          <div className="row justify-content-center">
            <Link to="/search">
              <img
                src="/Search.png"
                alt="logo"
                height="180px"
                className="text-right"
              />
            </Link>
            <Link to="/shop">
              <img
                src="/Shop.png"
                alt="logo"
                height="180px"
                className="text-left"
              />
            </Link>
          </div>
          <div className="row justify-content-center align-items-center">
            <Link to="/hospitals">
              <img
                src="/Hospitals.png"
                alt="logo"
                height="180px"
                className="text-right"
              />
            </Link>
            <Link to="/">
              <img
                src="/icon.png"
                alt="logo"
                height="200px"
                className="main-logo text-center"
              />
            </Link>
            <Link to="/doctors">
              <img
                src="/Doctors.png"
                alt="logo"
                height="180px"
                className="text-left"
              />
            </Link>
          </div>
          <div className="row justify-content-center">
            <Link to="/blogs">
              <img
                src="/Blogs.png"
                alt="logo"
                height="180px"
                className="text-right"
              />
            </Link>
            <Link to="/blogs">
              <img
                src="/Videos.png"
                alt="logo"
                height="180px"
                className="text-left"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
