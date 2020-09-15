import React, { Component } from "react";
import PropTypes from "prop-types";

import Moment from "react-moment";
const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <div>
      <p className="custom_col-md-9-row">
        <span>
          <i className="fas fa-school"></i> <strong>School : </strong> {school}
        </span>
      </p>

      <p className="custom_col-md-9-row">
        <span>
          <i className="fas fa-calendar-week"></i> <strong>Year :</strong>
          <Moment format="YYYY">{from}</Moment> -{" "}
          {!to ? "now" : <Moment format="YYYY">{to}</Moment>}
        </span>
      </p>
      <p className="custom_col-md-9-row">
        <span>
          <i className="fas fa-user-graduate"></i>
          <strong>Degree :</strong> {degree}
        </span>
      </p>
      <p className="custom_col-md-9-row">
        <span>
          <i className="fas fa-graduation-cap"></i>
          <strong>fieldOfStudy :</strong> {fieldofstudy}
        </span>
      </p>
      <p className="custom_col-md-9-row">
        <span>
          <i className="fad fa-comments"></i>
          <strong>Description :</strong> {description}
        </span>
      </p>
    </div>
  );
};

// ProfileEducation.propTypes = {
//   education: PropTypes.array.isRequired,
// };

export default ProfileEducation;
