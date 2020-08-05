import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
function Header({ auth: { isAuthenticated, loading }, logout }) {
  const AuthLinks = (
    <Fragment>
      <li className="nav-item">
        <a
          className="nav-link btn btn-dark text-white"
          onClick={logout}
          href="#!"
        >
          logout
        </a>
      </li>
    </Fragment>
  );
  const GuestLinks = (
    <Fragment>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Developers
        </a>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link custom_btn" to="/register">
          Get Started
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div>
      <section>
        <nav className="navbar navbar-expand-lg navbar-light bg-white ">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src="logo.png" alt="logo" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                {!loading && (
                  <Fragment>
                    {isAuthenticated ? AuthLinks : GuestLinks}
                  </Fragment>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
}
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
