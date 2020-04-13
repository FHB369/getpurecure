import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import URLs from "../../URLs";
import querystring from "querystring";
import ReactHtmlParser from "react-html-parser";

export default class NutritionistProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userBlogs: [],
      userVideos: [],
      doctorInfo: {},
      loading: false,
      image: this.props.user.photo,
      error: "",
    };
  }

  componentDidMount() {
    const uid = localStorage.getItem("uid");
    if (uid !== null) {
      axios
        .get(URLs.blog_api + "video/getbyuser?user_id=" + uid)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              userVideos: response.data,
            });
          }
        })
        .catch((error) => {
          console.log("error " + error);
        });

      axios
        .get(URLs.blog_api + "blog/getbyuser?user_id=" + uid)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              userBlogs: response.data,
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
              doctorInfo: response.data,
            });
          }
        })
        .catch((error) => {
          console.log("error " + error);
        });
    }
  }

  handleImageChange = async (file) => {
    try {
      const uid = localStorage.getItem("uid");
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

        const photo = data.data.link;
        var self = this;
        axios
          .post(
            URLs.blog_api + "user/updateprofile",
            querystring.stringify({
              id: uid,
              photo: photo,
            })
          )
          .then(function (response) {
            if (response.status === 200) {
              self.setState({
                loading: false,
                image: photo,
              });
              localStorage.setItem("image", photo);
            } else {
              self.setState({ error: "Can't Change Now", loading: false });
            }
          })
          .catch(function (error) {
            self.setState({ error: "Something went wrong", loading: false });
          })
          .finally(function () {});
      }
      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
    }
  };

  handleInfoUpdate = (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: "" });
    const uid = localStorage.getItem("uid");
    var self = this;

    axios
      .post(
        URLs.blog_api + "user/updateprofile",
        querystring.stringify({
          id: uid,
          physical_info:
            '{"height" : "' +
            e.target.height.value +
            'cm", "weight" : "' +
            e.target.weight.value +
            'kg", "blood" : "' +
            e.target.blood.value +
            '"}',
          diseases: JSON.stringify(e.target.diseases.value.split(",")),
        })
      )
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            loading: false,
          });
          window.location.replace("/getpurecure/");
        } else {
          self.setState({ error: "Can't Change Now", loading: false });
        }
      })
      .catch(function (error) {
        self.setState({ error: "Something went wrong", loading: false });
      })
      .finally(function () {});
  };

  handleUpdatePassword = (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: "" });
    const uid = localStorage.getItem("uid");
    var self = this;

    axios
      .post(
        URLs.blog_api + "user/updatepassword",
        querystring.stringify({
          id: uid,
          old_password: e.target.old_password.value,
          new_password: e.target.new_password.value,
        })
      )
      .then(function (response) {
        if (response.status === 200) {
          self.setState({
            loading: false,
          });
          window.location.replace("/getpurecure/");
        } else {
          self.setState({ error: "Can't Change Now", loading: false });
        }
      })
      .catch(function (error) {
        self.setState({ error: "Something went wrong", loading: false });
      })
      .finally(function () {});
  };

  render() {
    return (
      <div>
        <div className="container mt-4">
          <div className="row justify-content-center align-items-center mb-4">
            <div>
              <img
                src={this.state.image}
                alt="Profile"
                width="200px"
                height="200px"
                className="rounded-circle"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className=" ml-4">
              <h2>{this.props.user.name}</h2>
              <h5 className="text-accent">
                {this.props.user.type.toUpperCase()}
              </h5>
              <h5 className="text-secondary">{this.props.user.email}</h5>
              <h5 className="text-secondary">{this.props.user.phone}</h5>
              <label for="image">
                {this.state.loading ? (
                  <div className="mx-4">
                    <div class="spinner-border text-accent " role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="btn btn-accent text-white mr-2">
                    Change Photo
                  </div>
                )}
              </label>
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => this.handleImageChange(e.target.files[0])}
              />
              <button
                type="button"
                class="btn btn-dark text-white mr-2"
                data-toggle="modal"
                data-target="#exampleModal2"
              >
                Change Password
              </button>
            </div>
          </div>
          <br />

          <br />
        </div>

        <div
          class="modal fade"
          id="exampleModal2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-lg  modal-dialog-centered"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Update Password
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form onSubmit={this.handleUpdatePassword}>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Old Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Old Password"
                      name="old_password"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">New Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="New Password"
                      name="new_password"
                      required
                    />
                  </div>

                  <button type="submit" class="btn btn-accent text-white">
                    Update
                  </button>
                  <br />
                  {this.state.error ? <h5>{this.state.error}</h5> : <div />}
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>

        <ul
          class="nav nav-tabs justify-content-center"
          id="myTab"
          role="tablist"
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              id="blog-tab"
              data-toggle="tab"
              href="#blog"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              My Blogs
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="video-tab"
              data-toggle="tab"
              href="#video"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              My Videos
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="about-tab"
              data-toggle="tab"
              href="#about"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              About
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="physical-tab"
              data-toggle="tab"
              href="#physical"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Physical Info
            </a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="blog"
            role="tabpanel"
            aria-labelledby="blog-tab"
          >
            <div className="row justify-content-md-between  my-4">
              <h3>My Blogs</h3>
              <Link
                to="/getpurecure/createblog"
                className="btn btn-accent text-white"
              >
                Create New Blog
              </Link>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Date</th>
                  <th scope="col">Likes</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userBlogs.map((blog) => (
                  <tr>
                    <th>
                      <Link to={"/getpurecure/blog/" + blog._id}>
                        {blog.title}
                      </Link>
                    </th>
                    <td>
                      <Link to={"/getpurecure/blog/" + blog._id}>
                        {blog.category}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/getpurecure/blog/" + blog._id}>
                        {blog.date.substring(0, 10)}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/getpurecure/blog/" + blog._id}>
                        {blog.likes}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            class="tab-pane fade"
            id="video"
            role="tabpanel"
            aria-labelledby="video-tab"
          >
            <div className="row justify-content-md-between  my-4">
              <h3>My Videos</h3>
              <Link
                to="/getpurecure/createvideo"
                className="btn btn-accent text-white"
              >
                Post New Video
              </Link>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Date</th>
                  <th scope="col">Videos</th>
                </tr>
              </thead>
              <tbody>
                {this.state.userVideos.map((video) => (
                  <tr>
                    <th>
                      <Link to={"/getpurecure/video/" + video._id}>
                        {video.title}
                      </Link>
                    </th>
                    <td>
                      <Link to={"/getpurecure/video/" + video._id}>
                        {video.category}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/getpurecure/video/" + video._id}>
                        {video.date.substring(0, 10)}
                      </Link>
                    </td>
                    <td>
                      <Link to={"/getpurecure/video/" + video._id}>
                        {video.video_links.length}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            class="tab-pane fade"
            id="about"
            role="tabpanel"
            aria-labelledby="about-tab"
          >
            <div className="row justify-content-md-between  my-4">
              <h3>About Me</h3>
              <Link
                to="/getpurecure/updateprofile"
                className="btn btn-accent text-white"
              >
                Update Profile
              </Link>
            </div>
            <div class="table-responsive-md">
              <table class="table">
                <tbody>
                  <tr>
                    <th>About</th>
                    {this.state.doctorInfo.profile !== undefined ? (
                      <td>
                        {ReactHtmlParser(this.state.doctorInfo.profile.about)}
                      </td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                  <tr>
                    <th>Category</th>
                    {this.state.doctorInfo.profile !== undefined ? (
                      <td>{this.state.doctorInfo.profile.category}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>

                  <tr>
                    <th>Degrees</th>
                    {this.state.doctorInfo.profile !== undefined ? (
                      <td>
                        {this.state.doctorInfo.profile.degrees.map((degree) => (
                          <div className="btn btn-info mr-2">{degree}</div>
                        ))}
                      </td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                  <tr>
                    <th>Contact</th>
                    {this.state.doctorInfo.profile !== undefined ? (
                      <td>{this.state.doctorInfo.profile.contact}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                  <tr>
                    <th>Chamber Address</th>
                    {this.state.doctorInfo.profile !== undefined ? (
                      <td>{this.state.doctorInfo.profile.chamber_address}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                  <tr>
                    <th>Visiting Time</th>
                    {this.state.doctorInfo.profile !== undefined ? (
                      <td>{this.state.doctorInfo.profile.visiting_time}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="physical"
            role="tabpanel"
            aria-labelledby="physical-tab"
          >
            <div className="row justify-content-md-between  my-4">
              <h3>Physical Information</h3>
              <button
                type="button"
                class="btn btn-accent text-white"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Update Information
              </button>
            </div>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog modal-lg  modal-dialog-centered"
                role="document"
              >
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Update Physical Information
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form onSubmit={this.handleInfoUpdate}>
                      <div class="form-group">
                        <label for="exampleFormControlInput1">
                          Height (in cm)
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Height"
                          name="height"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlInput1">
                          Weight (in KG)
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Weight"
                          name="weight"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlInput1">
                          Blood Group
                        </label>
                        <select class="form-control" name="blood" required>
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>O+</option>
                          <option>O-</option>
                          <option>AB+</option>
                          <option>AB-</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="exampleFormControlInput1">Diseases</label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Put a comma(,) after each disease"
                          name="diseases"
                        />
                      </div>

                      <button type="submit" class="btn btn-accent text-white">
                        Save changes
                      </button>
                    </form>
                    <br />
                    {this.state.error ? <h5>{this.state.error}</h5> : <div />}
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive-md">
              <table class="table">
                <tbody>
                  <tr>
                    <th>Height</th>
                    {this.props.user.physical_info !== undefined ? (
                      <td>{this.props.user.physical_info.height}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                  <tr>
                    <th>Weight</th>
                    {this.props.user.physical_info !== undefined ? (
                      <td>{this.props.user.physical_info.weight}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                  <tr>
                    <th>Blood Group</th>
                    {this.props.user.physical_info !== undefined ? (
                      <td>{this.props.user.physical_info.blood}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                  <tr>
                    <th>Diseases</th>
                    {this.props.user.diseases !== undefined ? (
                      <td>
                        {this.props.user.diseases.map((degree) => (
                          <div className="btn btn-info mr-2">{degree}</div>
                        ))}
                      </td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
