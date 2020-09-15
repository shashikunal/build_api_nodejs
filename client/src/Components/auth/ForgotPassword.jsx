import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { forgotPassword } from "../../actions/auth";

// import { toast } from "react-toastify";

const ForgotPassword = ({ forgotPassword, history }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;
  let onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  let Submit = async (e) => {
    e.preventDefault();
    forgotPassword(email, history);
    // toast.success("Please check your email address and reset password");
    // return <Redirect to="/login"></Redirect>;
  };

  return (
    <div>
      <section className="d-flex flex-column vh-100 align-items-center justify-content-center">
        <h2 className="display-5 font-weight-bold text-uppercase border-bottom pb-2">
          Reset Password
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

export default connect(null, { forgotPassword })(ForgotPassword);
