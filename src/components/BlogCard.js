import React from "react";
import Axios from "axios";
import querystring from "querystring";

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return eBangla(interval) + " বছর";
  } else if (interval === 1) {
    return eBangla(interval) + " বছর";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return eBangla(interval) + " মাস";
  } else if (interval === 1) {
    return eBangla(interval) + " মাস";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return eBangla(interval) + " দিন";
  } else if (interval === 1) {
    return eBangla(interval) + " দিন";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return eBangla(interval) + " ঘণ্টা";
  } else if (interval === 1) {
    return eBangla(interval) + " ঘণ্টা";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return eBangla(interval) + " মিনিট";
  } else if (interval === 1) {
    return eBangla(interval) + " মিনিট";
  }
  return eBangla(Math.floor(seconds)) + " সেকেন্ড";
}

function eBangla(x) {
  return x.toLocaleString("bn-BD");
}

function BlogCard(props) {
  return (
    <div className={props.size}>
      <div
        className="mm-card"
        data-toggle="modal"
        data-target={"#example" + props.content.url}
      >
        <div className="mm-card-image">
          <img
            src={
              props.image ||
              "https://cdn.slidemodel.com/wp-content/uploads/13081-01-gradient-designs-powerpoint-backgrounds-16x9-1.jpg"
            }
            alt={""}
          />
        </div>
        <div className="mm-card-details">
          <div className="mm-card-content">
            <br />
            <a
              href={props.content.url}
              rel="noopener noreferrer"
              className="mm-card-title"
              data-toggle="modal"
              data-target={"#example" + props.content.url}
              target="_blank"
            >
              <b>{props.title}</b>
            </a>
            {props.content.publish_date !== null ? (
              <div className="mm-card-timestamp">{props.category}</div>
            ) : (
              <div />
            )}
          </div>

          {/* <div className="mm-card-footer">
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
            <div className="mm-card-love">
              {props.liked === true ? (
                <i className="icon ion-md-heart text-success " />
              ) : (
                <i className="icon ion-md-heart text-shade" />
              )}
            </div>
          </div> */}
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
                {props.content.summary.split(/\n|।/).map((line) => (
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

export default BlogCard;
