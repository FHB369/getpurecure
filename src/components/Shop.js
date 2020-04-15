import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      cart: [],
    };
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);

    if (cart !== undefined && cart !== null) {
      this.setState({ cart: cart });
    }

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
                  id={"/getpurecure/product/" + news._id}
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
        <Link to="/getpurecure/shop/cart">
          <div
            class="float-right"
            style={{
              width: "20vw",
              height: "60px",
              position: "fixed",
              bottom: "0",
              right: "2vw",
              backgroundColor: "#ffffff",
              boxShadow: "-5px 0px 30px #dddddd",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              textAlign: "center",
              paddingTop: "20px",
              fontSize: "1.2rem",
            }}
          >
            <i class="fas fa-shopping-cart"></i> Cart ({this.state.cart.length})
          </div>
        </Link>
      </div>
    );
  }
}
