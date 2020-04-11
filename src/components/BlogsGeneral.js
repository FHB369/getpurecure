import React, { Component } from "react";
import NavbarGeneral from "./NavbarGeneral";
import BlogCard from "./BlogCard";

import axios from "axios";
import URLs from "../URLs";

export default class BlogsGeneral extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recent_blogs: [],
    };
  }

  componentDidMount() {
    axios
      .get(URLs.blog_api + "blog/getbytype?type=recent")
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
        <NavbarGeneral type={2} selected={"blogs"} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <h2>Recent Blogs</h2>
            <div className="row">
              {this.state.recent_blogs.map((news) => (
                <BlogCard
                  size="col-md-4"
                  key={news}
                  title={news.title}
                  category={news.category}
                  image={news.image}
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
