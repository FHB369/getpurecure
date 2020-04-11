import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import querystring from "querystring";
import URLs from "../URLs";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      error: "",
      loading: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: "" });
    if (e.target.password.value !== e.target.cpassword.value) {
      this.setState({ error: "Password didn't match", loading: false });
      return;
    }
    if (e.target.password.value.length < 6) {
      this.setState({
        error: "Password must be minimum 6 characters long",
        loading: false,
      });
      return;
    }

    var self = this;
    Axios.post(
      URLs.blog_api + "user/signup",
      querystring.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        password: e.target.password.value,
        type: e.target.type.value,
      })
    )
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("uid", response.data.user._id);
          self.setState({
            auth: true,
            loading: false,
          });
        } else {
          self.setState({ error: "Invalid Email", loading: false });
        }
      })
      .catch(function (error) {
        self.setState({ error: "Email already exists", loading: false });
      })
      .finally(function () {});
  };

  render() {
    if (this.state.auth === true) {
      //   window.location.reload();
      return <Redirect to="/getpurecure/" />;
    }
    return (
      <div>
        <div className="row justify-content-center">
          <img
            src="/getpurecure/logo-dark.png"
            alt="logo"
            height="100px"
            className="main-logo text-center"
          />
        </div>
        <div className="popup-box">
          <div className="popup-box-header">
            <h1>Sign Up</h1>
          </div>
          <form className="popup-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="name"
                name="name"
                className="form-control"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="phone"
                name="phone"
                className="form-control"
                placeholder="Phone"
                required
              />
            </div>
            <div className="form-group">
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="type"
                required
              >
                <option value="">Select Type</option>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Nutritionist">Nutritionist</option>
                <option value="Student">Medical Student</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="cpassword"
                className="form-control"
                placeholder="Confirm Password"
                required
              />
            </div>
            <br />

            <div className="form-group"></div>

            {this.state.loading ? (
              <div class="spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-accent text-white btn-lg"
              >
                Sign Up
              </button>
            )}

            {this.state.error ? (
              <p>
                <br />
                <br />
                {this.state.error}
              </p>
            ) : (
              <div />
            )}
          </form>

          <Link to="/getpurecure/signin" className="btn btn-link text-lg">
            <small>Already have an account? Sign In</small>
          </Link>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
