import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import URLs from "../../URLs";
import querystring from "querystring";
import ReactHtmlParser from "react-html-parser";
import NavbarPersonalized from "../NavbarPersonalized";
import NavbarGeneral from "../NavbarGeneral";

export default class NutritionistPublicProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      doctorInfo: {},
      loading: true,
      error: "",
      uid: null,
    };
  }

  componentDidMount() {
    const uid = localStorage.getItem("uid");
    if (uid !== undefined && uid !== null) {
      this.setState({ uid: uid });
    }
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.setState({
        id: id,
      });
    }
    axios
      .get(URLs.blog_api + "nutritionist/getspecific?id=" + id)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            doctorInfo: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="overflow-hidden">
          {this.state.uid === null ? (
            <NavbarGeneral type={2} selected={"nutritionists"} />
          ) : (
            <NavbarPersonalized type={2} selected={"nutritionists"} />
          )}
          <div className="container  my-4 pb-4">
            <br />
            <br />
            <br />
            <br />
            <div className="row justify-content-center">
              <div class="spinner-border text-accent" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="overflow-hidden">
        {this.state.uid === null ? (
          <NavbarGeneral type={2} selected={"nutritionists"} />
        ) : (
          <NavbarPersonalized type={2} selected={"nutritionists"} />
        )}
        <div className="container  my-4 pb-4">
          <br />
          <br />
          <br />
          <br />
          <div className="container mt-4">
            <div className="row justify-content-center align-items-center mb-4">
              <div>
                <img
                  src={this.state.doctorInfo.photo}
                  alt="Profile"
                  width="200px"
                  height="200px"
                  className="rounded-circle"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className=" ml-4">
                <h2>{this.state.doctorInfo.name}</h2>
                <h5 className="text-accent">
                  {this.state.doctorInfo.profile.category.toUpperCase()}
                </h5>
              </div>
            </div>
            <div className="row justify-content-center align-items-center mb-4">
              <div class="table-responsive-md">
                <table class="table">
                  <tbody>
                    <tr>
                      <th>About</th>
                      {this.state.doctorInfo.profile.category !== undefined ? (
                        <td>
                          {ReactHtmlParser(this.state.doctorInfo.profile.about)}
                        </td>
                      ) : (
                        <td>N/A</td>
                      )}
                    </tr>
                    <tr>
                      <th>Category</th>
                      {this.state.doctorInfo.profile.category !== undefined ? (
                        <td>{this.state.doctorInfo.profile.category}</td>
                      ) : (
                        <td>N/A</td>
                      )}
                    </tr>
                    <tr>
                      <th>Degrees</th>
                      {this.state.doctorInfo.profile.category !== undefined ? (
                        <td>
                          {this.state.doctorInfo.profile.degrees.map(
                            (degree) => (
                              <div className="btn btn-info mr-2">{degree}</div>
                            )
                          )}
                        </td>
                      ) : (
                        <td>N/A</td>
                      )}
                    </tr>
                    <tr>
                      <th>Contact</th>
                      {this.state.doctorInfo.profile.category !== undefined ? (
                        <td>{this.state.doctorInfo.profile.contact}</td>
                      ) : (
                        <td>N/A</td>
                      )}
                    </tr>
                    <tr>
                      <th>Chamber Address</th>
                      {this.state.doctorInfo.profile.category !== undefined ? (
                        <td>{this.state.doctorInfo.profile.chamber_address}</td>
                      ) : (
                        <td>N/A</td>
                      )}
                    </tr>
                    <tr>
                      <th>Visiting Time</th>
                      {this.state.doctorInfo.profile.category !== undefined ? (
                        <td>{this.state.doctorInfo.profile.visiting_time}</td>
                      ) : (
                        <td>N/A</td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
