import React, { Component } from "react";
import NavbarPersonalized from "./NavbarPersonalized";
import DoctorCard from "./DoctorCard";

import axios from "axios";
import URLs from "../URLs";

export default class NutritionistsPersonalized extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recent_blogs: [],
    };
  }

  componentDidMount() {
    axios
      .get(URLs.blog_api + "nutritionist/getbytype?type=popular")
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
        <NavbarPersonalized type={2} selected={"nutritionists"} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <h2>Popular Nutritionists</h2>
          <div className="row container">
            <div className="row">
              {this.state.recent_blogs.map((news) => (
                <DoctorCard
                  size="col-md-4"
                  key={news}
                  name={news.user_id.name}
                  photo={news.user_id.photo}
                  category={news.category}
                  id={"/getpurecure/nutritionist/" + news.user_id._id}
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
