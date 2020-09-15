import React from "react";
import { Link } from "react-router-dom";
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    bio,
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="coverProfile mT20 col-xs-offset-2 dropShadow">
      <div className="row">
        <div className="col rel dropShadow">
          <a
            className="btn hireBtn"
            href="https://www.linkedin.com/in/kaakati/"
          >
            HIRE ME
          </a>
          <img
            className="profile_custom_img rounded-circle"
            src={avatar[0].url ? avatar[0].url : avatar[0]}
            alt={name}
          />
        </div>
      </div>
      <div className="col rubyColor profileDetails ">
        <h3>{name}</h3>
        <hr />
        <p className="profiles_details_p">
          <span className="text-left">
            <span>
              <i className="fad fa-user-tie"></i>
            </span>
            {status}
          </span>
          <span>@</span>
          <span className="text-right text-primary">
            <span></span>
            {company}
          </span>
        </p>
        <p>
          <span>
            <i className="fad fa-map-marker-alt"></i>
          </span>
          {location}
        </p>
        <ul className="list-group list-group-horizontal">
          <span>
            <i className="fas fa-code"></i>
          </span>
          {skills.slice(0, 4).map((skill, index) => (
            <li
              key={index}
              className="text-secondary list-inline badge badge-lite text-capitalize"
            >
              {skill}
            </li>
          ))}
        </ul>
        <div>
          <Link
            to={`/profile/${_id}`}
            className="btn btn-dark btn-block btn-sm my-2"
          >
            View Profile
          </Link>
        </div>

        <div className="row text-center">
          <div className="col socialIcons">
            <div className="btn-group" role="group" aria-label="...">
              <a
                className="btn btn-link"
                href="https://www.twitter.com/kaakati"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="btn btn-link"
                href="https://www.facebook.com/mkaakati"
              >
                <i className="fab fa-facebook-square"></i>
              </a>
              <a className="btn btn-link" href="https://www.github.com/kaakati">
                <i className="fab fa-github" aria-hidden="true"></i>
              </a>
              <a
                className="btn btn-link"
                href="https://www.linkedin.com/in/kaakati"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
