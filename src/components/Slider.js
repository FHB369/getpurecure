import React from "react";

export default function Slider() {
  return (
    <div>
      <div className="slider">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active" data-interval="5000">
              <img
                class="d-block w-100 slider-image"
                src="https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1920"
                alt="First slide"
                data-interval="1000"
              />
              <div className="w-100 slider-image-shade" />
              <div className="carousel-caption">
                <a rel="noopener noreferrer" href="/" target="_blank">
                  <h2>LOREM IPSUM</h2>

                  <div>Doctor XYZ</div>

                  <br />
                </a>
              </div>
            </div>
            <div class="carousel-item" data-interval="5000">
              <img
                class="d-block w-100 slider-image"
                src="https://images.pexels.com/photos/3601094/pexels-photo-3601094.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=1920"
                alt="Second slide"
              />
              <div className="w-100 slider-image-shade" />
              <div className="carousel-caption">
                <a rel="noopener noreferrer" href="/" target="_blank">
                  <h2>LOREM IPSUM</h2>

                  <div>Doctor XYZ</div>

                  <br />
                </a>
              </div>
            </div>
            <div class="carousel-item" data-interval="5000">
              <img
                class="d-block w-100 slider-image"
                src="https://images.pexels.com/photos/3082452/pexels-photo-3082452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=1920"
                alt="Third slide"
              />
              <div className="w-100 slider-image-shade" />
              <div className="carousel-caption">
                <a rel="noopener noreferrer" href="/" target="_blank">
                  <h2>LOREM IPSUM</h2>

                  <div>Doctor XYZ</div>

                  <br />
                </a>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}
