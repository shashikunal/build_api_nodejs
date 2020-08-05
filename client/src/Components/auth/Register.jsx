import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import { toast } from "react-toastify";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;
  let onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  let Submit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Password do not Match");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <div>
      <section className="d-flex flex-column vh-100 align-items-center justify-content-center">
        <h2 className="display-5 font-weight-bold text-uppercase border-bottom pb-2">
          register
        </h2>
        <div className="col-md-4 mx-auto card my-4">
          <div className="card-body">
            <form onSubmit={(e) => Submit(e)} noValidate>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

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
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  id="password2"
                  minLength="6"
                  value={password2}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="form-group mt-4">
                <button className="btn btn-dark text-uppercase btn-block">
                  {/* {loading ? "loading" : "register"} */}
                  register
                </button>
              </div>
              <div className="form-group">
                <Link to="/login">
                  already have an account Please
                  <button className="btn btn-outline-dark btn-sm">Login</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateProps, { setAlert, register })(Register);
