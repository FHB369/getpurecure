import React, { Component } from "react";
import NavbarGeneral from "./NavbarGeneral";
import BlogCard from "./BlogCard";

export default class BlogsGeneral extends Component {
  render() {
    return (
      <div className="overflow-hidden">
        <NavbarGeneral type={2} selected={"blogs"} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <h2>Popular Blogs by Doctors</h2>
            <div className="row">
              {[1, 2, 3, 4, 5, 6].map(news => (
                <BlogCard
                  size="col-md-4"
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
          <div className="row">
            <h2>Popular Blogs by Patients</h2>
            <div className="row">
              {[1, 2, 3, 4, 5, 6].map(news => (
                <BlogCard
                  size="col-md-4"
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
