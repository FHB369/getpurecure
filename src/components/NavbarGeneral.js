import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavbarGeneral extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: this.props.type
    };
  }

  render() {
    if (this.props.type === 1) {
      return (
        <>
          <nav className="mm-navbar">
            <div className="mm-navbar-center">
              <Link to="/">
                <div>
                  <ion-icon
                    size="large"
                    style={{ color: "#00cec2" }}
                    name="home-sharp"
                  ></ion-icon>
                  <small style={{ color: "#00cec2" }}>Home</small>
                </div>
              </Link>
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
          <a href="/">
            <img src="/logo-dark.png" height="70px" alt="getpurecure"></img>
          </a>
          <div className="mm-navbar-center">
            <Link to="/">
              <div>
                <ion-icon
                  size="large"
                  style={{ color: "#00cec2" }}
                  name="home-sharp"
                ></ion-icon>
                <small style={{ color: "#00cec2" }}>Home</small>
              </div>
            </Link>
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
          <div className="mm-navbar-right">
            <a href="/">
              &nbsp;&nbsp;&nbsp;&nbsp;<h6 className="text-accent">Sign In</h6>
            </a>
            <a href="/">
              &nbsp;&nbsp;<h6 className="text-dark">Sign Up</h6>
            </a>
          </div>
        </nav>
      );
    }
  }
}
