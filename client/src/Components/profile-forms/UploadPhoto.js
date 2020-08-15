import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { updatePhoto, getCurrentProfile } from "../../actions/profile";

const UploadPhoto = ({
  updatePhoto,
  history,
  getCurrentProfile,
  auth: { user },
}) => {
  const [formData, setFormData] = useState();

  useEffect(() => {
    getCurrentProfile();
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("avatar", formData);
    updatePhoto(user && user._id, data, history);
  };
  return (
    <Fragment>
      <div className="bg-white col-md-12">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-md-3 border-right"></div>
            <div className="col-md-9 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3 flex-column">
                  <h4 className="text-right">Update profile photo</h4>
                  <div className="row mt-2">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="file"
                        id="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFormData(file);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-dark">Upload</button>
                    </div>
                  </div>
                  <div className="back">
                    <Link className="btn btn-light float-right" to="/dashboard">
                      Go back
                    </Link>
                  </div>
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
  updatePhoto: PropTypes.func.isRequired,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { updatePhoto, getCurrentProfile })(
  withRouter(UploadPhoto)
);
