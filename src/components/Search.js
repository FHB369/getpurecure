import React, { Component } from "react";
import NavbarGeneral from "./NavbarGeneral";

export default class Search extends Component {
  render() {
    return (
      <div className="overflow-hidden">
        <NavbarGeneral type={2} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <div className="mm-search-header">
            <form className="col-md-6 input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Username"
                aria-describedby="basic-addon1"
              />

              <div className="input-group-apend">
                <span
                  className="btn btn-secondary"
                  id="basic-addon1"
                  role="button"
                >
                  <i className="icon ion-ios-search" />
                  &nbsp;&nbsp;Search
                </span>
              </div>
            </form>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
