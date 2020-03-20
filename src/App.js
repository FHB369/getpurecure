import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import HomeGeneral from "./components/HomeGeneral";
import HomePersonalized from "./components/HomePersonalized";
import BlogsPersonalized from "./components/BlogsPersonalized";
import BlogsGeneral from "./components/BlogsGeneral";
import DoctorsPersonalized from "./components/DoctorsPersonalized";
import DoctorsGeneral from "./components/DoctorsGeneral";
import HospitalsPersonalized from "./components/HospitalsPersonalized";
import HospitalsGeneral from "./components/HospitalsGeneral";
import Shop from "./components/Shop";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="theme-light">
          <div className="app">
            <div>
              <Switch>
                <Route exact path="/">
                  {this.state.isAuth ? <HomePersonalized /> : <HomeGeneral />}
                </Route>
                <Route exact path="/blogs">
                  {this.state.isAuth ? <BlogsPersonalized /> : <BlogsGeneral />}
                </Route>
                <Route exact path="/doctors">
                  {this.state.isAuth ? (
                    <DoctorsPersonalized />
                  ) : (
                    <DoctorsGeneral />
                  )}
                </Route>
                <Route exact path="/hospitals">
                  {this.state.isAuth ? (
                    <HospitalsPersonalized />
                  ) : (
                    <HospitalsGeneral />
                  )}
                </Route>
                <Route exact path="/shop">
                  <Shop />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
