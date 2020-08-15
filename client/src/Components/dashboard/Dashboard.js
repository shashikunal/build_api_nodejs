import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import Spinner from "../Spinner";
import { DashboardLinks } from "./DashboardLinks";
import Experience from "./Experience";
import Education from "./Education";
export const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return (
    <Fragment>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="display-5 text-uppercase font-weight-bold mt-2 pb-2 border-bottom">
            {" "}
            Dashboard
          </h1>
          <p className="lead font-weight-bold text-uppercase">
            Welcome <strong>{user && user.name}</strong>
          </p>
        </Fragment>
      )}
      <Fragment>
        {profile !== null ? (
          <Fragment>
            <DashboardLinks />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div className="my-2 float-right">
              <button
                className="btn btn-sm btn-danger text-uppercase font-weight-bold"
                onClick={() => deleteAccount()}
              >
                <i className="fas fa-user-slash"></i>
                Delete my account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup profile , please add some information</p>
            <Link to="/create-profile" className="btn btn-dark my-2">
              Create Profile
            </Link>
          </Fragment>
        )}
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
