import React, { Component } from "react";
import NavbarPersonalized from "./NavbarPersonalized";
import BlogCard from "./BlogCard";

import axios from "axios";
import URLs from "../URLs";

export default class VideosPersonalized extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recent_blogs: [],
    };
  }

  componentDidMount() {
    axios
      .get(URLs.blog_api + "video/getbytype?type=recent")
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
        <NavbarPersonalized type={2} selected={"videos"} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <h2>Recent Videos</h2>
            <div className="row">
              {this.state.recent_blogs.map((news) => (
                <BlogCard
                  size="col-md-4"
                  key={news}
                  title={news.title}
                  category={news.category}
                  image={
                    "https://img.youtube.com/vi/" +
                    news.video_links[0].split("v=")[1] +
                    "/sddefault.jpg"
                  }
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
