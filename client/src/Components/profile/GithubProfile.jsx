import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../Spinner";
import Moment from "react-moment";
const GithubProfile = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  const [displayGitHub, displayGitHubToggle] = useState(false);
  let toggleIcon =
    displayGitHub === false ? (
      <i className="fas fa-plus"></i>
    ) : (
      <i className="fas fa-minus"></i>
    );

  let repoElement = repos.map((repo, key) => (
    <div className="repo bg-white p-1 my-1" key={key}>
      <div className="d-flex git_Block">
        <p className="custom_col-md-9-row1 float-left1">
          <a href={repo.html_url} target="_blank" rel="noopener noreferer">
            {repo.name}
          </a>
        </p>
        <p className="float-right1">
          <span className="badge badge-dark">{repo.language}</span>
        </p>
        <p className="test">
          <Moment format="YYYY">{repo.created_at}</Moment>
        </p>
      </div>
    </div>
  ));

  return (
    <div>
      <div>
        {repos === null ? (
          <Spinner />
        ) : (
          <div>
            <h2
              className="custom_heading"
              onClick={() => displayGitHubToggle(!displayGitHub)}
            >
              Github repos
              <span
                className="text-right float-right"
                title="click here to expand"
              >
                {toggleIcon}
              </span>
            </h2>
            {displayGitHub && repoElement}
          </div>
        )}
      </div>
    </div>
  );
};

GithubProfile.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(GithubProfile);
