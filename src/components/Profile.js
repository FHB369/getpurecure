import React, { Component } from "react";
import NavbarPersonalized from "./NavbarPersonalized";
import axios from "axios";
import URLs from "../URLs";

import PatientProfile from "./profiles/PatientProfile";
import DoctorProfile from "./profiles/DoctorProfile";
import NutritionistProfile from "./profiles/NutritionistProfile";
import StudentProfile from "./profiles/StudentProfile";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
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
              type: response.data.type,
            });
          }
        })
        .catch((error) => {
          console.log("error " + error);
        });
    }
  }

  render() {
    return (
      <div className="overflow-hidden">
        <NavbarPersonalized type={2} selected={""} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          {this.state.type === "" ? (
            <div
              className="row justify-content-center"
              style={{ marginTop: "35vh", overflow: "hidden" }}
            >
              <div class="spinner-border text-accent" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div />
          )}
          {this.state.type === "patient" ? (
            <PatientProfile user={this.state.user} />
          ) : (
            <div />
          )}
          {this.state.type === "doctor" ? (
            <DoctorProfile user={this.state.user} />
          ) : (
            <div />
          )}
          {this.state.type === "nutritionist" ? (
            <NutritionistProfile user={this.state.user} />
          ) : (
            <div />
          )}
          {this.state.type === "student" ? (
            <StudentProfile user={this.state.user} />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
