import React, { Fragment } from "react";

function TopBlockProfile({
  profile: {
    status,
    company,
    location,
    skills,
    website,
    social,
    bio,

    user: { name, email, avatar },
  },
}) {
  return (
    <Fragment>
      <section
        style={{ background: "white", padding: "20px", marginTop: "10px" }}
      >
        <article className="row profile_landing_page">
          <div className="col-md-3">
            <img
              className="Profile_img_landing img-fluid"
              src={avatar[0].url ? avatar[0].url : avatar[0]}
              alt={name}
            />
          </div>
          <div className="col-md-9">
            <div className="row custom_col-md-9-row">
              <div className="col-md-3">
                <h4 className="text-uppercase custom_heading">{name}</h4>
              </div>

              <hr />
            </div>
            <div className="row custom_col-md-9-row">
              <div className="col-md-12">
                <article className="row">
                  <p className="col-6">
                    <span>
                      <i className="fad fa-map-marker-alt"></i>
                      <strong>Location :</strong> {location}
                    </span>
                  </p>
                  <p className="col-6">
                    <span>
                      <i className="fas fa-envelope-open-text"></i>{" "}
                      <strong>Email : </strong> {email}
                    </span>
                  </p>
                  <p className="col-6">
                    <span>
                      <i className="fab fa-dev"></i>{" "}
                      <strong>Designation : </strong> {status}
                    </span>
                  </p>
                  <p className="col-6">
                    <span>
                      <i className="fas fa-building"> </i>{" "}
                      <strong>Company : </strong> {company}
                    </span>
                  </p>
                  <p className="text-lowercase col-6">
                    <span>
                      <i className="fad fa-globe"></i>{" "}
                      <strong>Website : </strong>
                      {website}
                    </span>
                  </p>
                </article>
              </div>
            </div>
            <section className="bioBlock my-3">
              <p>{name.trim("").split(" ")[0]} Bio :</p>

              {bio}
            </section>
          </div>
        </article>
        <footer className="full-width">
          <article>
            <div className="col-md-12">
              <span>Skills</span>
              <ul className="list-group list-group-horizontal float-right">
                {skills.slice(0, 10).map((skill, index) => (
                  <li
                    key={index}
                    className="list-inline badge badge-white text-capitalize m-1"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </footer>
      </section>
    </Fragment>
  );
}

export default TopBlockProfile;
