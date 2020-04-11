import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import NavbarPersonalized from "../NavbarPersonalized";
import axios from "axios";
import URLs from "../../URLs";
import querystring from "querystring";

export default class UpdateNutritionistProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      about: "",
      contact: "",
      chamber_address: "",
      visiting_time: "",
      degrees: [],
      category: "",
      categories: [],
      loading: false,
      submitLoading: false,
      error: "",
      posted: false,
      submitUrl: "nutritionist/add",
    };
  }

  componentDidMount() {
    const uid = localStorage.getItem("uid");
    axios
      .get(URLs.blog_api + "nutritionist/categories")
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

    axios
      .get(URLs.blog_api + "nutritionist/getspecific?id=" + uid)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            submitUrl: "nutritionist/edit",
            about: response.data.profile.about,
            contact: response.data.profile.contact,
            chamber_address: response.data.profile.chamber_address,
            visiting_time: response.data.profile.visiting_time,
            degrees: response.data.profile.degrees,
            category: response.data.profile.category,
          });
        } else {
          this.setState({
            submitUrl: "nutritionist/add",
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
        this.setState({
          submitUrl: "nutritionist/add",
        });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const uid = localStorage.getItem("uid");
    this.setState({ submitLoading: true, error: "" });

    if (this.state.contact === "") {
      this.setState({
        error: "Contact Info can't be empty",
        submitLoading: false,
      });
      return;
    }
    if (this.state.chamber_address === "") {
      this.setState({
        error: "Chamber Address can't be empty",
        submitLoading: false,
      });
      return;
    }
    if (this.state.visiting_time === "") {
      this.setState({
        error: "Visiting Time can't be empty",
        submitLoading: false,
      });
      return;
    }
    if (this.state.degrees === []) {
      this.setState({
        error: "Degrees can't be empty",
        submitLoading: false,
      });
      return;
    }
    if (this.state.category === "") {
      this.setState({ error: "Select a category", submitLoading: false });
      return;
    }

    var self = this;
    axios
      .post(
        URLs.blog_api + self.state.submitUrl,
        querystring.stringify({
          user_id: uid,
          about: self.state.about,
          category: self.state.category,
          contact: self.state.contact,
          chamber_address: self.state.chamber_address,
          visiting_time: self.state.visiting_time,
          degrees: JSON.stringify(self.state.degrees),
        })
      )
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            error: "Updated Successfully",
            submitLoading: false,
            posted: true,
          });
        } else {
          self.setState({ error: "Can't Update Now", loading: false });
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
        <div className="container my-4 pb-4">
          <div className="row justify-content-md-between pl-4 my-4">
            <h3>Update Nutritionist Profile</h3>
          </div>

          {this.state.submitUrl === "nutritionist/add" ? (
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
          ) : (
            <div />
          )}

          <div className="container px-2 mt-4">
            <label className="text-dark">
              About
              <br />
            </label>
            <div>
              <Editor
                apiKey="i7252if3limictidpuqd9e8tj6x234wgfm5unzlhfqx38cvg"
                initialValue={this.state.about}
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
                  this.setState({ about: e.target.getContent() });
                }}
              />
            </div>
          </div>
          {this.state.submitUrl === "nutritionist/add" ? (
            <div class="form-group px-2 mt-4">
              <label for="exampleFormControlInput1" className="text-dark">
                Degrees
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Put a comma(,) after each degree"
                onChange={(e) => {
                  this.setState({ degrees: e.target.value.split(",") });
                }}
              />
            </div>
          ) : (
            <div />
          )}
          <div class="form-group px-2 my-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Contact
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Contact Details"
              value={this.state.contact}
              onChange={(e) => this.setState({ contact: e.target.value })}
            />
          </div>
          <div class="form-group px-2 my-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Chamber Address
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Chamber Address"
              value={this.state.chamber_address}
              onChange={(e) =>
                this.setState({ chamber_address: e.target.value })
              }
            />
          </div>
          <div class="form-group px-2 my-4">
            <label for="exampleFormControlInput1" className="text-dark">
              Visiting Time
            </label>
            <input
              type="text"
              class="form-control"
              placeholder="Visiting Time"
              value={this.state.visiting_time}
              onChange={(e) => this.setState({ visiting_time: e.target.value })}
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
                Update Profile
              </button>
            )}
          </div>

          {this.state.error ? <h5>{this.state.error}</h5> : <div />}
        </div>
      </div>
    );
  }
}
