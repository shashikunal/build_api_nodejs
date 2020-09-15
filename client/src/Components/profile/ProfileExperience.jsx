import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div>
      <p className="custom_col-md-9-row">
        <span>
          <i className="fas fa-building"> </i> <strong>Company : </strong>
          {company}
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
          <i className="fas fa-map-marked"></i>
          <strong>Position :</strong> {title}
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

// ProfileExperience.propTypes = {
//   experience: PropTypes.array.isRequired,
// };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ProfileExperience);
