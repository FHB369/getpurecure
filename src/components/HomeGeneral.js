import React from "react";
import NavbarGeneral from "./NavbarGeneral";
import Slider from "./Slider";
import BlogCard from "./BlogCard";
import ProductCard from "./ProductCard";
import DoctorCard from "./DoctorCard";
import HospitalCard from "./HospitalCard";

export default class HomeGeneral extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [1, 2, 3, 4, 5, 6]
    };
  }

  render() {
    return (
      <div className=" overflow-hidden">
        <NavbarGeneral type={1} />
        <Slider />

        <div className="container">
          <div className="row">
            <h2>Popular Blogs</h2>
            <div className="row">
              {this.state.news.map(news => (
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
            <h2>Search by body parts</h2>
            <div className="row">
              <div className="col-md-8">
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
              <div className="col-md-4 pl-4">
                <img
                  src="/human.png"
                  alt="human"
                  width="250px"
                  className="ml-4"
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <h2>Popular Products</h2>
            <div className="row">
              {[1, 2, 3, 4].map(news => (
                <ProductCard
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
          <div className="row">
            <h2>Popular Doctors</h2>
            <div className="row">
              {[1, 2, 3, 4].map(news => (
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
          <div className="row">
            <h2>Popular Hospitals</h2>
            <div className="row">
              {[1, 2, 3, 4].map(news => (
                <HospitalCard
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
          <div className="row ">
            <h6 className="col-md-12 text-center"> ©2020 GetPureCure</h6>
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}
