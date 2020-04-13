import React from "react";
import { Link } from "react-router-dom";

export default function DoctorCard(props) {
  return (
    <div className={props.size}>
      <div className="mm-doctor-card">
        <Link to={props.id}>
          <div className="mm-card-image">
            <img
              src={
                props.photo ||
                "https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
              }
              alt={""}
            />
          </div>
          <div className="mm-card-content">
            <h5 className="text-center text-dark">{props.name}</h5>
            <h6 className="text-center text-dark">{props.category}</h6>
          </div>
        </Link>
      </div>
    </div>
  );
}
