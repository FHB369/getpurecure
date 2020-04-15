import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  return (
    <div className={props.size}>
      <div className="mm-product-card">
        <Link to={props.id}>
          <div className="mm-card-image">
            <img
              src={
                props.image ||
                "https://madebyloop.co.uk/images/products/slider/memphis/memphis-pattern-animated.gif"
              }
              alt={""}
            />
          </div>
          <div className="mm-card-content">
            <h5 className="text-center text-dark">{props.title}</h5>
            <h6 className="text-center text-dark">৳{props.discountPrice}</h6>
            <h6 className="text-center text-danger">
              <small>
                <strike>৳{props.price}</strike>
              </small>
            </h6>
          </div>
        </Link>
      </div>
    </div>
  );
}
