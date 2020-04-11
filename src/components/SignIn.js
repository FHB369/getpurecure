import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import querystring from "querystring";
import URLs from "../URLs";

export default class SignIn extends Component {
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
    if (e.target.password.value.length < 6) {
      this.setState({ error: "Invalid Password", loading: false });
      return;
    }

    var self = this;
    Axios.post(
      URLs.blog_api + "user/signin",
      querystring.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    )
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("uid", response.data.user._id);
          self.setState({
            auth: true,
          });
        } else {
          self.setState({
            error: "Invalid Email or, Password",
            loading: false,
          });
        }
      })
      .catch(function (error) {
        self.setState({ error: "Invalid Email or, Password", loading: false });
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
            <h1>Sign In</h1>
          </div>
          <form className="popup-form" onSubmit={this.handleSubmit}>
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
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>

            <br />

            {this.state.loading ? (
              <div class="spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                type="submit"
                className="btn btn-accent text-white btn-lg"
              >
                Sign In
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

          <Link to="/getpurecure/signup" className="btn btn-link text-lg">
            <small>Create an account</small>
          </Link>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
