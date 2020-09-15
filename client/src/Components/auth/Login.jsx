import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  let onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  let Submit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //redirected
  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <div>
      <section className="d-flex flex-column vh-100 align-items-center justify-content-center">
        <h2 className="display-5 font-weight-bold text-uppercase border-bottom pb-2">
          Login
        </h2>
        <div className="col-md-4 mx-auto card my-4">
          <div className="card-body">
            <form onSubmit={(e) => Submit(e)} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  minLength="6"
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="form-group mt-4">
                <button className="btn btn-dark text-uppercase btn-block">
                  Login
                </button>
              </div>
              <div className="form-group">
                <Link to="/reset-password">
                  <p className="text-right">Forgot Password?</p>
                </Link>
                <Link to="/register">
                  Don't have an account Please
                  <button className="btn btn-outline-dark btn-sm">
                    Register
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
