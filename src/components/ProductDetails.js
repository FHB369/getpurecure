import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import URLs from "../URLs";
import ReactHtmlParser from "react-html-parser";
import NavbarPersonalized from "./NavbarPersonalized";
import NavbarGeneral from "./NavbarGeneral";
import CursorZoom from "react-cursor-zoom";

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      product: null,
      uid: null,
      loading: true,
      user: {},
      image: "",
      cart: [],
      quantity: 1,
      option: "",
    };
  }

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);

    if (cart !== undefined && cart !== null) {
      this.setState({ cart: cart });
    }

    const { id } = this.props.match.params;
    if (id !== undefined) {
      this.setState({
        id: id,
      });
      this.loadProduct(id);
    }
  }

  loadProduct = (id) => {
    const uid = localStorage.getItem("uid");
    if (uid !== undefined && uid !== null) {
      this.setState({ uid: uid });
    }

    axios
      .get(URLs.shop_api + "products/" + id)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            product: response.data,
            image: response.data.photos[0],
            option: response.data.options[0],
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log("error " + error);
        this.setState({ loading: false });
      });
  };

  addToCart = async () => {
    const product = [
      {
        id: this.state.id,
        name: this.state.product.name,
        price: this.state.product.discountPrice * this.state.quantity,
        quantity: this.state.quantity,
        option: this.state.option,
        photo: this.state.image,
      },
    ];

    const newCart = [...this.state.cart, ...product];

    await localStorage.setItem("cart", JSON.stringify(newCart));

    this.setState({
      cart: newCart,
    });
  };

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

          <div className="row justify-content-center pl-4 my-4">
            <div className="col-md-6">
              <CursorZoom
                image={{
                  src: this.state.image,
                  width: window.innerWidth * 0.3,
                  height: window.innerHeight * 0.6,
                  objectFit: "cover",
                }}
                zoomImage={{
                  src: this.state.image,
                  width: window.innerWidth * 0.6,
                  height: window.innerHeight * 0.9,
                }}
                cursorOffset={{ x: 0, y: -50 }}
              />
              <div className="row">
                {this.state.product.photos.map((doctor) => (
                  <img
                    height="80px"
                    width="80px"
                    style={{ objectFit: "cover" }}
                    src={doctor}
                    alt="Card cap"
                    onClick={() => this.setState({ image: doctor })}
                    className="m-2 rouded-lg product-img"
                  />
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <h1>{this.state.product.name}</h1>
              <div className="row col-md-12 mb-4 align-items-center">
                <h6 className="text-secondary">
                  {this.state.product.category.toUpperCase()}
                </h6>
              </div>
              <div>{ReactHtmlParser(this.state.product.description)}</div>
              <div className="mt-4">
                <h4>Price</h4>
                {this.state.product.discount !== 0 ? (
                  <h6 className="text-danger">
                    <strike>৳{this.state.product.price}</strike>
                  </h6>
                ) : (
                  <div />
                )}
                <h4 className="text-info">
                  ৳{this.state.product.discountPrice}
                </h4>
              </div>
              <div className="mt-4">
                <h6 className="text-accent">*{this.state.product.status}</h6>
                <div class="row">
                  <div class="col">
                    <label>Quantity</label>
                    <input
                      type="number"
                      class="form-control"
                      defaultValue="1"
                      onChange={(e) => {
                        this.setState({ quantity: e.target.value });
                      }}
                    />
                  </div>
                  <div class="col">
                    <label>Select Option</label>
                    <select
                      class="form-control"
                      onChange={(e) => {
                        this.setState({ option: e.target.value });
                      }}
                    >
                      {this.state.product.options.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {this.state.product.status === "In Stock" ? (
                <div className="mt-4">
                  <button className="btn btn-accent rounded-pill text-white mr-2 px-4 py-2">
                    BUY NOW
                  </button>
                  <button
                    className="btn btn-dark rounded-pill text-accent mr-2 px-4 py-2"
                    onClick={() => {
                      this.addToCart();
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
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
