import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import Moment from "react-moment";
import { getWakaTime } from "../../actions/profile";

const WakaTimeProfile = ({ username, getWakaTime, wakatime }) => {
  useEffect(() => {
    getWakaTime(username);
  }, [getWakaTime]);

  const [displayWaka, displayWakaToggle] = useState(false);

  let toggleIcon =
    displayWaka === false ? (
      <i className="fas fa-plus"></i>
    ) : (
      <i className="fas fa-minus"></i>
    );

  return (
    <div>
      <div>
        {wakatime.data === null ? (
          <Spinner />
        ) : (
          <div>
            <h2
              className="custom_heading"
              onClick={() => displayWakaToggle(!displayWaka)}
            >
              coding activities
              <span
                className="text-right float-right"
                title="click here to expand"
              >
                {toggleIcon}
              </span>
            </h2>
            {displayWaka && (
              <Fragment>
                <div className="d-flex waka_Block text-primary row">
                  <p className="float-right1 col-4">
                    <span>
                      <i className="fad fa-address-card"></i>
                      Waka Username
                    </span>
                    <span className="badge badge-primary">
                      {wakatime.data.username}
                    </span>
                  </p>
                  <p className="float-right1 col-4">
                    <span>
                      <i className="fad fa-map-marker-alt"></i>
                      Location
                    </span>
                    <span className="badge badge-primary">
                      {wakatime.data.location}
                    </span>
                  </p>
                  <p className="float-right1 col-4">
                    <span>
                      <i className="fas fa-language"></i>
                      activities
                    </span>

                    <span className="badge badge-primary">
                      {wakatime.data.default_dashboard_range}
                    </span>
                  </p>

                  <p className="float-right1 col-4">
                    <span>
                      <i className="fa fa-code" aria-hidden="true"></i>
                      Editors
                    </span>
                    <span className="badge badge-primary">
                      {wakatime.data.last_plugin_name}
                    </span>
                  </p>
                  <p className="float-right1 col-4">
                    <span>
                      <i className="fas fa-clock"></i>
                      TimeZone
                    </span>
                    <span className="badge badge-primary">
                      {wakatime.data.timezone}
                    </span>
                  </p>
                  <p className="float-right1 col-4">
                    <span>
                      <i className="fad fa-calendar"></i>
                      Waka Created At
                    </span>
                    <span className="badge badge-primary">
                      {" "}
                      <Moment format="YYYY">{wakatime.data.created_at}</Moment>
                    </span>
                  </p>
                </div>
              </Fragment>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// WakaTimeProfile.propTypes = {
//   prop: PropTypes,
// };

const mapStateToProps = (state) => ({
  wakatime: state.profile.wakatime,
});

export default connect(mapStateToProps, { getWakaTime })(WakaTimeProfile);
