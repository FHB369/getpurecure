import React from "react";

export default function ProductCard(props) {
  return (
    <div className={props.size}>
      <div
        className="mm-product-card"
        data-toggle="modal"
        data-target={"#example" + props.content.url}
      >
        <div className="mm-card-image">
          <img
            src="https://madebyloop.co.uk/images/products/slider/memphis/memphis-pattern-animated.gif"
            alt={""}
          />
        </div>
        <div className="mm-card-content">
          <h5 className="text-center text-dark">Product Name</h5>
          <h6 className="text-center text-dark">৳ 1450.00</h6>
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
