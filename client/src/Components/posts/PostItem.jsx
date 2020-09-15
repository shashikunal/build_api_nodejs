import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, removePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  removePost,
  auth,
  post: { _id, title, text, tags, name, avatar, user, likes, comments, date },
}) => {
  console.log(addLike);
  return (
    <div>
      <div className="card card-body">
        <div className="row">
          <div className="col-md-2 border-right text-center">
            <Link to={`/profile/${user}`}>
              <img
                src={avatar[0].url ? avatar[0].url : avatar[0]}
                alt="user"
                className="post_user_pic img-fluid rounded-circle"
                style={{ height: 120, width: 120 }}
              />
              <p className="my-2">{name}</p>
            </Link>
          </div>
          <div className="col-md-10">
            <div>
              <h5 className="text-uppercase text-primary font-weight-bold border-bottom pb-2">
                {title}
              </h5>
              <p className="text-muted">{text}</p>
              <p className="text-success border-bottom pb-2 tags_block">
                Posted on <i className="far fa-clock ml-2 mr-2"></i>
                <Moment format="DD MMM YYYY">{date}</Moment>
                <span className="float-right">
                  {tags.slice(0, 4).map((tag, index) => (
                    <li key={index} className="list-inline  text-capitalize">
                      {tag}
                    </li>
                  ))}
                </span>
              </p>
              <footer className="row">
                <div className="btn-group btn-block col-3">
                  <button
                    className="btn btn-light btn-sm m-1"
                    onClick={(e) => {
                      e.preventDefault();
                      addLike(_id);
                    }}
                  >
                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                    <span className="mr-1 ml-2">
                      {likes.length > 0 && <span>{likes.length}</span>}
                    </span>
                  </button>
                  <button
                    className="btn btn-light btn-sm m-1"
                    onClick={(e) => {
                      e.preventDefault();
                      removeLike(_id);
                    }}
                  >
                    <i className="fas fa-thumbs-down"></i>
                    <span className="mr-1 ml-2"></span>
                  </button>
                </div>
                <div className="col-md-9 text-right">
                  <button className="btn btn-dark btn-sm m-1">
                    <i
                      className="fa fa-comment mr-2 ml-2"
                      aria-hidden="true"
                    ></i>
                    <span>Comments</span> <span className="mr-1 ml-2">2</span>
                  </button>

                  {!auth.loading && user === auth.user._id && (
                    <button
                      className="btn btn-danger btn-sm m-1"
                      onClick={(e) => removePost(_id)}
                    >
                      <i className="fas fa-trash-alt  mr-2 ml-2"></i>
                      <span>Delete Post</span>{" "}
                    </button>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PostItem.propTypes = {
//   post: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, removePost })(
  PostItem
);
