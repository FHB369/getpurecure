import React, { Component } from "react";
import axios from "axios";
import URLs from "../../URLs";
import ReactHtmlParser from "react-html-parser";
import NavbarPersonalized from "../NavbarPersonalized";
import NavbarGeneral from "../NavbarGeneral";
import { Editor } from "@tinymce/tinymce-react";
import querystring from "querystring";
import YouTube from "react-youtube";

export default class VideoDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      video: null,
      uid: null,
      loading: true,
      user: {},
      width: window.innerWidth * 0.6,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.setState({
        id: id,
      });
      this.loadVideo(id);
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

  loadVideo = (id) => {
    const uid = localStorage.getItem("uid");
    if (uid !== undefined && uid !== null) {
      this.setState({ uid: uid });
    }

    axios
      .get(URLs.blog_api + "video/getspecific?id=" + id)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            video: response.data,
          });
          this.loadUser(response.data.author_id);
        }
      })
      .catch((error) => {
        console.log("error " + error);
        this.setState({ loading: false });
      });
  };

  loadUser = (id) => {
    axios
      .get(URLs.blog_api + "user/get?id=" + id)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            user: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  render() {
    const opts = {
      height: window.innerHeight * 0.8,
      width: window.innerWidth * 0.7,
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    if (this.state.loading) {
      return (
        <div className="overflow-hidden">
          {this.state.uid === null ? (
            <NavbarGeneral type={2} selected={"videos"} />
          ) : (
            <NavbarPersonalized type={2} selected={"videos"} />
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
          <NavbarGeneral type={2} selected={"videos"} />
        ) : (
          <NavbarPersonalized type={2} selected={"videos"} />
        )}
        <div className="container my-4 pb-4">
          <br />
          <br />
          <br />
          <br />

          <div className="row justify-content-md-between pl-4 my-4">
            <h1>{this.state.video.title}</h1>
            <div className="row col-md-12 mb-4 align-items-center">
              <h6 className="text-secondary">
                {"Posted " +
                  this.timeSince(
                    Date.parse(this.state.video.date.replace(/\s/, "T"))
                  ) +
                  " ago"}
              </h6>
            </div>
            <div className="row col-md-12 mb-4 align-items-center">
              <img
                src={this.state.user.photo}
                alt="Profile"
                width="50px"
                height="50px"
                className="rounded-circle border border-info p-1 mr-2"
                style={{ objectFit: "cover" }}
              />
              <div className="d-flex flex-column">
                <b>{this.state.user.name}</b>
                <small className="text-accent">
                  {this.state.user.type.toUpperCase() || ""}
                </small>
              </div>
            </div>

            {this.state.video.video_links.map((video) => (
              <YouTube
                videoId={video.split("v=")[1]}
                opts={opts}
                onReady={this._onReady}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
