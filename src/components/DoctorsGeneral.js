import React, { Component } from "react";
import NavbarGeneral from "./NavbarGeneral";
import DoctorCard from "./DoctorCard";

import axios from "axios";
import URLs from "../URLs";

export default class DoctorsGeneral extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recent_blogs: [],
    };
  }

  componentDidMount() {
    axios
      .get(URLs.blog_api + "doctor/getbytype?type=popular")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            recent_blogs: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }

  render() {
    return (
      <div className="overflow-hidden">
        <NavbarGeneral type={2} selected={"doctors"} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <h2>Popular Doctors</h2>
          <div className="row container">
            <div className="row">
              {this.state.recent_blogs.map((news) => (
                <DoctorCard
                  size="col-md-4"
                  key={news}
                  name={news.name}
                  photo={news.photo}
                  category={news.profile.category}
                  content={{
                    url: "/",
                    source_url: "https://www.prothomalo.com",
                    title: "a",
                    summary: "Test",
                  }}
                />
              ))}
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />

          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
