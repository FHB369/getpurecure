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
import UniqueHome from "./components/UniqueHome";
import Search from "./components/Search";
import VideosPersonalized from "./components/VideosPersonalized";
import VideosGeneral from "./components/VideosGeneral";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import URLs from "./URLs";
import axios from "axios";
import Profile from "./components/Profile";
import CreateBlog from "./components/blogs/CreateBlog";
import CreateVideo from "./components/videos/CreateVIdeo";
import UpdateProfile from "./components/UpdateProfile";
import NutritionistsPersonalized from "./components/NutritionistsPersonalized";
import NutritionistsGeneral from "./components/NutritionistsGeneral";
import BlogDetails from "./components/blogs/BlogDetails";
import VideoDetails from "./components/videos/VideoDetails";
import DoctorPublicProfile from "./components/profiles/DoctorPublicProfile";
import NutritionistPublicProfile from "./components/profiles/NutritionistPublicProfile";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
      loading: true,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    if (token !== null && uid !== null) {
      axios
        .get(URLs.blog_api + "user/session?id=" + uid + "&token=" + token)
        .then((response) => {
          if (response.data === true) {
            this.setState({
              isAuth: true,
              loading: false,
            });
          } else {
            this.setState({ isAuth: false, loading: false });
          }
        })
        .catch((error) => {
          console.log("error " + error);
        });
    } else {
      this.setState({
        isAuth: false,
        loading: false,
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="theme-light">
          <div className="app">
            {this.state.loading ? (
              <div
                className="row justify-content-center"
                style={{ marginTop: "35vh", overflow: "hidden" }}
              >
                <div className="col-12 text-center mb-4">
                  <img
                    src="/getpurecure/icon.png"
                    alt="logo"
                    height="130px"
                    className="main-logo text-center"
                  />
                </div>

                <div class="spinner-border text-accent" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                <Switch>
                  <Route exact path="/getpurecure/signin">
                    {this.state.isAuth ? <HomePersonalized /> : <SignIn />}
                  </Route>
                  <Route exact path="/getpurecure/signup">
                    {this.state.isAuth ? <HomePersonalized /> : <SignUp />}
                  </Route>
                  <Route exact path="/getpurecure/">
                    {this.state.isAuth ? <HomePersonalized /> : <UniqueHome />}
                  </Route>
                  <Route exact path="/getpurecure/profile">
                    {this.state.isAuth ? <Profile /> : <SignIn />}
                  </Route>
                  <Route exact path="/getpurecure/updateprofile">
                    {this.state.isAuth ? <UpdateProfile /> : <SignIn />}
                  </Route>
                  <Route exact path="/getpurecure/createblog">
                    {this.state.isAuth ? <CreateBlog /> : <SignIn />}
                  </Route>
                  <Route
                    exact
                    path="/getpurecure/blog/:id"
                    component={BlogDetails}
                  />
                  <Route exact path="/getpurecure/createvideo">
                    {this.state.isAuth ? <CreateVideo /> : <SignIn />}
                  </Route>
                  <Route exact path="/getpurecure/blogs">
                    {this.state.isAuth ? (
                      <BlogsPersonalized />
                    ) : (
                      <BlogsGeneral />
                    )}
                  </Route>
                  <Route exact path="/getpurecure/videos">
                    {this.state.isAuth ? (
                      <VideosPersonalized />
                    ) : (
                      <VideosGeneral />
                    )}
                  </Route>
                  <Route
                    exact
                    path="/getpurecure/video/:id"
                    component={VideoDetails}
                  />
                  <Route exact path="/getpurecure/doctors">
                    {this.state.isAuth ? (
                      <DoctorsPersonalized />
                    ) : (
                      <DoctorsGeneral />
                    )}
                  </Route>
                  <Route
                    exact
                    path="/getpurecure/doctor/:id"
                    component={DoctorPublicProfile}
                  />
                  <Route exact path="/getpurecure/nutritionists">
                    {this.state.isAuth ? (
                      <NutritionistsPersonalized />
                    ) : (
                      <NutritionistsGeneral />
                    )}
                  </Route>
                  <Route
                    exact
                    path="/getpurecure/nutritionist/:id"
                    component={NutritionistPublicProfile}
                  />
                  <Route exact path="/getpurecure/hospitals">
                    {this.state.isAuth ? (
                      <HospitalsPersonalized />
                    ) : (
                      <HospitalsGeneral />
                    )}
                  </Route>
                  <Route exact path="/getpurecure/shop">
                    <Shop />
                  </Route>
                  <Route exact path="/getpurecure/search">
                    <Search />
                  </Route>
                </Switch>
              </div>
            )}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
