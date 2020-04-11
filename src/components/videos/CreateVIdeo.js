import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavbarPersonalized from "../NavbarPersonalized";
import axios from "axios";
import URLs from "../../URLs";
import querystring from "querystring";

export default class CreateVideo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      video_links: "",
      category: "",
      categories: [],
      loading: false,
      submitLoading: false,
      error: "",
      posted: false,
    };
  }

  componentDidMount() {
    axios
      .get(URLs.blog_api + "video/categories")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            categories: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    this.setState({ submitLoading: true, error: "" });
    if (this.state.title === "") {
      this.setState({ error: "Title can't be empty", submitLoading: false });
      return;
    }
    if (this.state.video_links === []) {
      this.setState({ error: "Add a video", submitLoading: false });
      return;
    }
    if (this.state.category === "") {
      this.setState({ error: "Select a category", submitLoading: false });
      return;
    }

    var self = this;
    axios
      .post(
        URLs.blog_api + "video/add",
        querystring.stringify({
          author_id: uid,
          title: self.state.title,
          date: Date.now(),
          category: self.state.category,
          video_links: '["' + self.state.video_links + '"]',
        })
      )
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            error: "Posted Successfully",
            submitLoading: false,
            posted: true,
          });
        } else {
          self.setState({ error: "Can't Post Now", loading: false });
        }
      })
      .catch(function (error) {
        self.setState({ error: "Something went wrong", loading: false });
      })
      .finally(function () {});
  };

  render() {
    if (this.state.posted) {
      return <Redirect to="/getpurecure/profile" />;
    }
    return (
      <div className="overflow-hidden">
        <NavbarPersonalized type={2} selected={""} />
        <div className="container my-4 pb-4">
          <br />
          <br />
          <br />
          <br />

          <div className="row justify-content-md-between pl-4 my-4">
            <h3>Create New Video</h3>
          </div>
          <div class="form-group px-2">
            <label for="exampleFormControlInput1" className="text-dark">
              Video Title
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Blog title"
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
            />
          </div>
          <div class="form-group px-2">
            <label for="exampleFormControlInput1" className="text-dark">
              Category
            </label>
            <select
              class="form-control"
              name="category"
              onChange={(e) => {
                this.setState({ category: e.target.value });
              }}
            >
              <option value="">Select Category</option>
              {this.state.categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div class="form-group px-2 mt-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Video Link
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Youtube Link"
              onChange={(e) => {
                this.setState({ video_links: e.target.value });
              }}
            />
          </div>

          <div class="form-group px-2 my-2">
            {this.state.video_links !== "" ? (
              <img
                src={
                  "https://img.youtube.com/vi/" +
                  this.state.video_links.split("v=")[1] +
                  "/sddefault.jpg"
                }
                width="100%"
                alt="Cover"
              />
            ) : (
              <div className="row justify-content-center">
                {this.state.loading ? (
                  <div class="spinner-border text-accent" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            )}
          </div>

          <div class="form-group px-2 my-4">
            {this.state.submitLoading ? (
              <div class="spinner-border text-accent" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className="btn btn-accent btn-lg text-white"
                onClick={this.handleSubmit}
              >
                Post Video
              </button>
            )}
          </div>

          {this.state.error ? <h5>{this.state.error}</h5> : <div />}
        </div>
      </div>
    );
  }
}
