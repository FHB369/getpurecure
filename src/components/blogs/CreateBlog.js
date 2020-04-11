import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import NavbarPersonalized from "../NavbarPersonalized";
import axios from "axios";
import URLs from "../../URLs";
import querystring from "querystring";

export default class CreateBlog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      title: "",
      image: "",
      tags: [],
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
      .get(URLs.blog_api + "blog/categories")
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

  handleImageChange = async (file) => {
    try {
      this.setState({ loading: true });
      let axiosConfig = {
        headers: {
          Authorization: "Client-ID ead116aab30174c",
        },
      };

      let formData = new FormData();
      formData.append("image", file);

      let res = await axios.post(
        "https://api.imgur.com/3/image",
        formData,
        axiosConfig
      );

      if (res.status === 200) {
        console.log(res.status);
        let { data } = res;
        this.setState({ image: data.data.link, loading: false });
      }
      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    this.setState({ submitLoading: true, error: "" });
    if (this.state.title === "") {
      this.setState({ error: "Title can't be empty", submitLoading: false });
      return;
    }
    if (this.state.content === "") {
      this.setState({ error: "Write some contents", submitLoading: false });
      return;
    }
    if (this.state.category === "") {
      this.setState({ error: "Select a category", submitLoading: false });
      return;
    }

    var self = this;
    axios
      .post(
        URLs.blog_api + "blog/add",
        querystring.stringify({
          author_id: uid,
          title: self.state.title,
          content: self.state.content,
          image: self.state.image,
          date: Date.now(),
          category: self.state.category,
          tags: JSON.stringify(self.state.tags),
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
            <h3>Create New Blog</h3>
          </div>
          <div class="form-group px-2">
            <label for="exampleFormControlInput1" className="text-dark">
              Blog Title
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
          <div class="form-group px-2 my-2">
            <label for="exampleFormControlInput1" className="text-dark">
              Cover Image
            </label>
            <input
              type="file"
              class="form-control-file"
              onChange={(e) => this.handleImageChange(e.target.files[0])}
            />
            {this.state.image !== "" ? (
              <img src={this.state.image} width="100%" alt="Cover" />
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
          <div className="container px-2 mt-4">
            <label className="text-dark">
              Content
              <br />
            </label>
            <div>
              <Editor
                apiKey="i7252if3limictidpuqd9e8tj6x234wgfm5unzlhfqx38cvg"
                initialValue={this.state.content}
                init={{
                  selector: "textarea", // change this value according to your HTML
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor codesample emoticons",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  codesample_languages: [
                    { text: "HTML/XML", value: "markup" },
                    { text: "JavaScript", value: "javascript" },
                    { text: "CSS", value: "css" },
                    { text: "PHP", value: "php" },
                    { text: "Ruby", value: "ruby" },
                    { text: "Python", value: "python" },
                    { text: "Java", value: "java" },
                    { text: "C", value: "c" },
                    { text: "C#", value: "csharp" },
                    { text: "C++", value: "cpp" },
                  ],
                  toolbar:
                    "undo redo | formatselect |image media link codesample| bold italic backcolor forecolor |emoticons| table|alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                }}
                onChange={(e) => {
                  this.setState({ content: e.target.getContent() });
                }}
              />
            </div>
          </div>
          <div class="form-group px-2 mt-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Tags
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Put a comma(,) after each tag"
              onChange={(e) => {
                this.setState({ tags: e.target.value.split(",") });
              }}
            />
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
                Post Blog
              </button>
            )}
          </div>

          {this.state.error ? <h5>{this.state.error}</h5> : <div />}
        </div>
      </div>
    );
  }
}
