import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addExperience, getCurrentProfile } from "../../actions/profile";

const AddExperience = ({
  addExperience,
  profile: { profile, loading },
  history,
  getCurrentProfile,
  auth: { user },
}) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  useEffect(() => {
    getCurrentProfile();
  }, [loading]);

  /*-------------add social link toggle button ----------------------*/
  const [toDateDisabled, toggleDisabled] = useState(false);

  let { company, title, location, from, to, current, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <Fragment>
      <div className="container rounded bg-white mt-5 mb-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <Link to="/upload-photo" className="position-relative">
                  <img
                    src={
                      user && user.avatar[0].url
                        ? user && user.avatar[0].url
                        : user && user.avatar[0]
                    }
                    alt="user"
                    className="profile-pic"
                  />
                  <div className="profile_custom_pic">
                    <strong>Update Photo</strong>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </div>
                </Link>
                <p className="font-weight-bold">{user && user.name}</p>
                <p className="text-black-50">{user && user.email}</p>
                <span></span>
              </div>
            </div>

            <div className="col-md-9 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Add Experience</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Title </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Job Title"
                      name="title"
                      value={title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company"
                      name="company"
                      value={company}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter City and state Suggested"
                      name="location"
                      value={location}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">From Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="date"
                      name="from"
                      value={from}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels"> Current Job</label>
                    <input
                      type="checkbox"
                      className="form-control1"
                      name="current"
                      value={current}
                      checked={current}
                      onChange={(e) => {
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                      }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="labels">To Date</label>
                    <input
                      disabled={toDateDisabled ? "disabled" : ""}
                      type="date"
                      className="form-control"
                      placeholder="To Date"
                      name="to"
                      value={to}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="write job description"
                      name="description"
                      value={description}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>

                <div className="mt-2">
                  <button
                    className="btn btn-primary profile-button float-left"
                    type="submit"
                  >
                    Add Experience
                  </button>
                  <Link className="btn btn-light float-right" to="/dashboard">
                    Go back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  addExperience: PropTypes.func.isRequired,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { addExperience, getCurrentProfile })(
  withRouter(AddExperience)
);
