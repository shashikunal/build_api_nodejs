import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

export const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <Fragment key={edu._id}>
      <tr>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{""}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button className="btn btn-danger btn-sm">
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={() => deleteEducation(edu._id)}
            ></i>
          </button>
        </td>
      </tr>
    </Fragment>
  ));
  return (
    <div>
      <h4 className="h4 font-weight-bold text-uppercase my-4">
        Education Details
      </h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{education === undefined ? "no data" : educations}</tbody>
      </table>
    </div>
  );
};

export default connect(null, { deleteEducation })(Education);
