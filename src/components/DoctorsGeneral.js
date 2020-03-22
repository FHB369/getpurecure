import React, { Component } from "react";
import NavbarGeneral from "./NavbarGeneral";
import DoctorCard from "./DoctorCard";

export default class DoctorsGeneral extends Component {
  render() {
    return (
      <div className="overflow-hidden">
        <NavbarGeneral type={2} selected={"doctors"} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <h2>Popular Doctors</h2>
            <div className="row">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11, 13, 14].map(news => (
                <DoctorCard
                  size="col-md-3"
                  key={news}
                  content={{
                    url: "/",
                    source_url: "https://www.prothomalo.com",
                    title: "a",
                    summary: "Test"
                  }}
                />
              ))}
            </div>
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
