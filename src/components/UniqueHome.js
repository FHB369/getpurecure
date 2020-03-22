import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UniqueHome extends Component {
  render() {
    return (
      <div className="container">
        <div className="center-section">
          <div className="row justify-content-center">
            <Link to="/getpurecure/search">
              <img
                src="/getpurecure/Search.png"
                alt="logo"
                height="180px"
                className="text-right"
              />
            </Link>
            <Link to="/getpurecure/shop">
              <img
                src="/getpurecure/Shop.png"
                alt="logo"
                height="180px"
                className="text-left"
              />
            </Link>
          </div>
          <div className="row justify-content-center align-items-center">
            <Link to="/getpurecure/hospitals">
              <img
                src="/getpurecure/Hospitals.png"
                alt="logo"
                height="180px"
                className="text-right"
              />
            </Link>
            <Link to="/getpurecure/">
              <img
                src="/getpurecure/icon.png"
                alt="logo"
                height="200px"
                className="main-logo text-center"
              />
            </Link>
            <Link to="/getpurecure/doctors">
              <img
                src="/getpurecure/Doctors.png"
                alt="logo"
                height="180px"
                className="text-left"
              />
            </Link>
          </div>
          <div className="row justify-content-center">
            <Link to="/getpurecure/blogs">
              <img
                src="/getpurecure/Blogs.png"
                alt="logo"
                height="180px"
                className="text-right"
              />
            </Link>
            <Link to="/getpurecure/blogs">
              <img
                src="/getpurecure/Videos.png"
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
