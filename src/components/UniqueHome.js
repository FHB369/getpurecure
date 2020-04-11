import React, { Component } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import PopularHospitals from "./popularCards/PopularHospitals";
import PopularProducts from "./popularCards/PopularProducts";
import PopularDoctors from "./popularCards/PopularDoctors";
import PopularBlogs from "./popularCards/PopularBlogs";

export default class UniqueHome extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    if (token !== null && uid !== null) {
      window.location.reload();
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="row justify-content-center">
              <PopularHospitals
                size="col-lg-10"
                key={1}
                content={{
                  url: "/",
                  source_url: "https://www.prothomalo.com",
                  title: "a",
                  summary: "Test",
                }}
              />
              <PopularDoctors
                size="col-lg-10"
                key={1}
                content={{
                  url: "/",
                  source_url: "https://www.prothomalo.com",
                  title: "a",
                  summary: "Test",
                }}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="col-lg-12 mm-card d-flex align-items-center">
              <input
                type="text"
                className="form-control bg-white"
                placeholder="Search..."
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="center-section">
              <div className="row justify-content-center">
                <Link to="/getpurecure/search" className="col-md-4">
                  <img
                    src="/getpurecure/Search.png"
                    alt="logo"
                    height="130px"
                    className="text-right"
                  />
                </Link>
                <Link to="/getpurecure/shop" className="col-md-4">
                  <img
                    src="/getpurecure/Shop.png"
                    alt="logo"
                    height="130px"
                    className="text-left"
                  />
                </Link>
              </div>
              <div className="row justify-content-center align-items-center">
                <Link to="/getpurecure/hospitals" className="col-md-4">
                  <img
                    src="/getpurecure/Hospitals.png"
                    alt="logo"
                    height="130px"
                    className="text-right"
                  />
                </Link>
                <Link to="/getpurecure/" className="col-md-4">
                  <img
                    src="/getpurecure/icon.png"
                    alt="logo"
                    height="130px"
                    className="main-logo text-center"
                  />
                </Link>
                <Link to="/getpurecure/doctors" className="col-md-4">
                  <img
                    src="/getpurecure/Doctors.png"
                    alt="logo"
                    height="130px"
                    className="text-left"
                  />
                </Link>
              </div>
              <div className="row justify-content-center">
                <Link to="/getpurecure/blogs" className="col-md-4">
                  <img
                    src="/getpurecure/Blogs.png"
                    alt="logo"
                    height="130px"
                    className="text-right"
                  />
                </Link>
                <Link to="/getpurecure/videos" className="col-md-4">
                  <img
                    src="/getpurecure/Videos.png"
                    alt="logo"
                    height="130px"
                    className="text-left"
                  />
                </Link>
              </div>
            </div>

            <div className="row feed justify-content-center">
              <Link
                to="/getpurecure/signin"
                className="col-md-5 btn btn-accent mt-2 mx-4"
              >
                Sign In
              </Link>
              <Link
                to="/getpurecure/signup"
                className="col-md-5 btn btn-dark mt-2 mx-4 text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row justify-content-center">
              <PopularProducts
                size="col-lg-10"
                key={2}
                content={{
                  url: "/",
                  source_url: "https://www.prothomalo.com",
                  title: "a",
                  summary: "Test",
                }}
              />
              <PopularBlogs
                size="col-lg-10"
                key={2}
                content={{
                  url: "/",
                  source_url: "https://www.prothomalo.com",
                  title: "a",
                  summary: "Test",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
