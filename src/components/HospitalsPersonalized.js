import React, { Component } from "react";
import NavbarPersonalized from "./NavbarPersonalized";
import BlogCard from "./BlogCard";
import HospitalCard from "./HospitalCard";
import axios from "axios";
import URLs from "../URLs";

export default class HospitalsPersonalized extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recent_blogs: [],
    };
  }

  componentDidMount() {
    axios
      .get(URLs.blog_api + "hospital/getbytype?type=popular")
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
        <NavbarPersonalized type={2} selected={"hospitals"} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <h2>Popular Hospitals</h2>
          <div className="row container">
            <div className="row mt-4">
              {this.state.recent_blogs.map((news) => (
                <HospitalCard
                  size="col-md-4"
                  key={news}
                  name={news.name}
                  category={news.category.toUpperCase()}
                  rating={news.rating}
                  id={"/getpurecure/hospital/" + news._id}
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
