import React from "react";
import { Link } from "react-router-dom";
export default function PopularBlogs(props) {
  return (
    <div className={props.size}>
      <div
        className="mm-hospital-card"
        data-toggle="modal"
        data-target={"#example" + props.content.url}
      >
        <div className="mm-card-content mt-3">
          <h4 className="text-dark text-center">Popular Blog Posts</h4>

          <ul class="list-group list-group-flush bg-white px-4 py-3">
            <li class="list-group-item  bg-white">
              <b className="text-dark mr-2 text-lg">Lorem Ipsum</b>
              <small className="text-right ml-4">
                <br />
                Category
              </small>
            </li>
            <li class="list-group-item  bg-white">
              <b className="text-dark mr-2 text-lg">Lorem Ipsum</b>
              <small className="text-right ml-4">
                <br />
                Category
              </small>
            </li>
            <li class="list-group-item  bg-white">
              <b className="text-dark mr-2 text-lg">Lorem Ipsum</b>
              <small className="text-right ml-4">
                <br />
                Category
              </small>
            </li>
            <li class="list-group-item  bg-white">
              <b className="text-dark mr-2 text-lg">Lorem Ipsum</b>
              <small className="text-right ml-4">
                <br />
                Category
              </small>
            </li>
            <li class="list-group-item  bg-white">
              <b className="text-dark mr-2 text-lg">Lorem Ipsum</b>
              <small className="text-right ml-4">
                <br />
                Category
              </small>
            </li>
            <div className="row justify-content-center mt-3">
              <Link
                to="/getpurecure/blogs"
                type="button center"
                className="btn btn-accent"
              >
                See More
              </Link>
            </div>
          </ul>
        </div>
      </div>

      <div
        class="modal fade "
        id={"example" + props.content.url}
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
                {props.content.title}
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
                  src={props.content.top_img || "./logo.svg"}
                  alt={""}
                />
              </div>
              <br />
              <ul>
                {props.content.summary.split(/\n|।/).map(line => (
                  <li>{line}</li>
                ))}
              </ul>
              <br />

              {props.content.publish_date !== null ? (
                <div className="ml-4">
                  {new Date(
                    Date.parse(props.content.publish_date)
                  ).toLocaleDateString("bn-BD", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
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
                      props.content.source_url
                    }
                    alt="icon"
                  />
                  {" " + props.content.source_url.split(".")[1]}
                </div>
              </div>
              <div className="row justify-content-center">
                <a
                  href={props.content.url}
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