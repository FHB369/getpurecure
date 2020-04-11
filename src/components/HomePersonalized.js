import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import PopularHospitals from "./popularCards/PopularHospitals";
import PopularProducts from "./popularCards/PopularProducts";
import PopularDoctors from "./popularCards/PopularDoctors";
import PopularBlogs from "./popularCards/PopularBlogs";
import axios from "axios";
import URLs from "../URLs";
import querystring from "querystring";

export default class HomePersonalized extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const uid = localStorage.getItem("uid");
    if (uid !== null) {
      axios
        .get(URLs.blog_api + "user/get?id=" + uid)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              user: response.data,
            });

            localStorage.setItem("image", response.data.photo);
            localStorage.setItem("name", response.data.name);
          }
        })
        .catch((error) => {
          console.log("error " + error);
        });
    }
  }

  handleSignOut = () => {
    var self = this;
    const id = localStorage.getItem("uid");
    const token = localStorage.getItem("token");
    axios
      .post(
        URLs.blog_api + "user/signout",
        querystring.stringify({
          id: id,
          token: token,
        })
      )
      .then(function (response) {
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("uid");
          localStorage.removeItem("image");
          localStorage.removeItem("name");
          self.setState({
            user: {},
          });

          window.location.reload();
        }
      })
      .catch(function (error) {
        self.setState({ error: "Invalid Email", loading: false });
      })
      .finally(function () {});
  };

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
            <div className="row justify-content-center">
              <img
                src="/getpurecure/logo-dark.png"
                alt="logo"
                height="100px"
                className="main-logo text-center"
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
                <Link to="/getpurecure/profile" className="col-md-4">
                  <img
                    src={
                      this.state.user.photo ||
                      "https://vectorified.com/images/man-in-circle-icon-2.png"
                    }
                    alt="logo"
                    height="130px"
                    width="130px"
                    className="main-logo text-center rounded-circle"
                    style={{ objectFit: "cover" }}
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
              <h2 className="col-md-12 text-center">
                Welcome, {this.state.user.name}
                <br />
                <br />
              </h2>

              <Link
                to="/getpurecure/profile"
                className="col-md-5 btn btn-accent mt-2 mx-4"
              >
                Show Profile
              </Link>
              <button
                onClick={this.handleSignOut}
                className="col-md-5 btn btn-danger mt-2 mx-4 text-white"
              >
                Sign Out
              </button>
            </div>
            <br />
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
