import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/layout/Header";
import Landing from "./Components/layout/Landing";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import Dashboard from "./Components/dashboard/Dashboard";
import PrivateRoute from "./Components/routing/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import CreateProfile from "./Components/profile-forms/CreateProfile";
import EditProfile from "./Components/profile-forms/Edit-Profile";
import AddExperience from "./Components/profile-forms/AddExperience";
import AddEducation from "./Components/profile-forms/AddEducation";
import UploadPhoto from "./Components/profile-forms/UploadPhoto";
import ForgotPassword from "./Components/auth/ForgotPassword";
import ResetPasswordForm from "./Components/auth/ResetPasswordForm";
import Profiles from "./Components/profiles/Profiles";
import Profile from "./Components/profile/Profile";
import Posts from "./Components/posts/Posts";
import AddPost from "./Components/posts/AddPost";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* Same as */}

          <Route exact path="/" component={Landing} />
          <section className="container my-4">
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/reset-password" exact component={ForgotPassword} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/profile/:id" exact component={Profile} />
              {/* <Route path="/posts" exact component={Posts} /> */}
              <Route
                path="/api/users/reset-password/:id"
                exact
                component={ResetPasswordForm}
              />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute
                path="/create-profile"
                exact
                component={CreateProfile}
              />
              <PrivateRoute
                path="/edit-profile"
                exact
                component={EditProfile}
              />
              <PrivateRoute
                path="/add-experience"
                exact
                component={AddExperience}
              />
              <PrivateRoute
                path="/add-education"
                exact
                component={AddEducation}
              />
              <PrivateRoute
                path="/upload-photo"
                exact
                component={UploadPhoto}
              />
              <PrivateRoute path="/posts" exact component={Posts} />
              <PrivateRoute path="/add-post" exact component={AddPost} />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
