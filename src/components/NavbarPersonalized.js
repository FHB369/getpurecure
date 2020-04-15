import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import URLs from "../URLs";
import querystring from "querystring";

export default class NavbarPersonalized extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: this.props.type,
      image: localStorage.getItem("image"),
      name: localStorage.getItem("name"),
      show: false,
      auth: true,
    };
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
          localStorage.removeItem("cart");
          window.location.replace("/getpurecure");
        }
      })
      .catch(function (error) {
        self.setState({ error: "Invalid Email", loading: false });
      })
      .finally(function () {});
  };

  render() {
    return (
      <nav className="mm-navbar-2">
        <a href="/getpurecure/">
          <img
            src="/getpurecure/logo-dark.png"
            height="70px"
            alt="getpurecure"
          ></img>
        </a>
        <div className="mm-navbar-center">
          <Link to="/getpurecure/blogs">
            <div>
              <ion-icon
                size="large"
                style={
                  this.props.selected === "blogs" ? { color: "#00cec2" } : {}
                }
                name="fitness-sharp"
              ></ion-icon>
              <small
                style={
                  this.props.selected === "blogs" ? { color: "#00cec2" } : {}
                }
              >
                Blogs
              </small>
            </div>
          </Link>
          <Link to="/getpurecure/videos">
            <div>
              <ion-icon
                size="large"
                style={
                  this.props.selected === "videos" ? { color: "#00cec2" } : {}
                }
                name="videocam"
              ></ion-icon>
              <small
                style={
                  this.props.selected === "videos" ? { color: "#00cec2" } : {}
                }
              >
                Videos
              </small>
            </div>
          </Link>
          <Link to="/getpurecure/doctors">
            <div>
              <ion-icon
                size="large"
                style={
                  this.props.selected === "doctors" ? { color: "#00cec2" } : {}
                }
                name="medkit-sharp"
              ></ion-icon>
              <small
                style={
                  this.props.selected === "doctors" ? { color: "#00cec2" } : {}
                }
              >
                Doctors
              </small>
            </div>
          </Link>
          <Link to="/getpurecure/nutritionists">
            <div>
              <ion-icon
                size="large"
                style={
                  this.props.selected === "nutritionists"
                    ? { color: "#00cec2" }
                    : {}
                }
                name="restaurant"
              ></ion-icon>
              <small
                style={
                  this.props.selected === "nutritionists"
                    ? { color: "#00cec2" }
                    : {}
                }
              >
                Nutritionists
              </small>
            </div>
          </Link>
          <Link to="/getpurecure/hospitals">
            <div>
              <ion-icon
                size="large"
                style={
                  this.props.selected === "hospitals"
                    ? { color: "#00cec2" }
                    : {}
                }
                name="business-sharp"
              ></ion-icon>
              <small
                style={
                  this.props.selected === "hospitals"
                    ? { color: "#00cec2" }
                    : {}
                }
              >
                Hospitals
              </small>
            </div>
          </Link>
          <Link to="/getpurecure/shop">
            <div>
              <ion-icon
                size="large"
                style={
                  this.props.selected === "shop" ? { color: "#00cec2" } : {}
                }
                name="cart-sharp"
              ></ion-icon>
              <small
                style={
                  this.props.selected === "shop" ? { color: "#00cec2" } : {}
                }
              >
                Shop
              </small>
            </div>
          </Link>
        </div>
        <div className="mm-navbar-right">
          <div class="dropdown">
            <button
              class="btn btn-light bg-white border-0 dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={() => {
                this.setState({ show: !this.state.show });
              }}
            >
              <img
                src={this.state.image}
                alt="Profile"
                width="40px"
                height="40px"
                className="rounded-circle"
                style={{ objectFit: "cover" }}
              />
              &nbsp;
              {this.state.name.split(" ")[0]}
            </button>
            <div
              class={this.state.show ? "dropdown-menu" : "dropdown-menu d-none"}
              aria-labelledby="dropdownMenuButton"
            >
              <Link class="dropdown-item" to="/getpurecure/profile">
                Profile
              </Link>
              <button
                class="dropdown-item text-danger"
                onClick={this.handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
