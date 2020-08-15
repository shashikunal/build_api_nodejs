import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const UpdateProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  auth: { user },
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  /*-------------add social link toggle button ----------------------*/
  const [displaySocialLinks, setSocialLinksToggle] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    return profile === null ? (
      <Redirect to="/login"></Redirect>
    ) : (
      setFormData({
        company: loading || !profile.company ? "" : profile.company,
        website: loading || !profile.website ? "" : profile.website,
        location: loading || !profile.location ? "" : profile.location,
        status: loading || !profile.status ? "" : profile.status,
        skills: loading || !profile.skills ? "" : profile.skills.join(","),
        githubusername:
          loading || !profile.githubusername ? "" : profile.githubusername,
        bio: loading || !profile.bio ? "" : profile.bio,
        twitter: loading || !profile.twitter ? "" : profile.twitter,
        facebook: loading || !profile.facebook ? "" : profile.facebook,
        linkedin: loading || !profile.linkedin ? "" : profile.linkedin,
        youtube: loading || !profile.youtube ? "" : profile.youtube,
        instagram: loading || !profile.instagram ? "" : profile.instagram,
      })
    );
  }, [loading]);

  let {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <div className="container rounded bg-white mt-5 mb-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5 ">
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
                  <h4 className="text-right">Create Profile</h4>
                </div>
                <div className="row mt-2">
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
                  <div className="col-md-6">
                    <label className="labels">Website</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Website"
                      name="website"
                      value={website}
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
                    <label className="labels">Skills</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="* Skills"
                      name="skills"
                      value={skills}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Select Professional Status</label>
                    <select
                      name="status"
                      id="status"
                      className="form-control"
                      value={status}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="0">Select Professional Status</option>
                      <option value="Developer">Developer</option>
                      <option value="junior Developer">Junior Developer</option>
                      <option value="Senior Developer">Senior Developer</option>
                      <option value="Manager">Manager</option>
                      <option value="student of learning ">
                        Student of learning{" "}
                      </option>
                      <option value="Instructor/Teacher">
                        Instructor/Teacher
                      </option>
                      <option value="Intern">Intern</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="labels">Github Profile</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Github Username"
                      name="githubusername"
                      value={githubusername}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Bio</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Bio"
                      name="bio"
                      value={bio}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-12 p-0 my-3">
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={() => setSocialLinksToggle(!displaySocialLinks)}
                  >
                    Update Social Network links
                  </button>

                  {displaySocialLinks && (
                    <Fragment>
                      <div className="form-group my-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Twitter"
                          name="twitter"
                          value={twitter}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="facebook"
                          name="facebook"
                          value={facebook}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="youtube"
                          name="youtube"
                          value={youtube}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Linkedin"
                          name="linkedin"
                          value={linkedin}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Instagram"
                          name="instagram"
                          value={instagram}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </Fragment>
                  )}
                </div>

                <div className="mt-2">
                  <button
                    className="btn btn-primary profile-button float-left"
                    type="submit"
                  >
                    Edit Profile
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

// UpdateProfile.propTypes = {
//   createProfile: PropTypes.func.isRequired,
//   getCurrentProfile: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  createProfile: PropTypes.func.isRequired,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(UpdateProfile)
);
