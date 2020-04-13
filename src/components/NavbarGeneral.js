import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavbarGeneral extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: this.props.type,
    };
  }

  render() {
    if (this.props.type === 1) {
      return (
        <>
          <nav className="mm-navbar">
            <div className="mm-navbar-center">
              <Link to="/blogs">
                <div>
                  <ion-icon size="large" name="fitness-sharp"></ion-icon>
                  <small>Blogs</small>
                </div>
              </Link>
              <Link to="/doctors">
                <div>
                  <ion-icon size="large" name="medkit-sharp"></ion-icon>
                  <small>Doctors</small>
                </div>
              </Link>
              <Link to="/hospitals">
                <div>
                  <ion-icon size="large" name="business-sharp"></ion-icon>
                  <small>Hospitals</small>
                </div>
              </Link>
              <Link to="/shop">
                <div>
                  <ion-icon size="large" name="cart-sharp"></ion-icon>
                  <small>Shop</small>
                </div>
              </Link>
            </div>
          </nav>
          <div className="title-section">
            <a href="/">
              <img src="/logo.png" height="70px" alt="getpurecure"></img>
            </a>

            <div className="title-section-right">
              <a href="/">
                &nbsp;&nbsp;&nbsp;&nbsp;<h6 className="text-accent">Sign In</h6>
              </a>
              <a href="/">
                &nbsp;&nbsp;<h6 className="text-white">Sign Up</h6>
              </a>
            </div>
          </div>
        </>
      );
    } else {
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
                    this.props.selected === "doctors"
                      ? { color: "#00cec2" }
                      : {}
                  }
                  name="medkit-sharp"
                ></ion-icon>
                <small
                  style={
                    this.props.selected === "doctors"
                      ? { color: "#00cec2" }
                      : {}
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
          <div className="mm-navbar-right mb-4">
            <Link to="/getpurecure/signin">
              &nbsp;&nbsp;&nbsp;&nbsp;<h6 className="text-accent">Sign In</h6>
            </Link>
            <Link to="/getpurecure/signup">
              &nbsp;&nbsp;<h6 className="text-dark">Sign Up</h6>
            </Link>
          </div>
        </nav>
      );
    }
  }
}
