import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

export const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <Fragment key={exp._id}>
      <tr>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{""}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button className="btn btn-danger btn-sm">
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={() => deleteExperience(exp._id)}
            ></i>
          </button>
        </td>
      </tr>
    </Fragment>
  ));
  return (
    <div>
      <h4 className="h4 font-weight-bold text-uppercase my-4">
        Experience Details
      </h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{experience === undefined ? "no data" : experiences}</tbody>
      </table>
    </div>
  );
};

export default connect(null, { deleteExperience })(Experience);
