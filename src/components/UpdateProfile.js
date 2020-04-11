import React, { Component } from "react";
import NavbarPersonalized from "./NavbarPersonalized";
import axios from "axios";
import URLs from "../URLs";

import UpdateDoctorProfile from "./profiles/UpdateDoctorProfile";
import UpdateNutritionistProfile from "./profiles/UpdateNutritionistProfile";
import UpdateStudentProfile from "./profiles/UpdateStudentProfile";
import UpdatePatientHistory from "./profiles/UpdatePatientHistory";

export default class UpdateProfile extends Component {
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
            <UpdatePatientHistory user={this.state.user} />
          ) : (
            <div />
          )}
          {this.state.type === "doctor" ? (
            <UpdateDoctorProfile user={this.state.user} />
          ) : (
            <div />
          )}
          {this.state.type === "nutritionist" ? (
            <UpdateNutritionistProfile user={this.state.user} />
          ) : (
            <div />
          )}
          {this.state.type === "student" ? (
            <UpdateStudentProfile user={this.state.user} />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
