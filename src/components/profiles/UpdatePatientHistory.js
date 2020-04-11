import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import NavbarPersonalized from "../NavbarPersonalized";
import axios from "axios";
import URLs from "../../URLs";
import querystring from "querystring";

export default class UpdatePatientProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      about: "",
      date: "",
      doctor_name: "",
      diseases: [],
      tests: [],
      medicines: [],
      loading: false,
      submitLoading: false,
      error: "",
      posted: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    this.setState({ submitLoading: true, error: "" });
    if (this.state.date === "") {
      this.setState({
        error: "Select a date",
        submitLoading: false,
      });
      return;
    }
    if (this.state.doctor_name === "") {
      this.setState({
        error: "Doctor name can't be empty",
        submitLoading: false,
      });
      return;
    }

    var self = this;
    axios
      .post(
        URLs.blog_api + "patient/addhistory",
        querystring.stringify({
          user_id: uid,
          date: self.state.date,
          doctor_name: self.state.doctor_name,
          diseases: JSON.stringify(self.state.diseases),
          tests: JSON.stringify(self.state.tests),
          medicines: JSON.stringify(self.state.medicines),
          documents: [],
        })
      )
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            error: "Updated Successfully",
            submitLoading: false,
            posted: true,
          });
        } else {
          self.setState({ error: "Can't Add Now", loading: false });
        }
      })
      .catch(function (error) {
        self.setState({ error: "Something went wrong", loading: false });
      })
      .finally(function () {});
  };

  render() {
    if (this.state.posted) {
      return <Redirect to="/getpurecure/profile" />;
    }
    return (
      <div className="overflow-hidden">
        <div className="container my-4 pb-4">
          <div className="row justify-content-md-between pl-4 my-4">
            <h3>Add Previous Treatment History</h3>
          </div>
          <div class="form-group px-2 my-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Date
            </label>
            <input
              type="date"
              class="form-control"
              placeholder="Date"
              value={this.state.date}
              onChange={(e) => this.setState({ date: e.target.value })}
            />
          </div>
          <div class="form-group px-2 my-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Doctor Name
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Doctor Name"
              value={this.state.doctor_name}
              onChange={(e) => this.setState({ doctor_name: e.target.value })}
            />
          </div>
          <div class="form-group px-2 mt-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Diseases
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Put a comma(,) after each disease"
              onChange={(e) => {
                this.setState({ diseases: e.target.value.split(",") });
              }}
            />
          </div>
          <div class="form-group px-2 mt-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Medicines
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Put a comma(,) after each medicine"
              onChange={(e) => {
                this.setState({ medicines: e.target.value.split(",") });
              }}
            />
          </div>
          <div class="form-group px-2 mt-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Tests
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Put a comma(,) after each test"
              onChange={(e) => {
                this.setState({ tests: e.target.value.split(",") });
              }}
            />
          </div>

          <div class="form-group px-2 my-4">
            {this.state.submitLoading ? (
              <div class="spinner-border text-accent" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className="btn btn-accent btn-lg text-white"
                onClick={this.handleSubmit}
              >
                Add History
              </button>
            )}
          </div>
          {this.state.error ? <h5>{this.state.error}</h5> : <div />}
        </div>
      </div>
    );
  }
}
