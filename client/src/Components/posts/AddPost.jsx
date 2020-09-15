import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPost } from "../../actions/post";

const AddPost = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    tags: "",
  });

  let { title, text, tags } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    addPost(formData, history);
  };

  return (
    <Fragment>
      <div className="container rounded bg-white mt-5 mb-5">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-md-9 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Add Posts</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Post Title </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="post title"
                      name="title"
                      value={title}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="labels">Tags</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="* add tags"
                      name="tags"
                      value={tags}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="labels">description</label>
                    <textarea
                      cols="10"
                      rows="10"
                      type="text"
                      className="form-control"
                      placeholder="write post description"
                      name="text"
                      value={text}
                      onChange={(e) => handleChange(e)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <button
                  className="btn btn-primary profile-button float-left"
                  type="submit"
                >
                  Add Post
                </button>
                <Link className="btn btn-light float-right" to="/posts">
                  Go back
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

// AddPost.propTypes = {
//   prop: PropTypes,
// };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addPost })(AddPost);
