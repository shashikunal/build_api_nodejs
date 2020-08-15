import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const DashboardLinks = () => {
  return (
    <div>
      <Fragment>
        <ul className="nav nav-pills">
          <li className="nav-item m-2">
            <Link className="nav-link btn btn-dark" to="/edit-profile">
              <i className="fa fa-user p-2" aria-hidden="true"></i>
              Edit profile
            </Link>
          </li>
          <li className="nav-item m-2">
            <Link className="nav-link  btn btn-light" to="/add-experience">
              <i className="fab fa-black-tie p-2"></i>
              Add Experience
            </Link>
          </li>
          <li className="nav-item m-2">
            <Link className="nav-link btn btn-light" to="/add-education">
              <i className="fa fa-graduation-cap p-2" aria-hidden="true"></i>
              Add Education
            </Link>
          </li>
          <li className="nav-item m-2">
            <Link className="nav-link btn btn-light" to="/upload-photo">
              <i className="fa fa-graduation-cap p-2" aria-hidden="true"></i>
              update Profile photo
            </Link>
          </li>
        </ul>
      </Fragment>
    </div>
  );
};
