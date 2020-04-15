import React from "react";
import { Link } from "react-router-dom";

export default function HospitalCard(props) {
  return (
    <div className={props.size}>
      <div className="mm-hospital-card">
        <Link to={props.id}>
          <div className="mm-card-image">
            <img
              src="https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
              alt={""}
            />
          </div>
          <div className="mm-card-content">
            <h5 className="text-dark">{props.name}</h5>
            <h6 className="text-dark">{props.category}</h6>
            <h6 className="text-dark">
              <ion-icon
                name="star"
                style={props.rating >= 1 ? { color: "#00cec2" } : {}}
              ></ion-icon>
              <ion-icon
                name="star"
                style={props.rating >= 2 ? { color: "#00cec2" } : {}}
              ></ion-icon>
              <ion-icon
                name="star"
                style={props.rating >= 3 ? { color: "#00cec2" } : {}}
              ></ion-icon>
              <ion-icon
                name="star"
                style={props.rating >= 4 ? { color: "#00cec2" } : {}}
              ></ion-icon>
              <ion-icon
                name="star"
                style={props.rating >= 5 ? { color: "#00cec2" } : {}}
              ></ion-icon>
            </h6>
          </div>
        </Link>
      </div>
    </div>
  );
}
