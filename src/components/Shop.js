import React, { Component } from "react";
import NavbarGeneral from "./NavbarGeneral";
import ProductCard from "./ProductCard";

export default class Shop extends Component {
  render() {
    return (
      <div className="overflow-hidden">
        <NavbarGeneral type={2} selected={"shop"} />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <h2>Trending Products</h2>
            <div className="row">
              {[1, 2, 3, 4].map(news => (
                <ProductCard
                  size="col-md-3"
                  key={news}
                  content={{
                    url: "/",
                    source_url: "https://www.prothomalo.com",
                    title: "a",
                    summary: "Test"
                  }}
                />
              ))}
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />

          <div className="row">
            <h2>Product Categories</h2>
            <div className="row">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(news => (
                <ProductCard
                  size="col-md-3"
                  key={news}
                  content={{
                    url: "/",
                    source_url: "https://www.prothomalo.com",
                    title: "a",
                    summary: "Test"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
