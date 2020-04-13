import React, { Component } from "react";
import axios from "axios";
import URLs from "../../URLs";
import ReactHtmlParser from "react-html-parser";
import NavbarPersonalized from "../NavbarPersonalized";
import NavbarGeneral from "../NavbarGeneral";
import { Editor } from "@tinymce/tinymce-react";
import querystring from "querystring";

export default class BlogDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      blog: null,
      uid: null,
      loading: true,
      comment: "",
      post: "POST COMMENT",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.setState({
        id: id,
      });
      this.loadBlog(id);
    }
  }

  timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    } else if (interval === 1) {
      return interval + " year";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    } else if (interval === 1) {
      return interval + " month";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    } else if (interval === 1) {
      return interval + " day";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    } else if (interval === 1) {
      return interval + " hour";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    } else if (interval === 1) {
      return interval + " minute";
    }
    return Math.floor(seconds) + " seconds";
  };

  loadBlog = (id) => {
    const uid = localStorage.getItem("uid");
    if (uid !== undefined && uid !== null) {
      this.setState({ uid: uid });
    }

    axios
      .get(URLs.blog_api + "blog/getspecific?id=" + id)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            blog: response.data,
            loading: false,
            post: "POST COMMENT",
            comment: "",
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
        this.setState({ loading: false });
      });
  };

  isLikedByUser = (id) => {
    for (var i = 0; i < this.state.blog.liked_by.length; i++) {
      if (this.state.blog.liked_by[i].user_id === id) {
        return true;
      }
    }
    return false;
  };

  handleLike = () => {
    var self = this;
    axios
      .post(
        URLs.blog_api + "blog/like",
        querystring.stringify({
          user_id: self.state.uid,
          blog_id: self.state.id,
          date: Date.now(),
        })
      )
      .then(function (response) {
        if (response.status === 200) {
          self.loadBlog(self.state.id);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  };

  handleUnlike = () => {
    var self = this;
    axios
      .post(
        URLs.blog_api + "blog/unlike",
        querystring.stringify({
          user_id: self.state.uid,
          blog_id: self.state.id,
        })
      )
      .then(function (response) {
        if (response.status === 200) {
          self.loadBlog(self.state.id);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {});
  };

  handleComment = () => {
    if (this.state.comment === "") {
      this.setState({ post: "PLEASE WRITE SOMETHING" });
      return;
    }

    this.setState({ post: "POSTING..." });

    var self = this;
    axios
      .post(
        URLs.blog_api + "blog/comment",
        querystring.stringify({
          user_id: self.state.uid,
          blog_id: self.state.id,
          date: Date.now(),
          comment: self.state.comment,
        })
      )
      .then(function (response) {
        if (response.status === 200) {
          self.setState({ post: "POSTED SUCCESSFULLY" });
          self.loadBlog(self.state.id);
        }
      })
      .catch(function (error) {
        self.setState({ post: "SOMETHING WENT WRONG" });
      })
      .finally(function () {});
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="overflow-hidden">
          {this.state.uid === null ? (
            <NavbarGeneral type={2} selected={"blogs"} />
          ) : (
            <NavbarPersonalized type={2} selected={"blogs"} />
          )}
          <div className="container  my-4 pb-4">
            <br />
            <br />
            <br />
            <br />
            <div className="row justify-content-center">
              <div class="spinner-border text-accent" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="overflow-hidden">
        {this.state.uid === null ? (
          <NavbarGeneral type={2} selected={"blogs"} />
        ) : (
          <NavbarPersonalized type={2} selected={"blogs"} />
        )}
        <div className="container my-4 pb-4">
          <br />
          <br />
          <br />
          <br />

          <div className="row justify-content-md-between pl-4 my-4">
            <h1>{this.state.blog.title}</h1>
            <div className="row col-md-12 mb-4 align-items-center">
              <h6 className="text-secondary">
                {"Posted " +
                  this.timeSince(
                    Date.parse(this.state.blog.date.replace(/\s/, "T"))
                  ) +
                  " ago"}
              </h6>
            </div>
            <div className="row col-md-12 mb-4 align-items-center">
              <img
                src={this.state.blog.user.photo}
                alt="Profile"
                width="50px"
                height="50px"
                className="rounded-circle border border-info p-1 mr-2"
                style={{ objectFit: "cover" }}
              />
              <div className="d-flex flex-column">
                <b>{this.state.blog.user.name}</b>
                <small className="text-accent">
                  {this.state.blog.user.type.toUpperCase()}
                </small>
              </div>
            </div>
            {this.state.blog.image !== "" ? (
              <img
                src={this.state.blog.image}
                className="rounded-lg"
                width="100%"
                alt="Cover"
              />
            ) : (
              <div />
            )}
          </div>
          <div class="form-group px-2 py-2 my-4">
            {ReactHtmlParser(this.state.blog.content)}
          </div>
          <div class="form-group px-3 py-2 my-4 text-center">
            {this.state.uid !== null ? (
              <>
                {this.isLikedByUser(this.state.uid) ? (
                  <button
                    class="btn btn-dark text-accent rounded-pill px-4"
                    onClick={this.handleUnlike}
                  >
                    <i class="fas fa-thumbs-up"></i>&nbsp;&nbsp;LIKED
                  </button>
                ) : (
                  <button
                    class="btn btn-accent text-light rounded-pill px-4"
                    onClick={this.handleLike}
                  >
                    <i class="fas fa-thumbs-up"></i>&nbsp;&nbsp;LIKE
                  </button>
                )}
              </>
            ) : (
              <div />
            )}

            <h6 className="d-block mt-3">
              {this.state.blog.likes + " PEOPLE LIKE THIS"}
            </h6>
          </div>

          <div class="form-group px-3 py-2 my-4">
            <h3>
              {this.state.blog.comments.length === 0 ? "No Previous " : ""}
              Comments
            </h3>
            <div>
              {this.state.blog.comments.map((comment) => (
                <div class="alert alert-info" role="alert" key={comment._id}>
                  <div className="row col-md-12 mb-2 align-items-center">
                    <img
                      src={comment.user_id.photo}
                      alt="Profile"
                      width="50px"
                      height="50px"
                      className="rounded-circle border border-info p-1 mr-2"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="d-flex flex-column">
                      <b>{comment.user_id.name}</b>
                      <small className="text-info">
                        <b>{comment.user_id.type.toUpperCase()}</b>
                      </small>
                    </div>
                  </div>
                  {ReactHtmlParser(comment.comment)}
                  <small className="d-block mt-3">
                    {this.timeSince(
                      Date.parse(comment.date.replace(/\s/, "T"))
                    ).toUpperCase() + " AGO"}
                  </small>
                </div>
              ))}
            </div>
          </div>
          <div class="form-group px-2 py-2 my-4">
            <div className="container px-2 mt-4">
              {this.state.uid !== null ? (
                <div>
                  <Editor
                    apiKey="i7252if3limictidpuqd9e8tj6x234wgfm5unzlhfqx38cvg"
                    initialValue={this.state.comment}
                    value={this.state.comment}
                    init={{
                      selector: "textarea", // change this value according to your HTML
                      height: 200,
                      menubar: false,
                      plugins: [
                        "advlist autolink lists link image charmap print preview anchor codesample emoticons",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                      ],

                      toolbar:
                        "formatselect |image media link| bold italic backcolor forecolor |emoticons| table|alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                    }}
                    onChange={(e) => {
                      this.setState({
                        comment: e.target.getContent(),
                        post: "POST COMMENT",
                      });
                    }}
                  />
                  <button
                    class="btn btn-accent text-light mt-4"
                    onClick={this.handleComment}
                  >
                    {this.state.post}
                  </button>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
