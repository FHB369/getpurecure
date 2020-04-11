import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import URLs from "../../URLs";

export default class PopularProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recent_blogs: [],
    };
  }

  componentDidMount() {
    axios
      .get(URLs.shop_api + "products/all/recent")
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
      <div className={this.props.size}>
        <div
          className="mm-hospital-card"
          data-toggle="modal"
          data-target={"#example" + this.props.content.url}
        >
          <div className="mm-card-content mt-3">
            <h4 className="text-dark text-center">Popular Products</h4>
            {this.state.recent_blogs.length >= 3 ? (
              <ul class="list-group list-group-flush bg-white px-4 py-4">
                <li class="list-group-item  bg-white">
                  <img
                    src={
                      this.state.recent_blogs[0].photos[0] ||
                      "https://madebyloop.co.uk/images/products/slider/memphis/memphis-pattern-animated.gif"
                    }
                    alt={""}
                    width="60px"
                    height="60px"
                    className="rounded-circle mr-2"
                  />

                  <b className="text-dark mr-1 text-lg">
                    {this.state.recent_blogs[0].name}
                  </b>
                  <small className="text-dark ">
                    ৳{this.state.recent_blogs[0].price}
                  </small>
                </li>
                <li class="list-group-item  bg-white">
                  <img
                    src={
                      this.state.recent_blogs[1].photos[0] ||
                      "https://madebyloop.co.uk/images/products/slider/memphis/memphis-pattern-animated.gif"
                    }
                    alt={""}
                    width="60px"
                    height="60px"
                    className="rounded-circle mr-2"
                  />

                  <b className="text-dark mr-1 text-lg">
                    {this.state.recent_blogs[1].name}
                  </b>
                  <small className="text-dark ">
                    ৳{this.state.recent_blogs[1].price}
                  </small>
                </li>
                <li class="list-group-item  bg-white">
                  <img
                    src={
                      this.state.recent_blogs[2].photos[0] ||
                      "https://madebyloop.co.uk/images/products/slider/memphis/memphis-pattern-animated.gif"
                    }
                    alt={""}
                    width="60px"
                    height="60px"
                    className="rounded-circle mr-2"
                  />

                  <b className="text-dark mr-1 text-lg">
                    {this.state.recent_blogs[2].name}
                  </b>
                  <small className="text-dark ">
                    ৳{this.state.recent_blogs[2].price}
                  </small>
                </li>

                <div className="row justify-content-center mt-3">
                  <Link
                    to="/getpurecure/shop"
                    type="button center"
                    className="btn btn-accent"
                  >
                    See More
                  </Link>
                </div>
              </ul>
            ) : (
              <div />
            )}
          </div>
        </div>

        <div
          class="modal fade "
          id={"example" + this.props.content.url}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div class="modal-content">
              <div class="modal-header">
                <h3 class="modal-title" id="exampleModalLongTitle">
                  {this.props.content.title}
                </h3>
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
                <div className="row">
                  <img
                    className="col-md-12 modal-image"
                    src={this.props.content.top_img || "./logo.svg"}
                    alt={""}
                  />
                </div>
                <br />
                <ul>
                  {this.props.content.summary.split(/\n|।/).map((line) => (
                    <li>{line}</li>
                  ))}
                </ul>
                <br />

                {this.props.content.publish_date !== null ? (
                  <div className="ml-4">
                    {new Date(
                      Date.parse(this.props.content.publish_date)
                    ).toLocaleDateString("bn-BD", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                ) : (
                  <div />
                )}
                <br />
                <div className="mm-card-footer ml-4">
                  <div>
                    <img
                      className="newspaper-icon"
                      src={
                        "https://s2.googleusercontent.com/s2/favicons?domain_url=" +
                        this.props.content.source_url
                      }
                      alt="icon"
                    />
                    {" " + this.props.content.source_url.split(".")[1]}
                  </div>
                </div>
                <div className="row justify-content-center">
                  <a
                    href={this.props.content.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    type="button center"
                    className="btn btn-success btn-accent text-white"
                  >
                    সম্পুর্ন সংবাদ দেখুন
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
