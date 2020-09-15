import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { resetPassword } from "../../actions/auth";
const ResetPasswordForm = ({ resetPassword, history, match }) => {
  const [formData, setFormData] = useState();

  let onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  let handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(formData, match, history);
  };
  return (
    <div>
      <section className="d-flex flex-column vh-100 align-items-center justify-content-center">
        <h2 className="display-5 font-weight-bold text-uppercase border-bottom pb-2">
          Reset Password
        </h2>
        <div className="col-md-4 mx-auto card my-4">
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="email">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  // value={formData}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="form-group mt-4">
                <button className="btn btn-dark text-uppercase btn-block">
                  Reset Password
                </button>
              </div>
              <div className="form-group">
                <Link to="/login">
                  already have Password Please
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

export default connect(null, { resetPassword })(withRouter(ResetPasswordForm));
