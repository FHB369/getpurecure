import React, { Component } from "react";
import axios from "axios";
import URLs from "../../URLs";
import ReactHtmlParser from "react-html-parser";
import NavbarPersonalized from "../NavbarPersonalized";
import NavbarGeneral from "../NavbarGeneral";
import { Editor } from "@tinymce/tinymce-react";
import querystring from "querystring";

export default class HospitalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      hospital: null,
      uid: null,
      loading: true,
      user: {},
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.setState({
        id: id,
      });
      this.loadHospital(id);
    }
  }

  loadHospital = (id) => {
    const uid = localStorage.getItem("uid");
    if (uid !== undefined && uid !== null) {
      this.setState({ uid: uid });
    }

    axios
      .get(URLs.blog_api + "hospital/getspecific?id=" + id)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            hospital: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
        this.setState({ loading: false });
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="overflow-hidden">
          {this.state.uid === null ? (
            <NavbarGeneral type={2} selected={"hospitals"} />
          ) : (
            <NavbarPersonalized type={2} selected={"hospitals"} />
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
          <NavbarGeneral type={2} selected={"hospitals"} />
        ) : (
          <NavbarPersonalized type={2} selected={"hospitals"} />
        )}
        <div className="container my-4 pb-4">
          <br />
          <br />
          <br />
          <br />

          <div className="row justify-content-md-between pl-4 my-4">
            <h1>{this.state.hospital.name}</h1>
            <div className="row col-md-12 mb-4 align-items-center">
              <h6 className="text-secondary">
                {this.state.hospital.category.toUpperCase()}
              </h6>
            </div>
            <h6 className="text-dark">
              <ion-icon
                name="star"
                style={
                  this.state.hospital.rating >= 1 ? { color: "#00cec2" } : {}
                }
              ></ion-icon>
              <ion-icon
                name="star"
                style={
                  this.state.hospital.rating >= 2 ? { color: "#00cec2" } : {}
                }
              ></ion-icon>
              <ion-icon
                name="star"
                style={
                  this.state.hospital.rating >= 3 ? { color: "#00cec2" } : {}
                }
              ></ion-icon>
              <ion-icon
                name="star"
                style={
                  this.state.hospital.rating >= 4 ? { color: "#00cec2" } : {}
                }
              ></ion-icon>
              <ion-icon
                name="star"
                style={
                  this.state.hospital.rating >= 5 ? { color: "#00cec2" } : {}
                }
              ></ion-icon>
            </h6>
            <div className="row col-md-12 mb-4 align-items-center">
              <div className="d-flex flex-column">
                <b>{this.state.hospital.address}</b>
                <b className="text-accent">{this.state.hospital.open_hour}</b>
              </div>
            </div>
          </div>
          <div className="container ">
            <h2>Doctors</h2>
            <div className="row">
              {this.state.hospital.doctors.map((doctor) => (
                <div class="card col-md-2 p-2 m-2 bg-secondary text-white">
                  <div class="card-body">
                    <h5 class="card-title">{doctor}</h5>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <br />
            <br />
            <h2>Facilities</h2>
            <div className="row">
              {this.state.hospital.facilities.map((doctor) => (
                <div class="btn col-md-1 p-2 m-2 btn-info text-white rounded-pill">
                  {doctor}
                </div>
              ))}
            </div>
            <br />
            <br />
            <br />
            <h2>Tests</h2>
            <div className="row">
              {this.state.hospital.tests.map((doctor) => (
                <div class="btn col-md-1 p-2 m-2 btn-dark text-white rounded-pill">
                  {doctor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
