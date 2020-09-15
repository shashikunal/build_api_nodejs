import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { withRouter, Link } from "react-router-dom";
import { getProfileByID } from "../../actions/profile";
import TopBlockProfile from "./TopBlockProfile";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import GithubProfile from "./GithubProfile";
import WakaTimeProfile from "./WakaTimeProfile";
import WakaTimeStats from "./WakaTimeStats";
const Profile = ({
  getProfileByID,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileByID(match.params.id);
  }, [getProfileByID, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div>
            <Link to="/profiles" className="btn btn-dark">
              Back to Profile
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
            <section>
              <TopBlockProfile profile={profile} />
            </section>
            <footer className="row profile_footer">
              <section className="col-6">
                <h2 className="custom_heading">Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h2>No Experience added</h2>
                )}
              </section>

              <section className="col-6">
                <h2 className="custom_heading">Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h2>No Education added</h2>
                )}
              </section>
            </footer>
            <footer className="GitBlock_main">
              <article className="col-md-12">
                <div>
                  {profile.githubusername && (
                    <GithubProfile
                      username={profile.githubusername}
                      key={profile._id}
                    />
                  )}
                </div>
              </article>
            </footer>

            <footer className="WakaTimeBlock_main">
              <article className="col-md-12">
                <div>
                  {profile.wakatimeusername && (
                    <WakaTimeProfile username={profile.wakatimeusername} />
                  )}
                </div>
                <div></div>
              </article>
            </footer>
            <footer className="WakaTimeBlock_main">
              <article className="col-md-12">
                <div>
                  {profile.wakatimeusername && (
                    <WakaTimeStats username={profile.wakatimeusername} />
                  )}
                </div>
                <div></div>
              </article>
            </footer>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByID })(
  withRouter(Profile)
);
