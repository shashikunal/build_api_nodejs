import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="border-bottom">
            <h4 className="display-5 text-uppercase">Developers</h4>
            <p>Connect developers ....</p>
          </div>

          <div className="profilesOne row">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

// Profiles.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
