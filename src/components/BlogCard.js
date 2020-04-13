import React from "react";
import Axios from "axios";
import querystring from "querystring";
import { Link } from "react-router-dom";

function BlogCard(props) {
  return (
    <div className={props.size}>
      <div className="mm-card">
        <Link to={props.id}>
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

              <b className="mm-card-title">{props.title}</b>

              <div className="mm-card-timestamp">{props.category}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
