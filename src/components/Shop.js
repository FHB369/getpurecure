import React, { Component } from "react";
import NavbarGeneral from "./NavbarGeneral";
import NavbarPersonalized from "./NavbarPersonalized";
import ProductCard from "./ProductCard";

import axios from "axios";
import URLs from "../URLs";

export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      recent_products: [],
    };
  }

  componentDidMount() {
    const uid = localStorage.getItem("uid");
    if (uid) {
      this.setState({ auth: true });
    }

    axios
      .get(URLs.shop_api + "products/all/recent")
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            recent_products: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }

  render() {
    return (
      <div className="overflow-hidden">
        {this.state.auth ? (
          <NavbarPersonalized type={2} selected={"shop"} />
        ) : (
          <NavbarGeneral type={2} selected={"shop"} />
        )}

        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <h2>Trending Products</h2>
            <div className="row">
              {this.state.recent_products.map((news) => (
                <ProductCard
                  size="col-md-3"
                  key={news}
                  title={news.name}
                  discountPrice={news.discountPrice}
                  price={news.price}
                  image={news.photos[0]}
                  content={{
                    url: "/",
                    source_url: "https://www.prothomalo.com",
                    title: "a",
                    summary: "Test",
                  }}
                />
              ))}
            </div>
          </div>

          <br />
          <br />
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
