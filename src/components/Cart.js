import React, { Component } from "react";
import axios from "axios";
import URLs from "../URLs";
import ReactHtmlParser from "react-html-parser";
import NavbarPersonalized from "./NavbarPersonalized";
import NavbarGeneral from "./NavbarGeneral";
import CursorZoom from "react-cursor-zoom";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      loading: true,
      user: {},
      image: "",
      cart: [],
    };
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);

    if (cart !== undefined && cart !== null) {
      this.setState({ cart: cart, loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="overflow-hidden">
          {this.state.uid === null ? (
            <NavbarGeneral type={2} selected={"shop"} />
          ) : (
            <NavbarPersonalized type={2} selected={"shop"} />
          )}
          <div className="container  my-4 pb-4">
            <br />
            <br />
            <br />
            <br />
            <div className="row justify-content-center">
              <div class="spinner-border text-accent" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="overflow-hidden">
        {this.state.uid === null ? (
          <NavbarGeneral type={2} selected={"shop"} />
        ) : (
          <NavbarPersonalized type={2} selected={"shop"} />
        )}
        <div className="container my-4 pb-4">
          <br />
          <br />
          <br />
          <br />
          <h2>Shopping Cart</h2>
          <br />

          <table class="table rounded-lg overflow-hidden">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Photo</th>
                <th scope="col">Option</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cart.map((item) => (
                <tr>
                  <th scope="row">{this.state.cart.indexOf(item) + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.photo}
                      width="50px"
                      height="50px"
                      style={{ objectFit: "cover" }}
                      className="rounded-circle"
                      alt="product"
                    />
                  </td>
                  <td>{item.option}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
