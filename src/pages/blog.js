import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
const axios = require("axios").default;

const Blog = (props) => {
  const increaseLikes = async (id) => {
    const foundPost = props.show.find((post) => post._id === id);
    console.log("post" + foundPost.likes);
    let tempArray = [...foundPost.whoClicked];
    const userLocal = JSON.parse(localStorage.getItem("user"));
    tempArray.push(userLocal._id);

    try {
      axios
        .put(`https://dcidevs-backend.herokuapp.com/blogs/${id}`, {
          likes: foundPost.likes + 1,
          whoClicked: tempArray,
        })
        .then((resp) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="showPostsSection">
      <div>
        <div className="clip-blog"></div>
      </div>
      <div className="container">
        {localStorage.getItem("token") ? (
          <Link to="/addPosts" className="link_addPost">
            <div className="text-center">
              <button className="btn newPostButton" type="button">
                Write a new post
              </button>
            </div>
          </Link>
        ) : (
          <Link to="/login" className="link_addPost">
            <div className="text-center">
              <button className="btn btn-warning newPostButton" type="button">
                Write a new post
              </button>
            </div>
          </Link>
        )}
      </div>
      <div className="container blogs-container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {props.show.length < 1 ? (
              <h2 className="blogs">No Blogs Yet</h2>
            ) : (
              <Container>
                <Row className="mt-5">
                  {props.show.map((post, index) => (
                    <Col lg={6} md={6} sm={12}>
                      <Card className="blogCards">
                        <Card.Body>
                          <Card.Title className="blogUser">
                            <div className="d-flex">
                              <div className="align-self-center user-img">
                                {post.image ? <img src={post.image} /> : null}
                              </div>
                              <div className="align-self-center ml-4">
                                {post.user ? post.user.firstName : ""}
                                {/* {post.user.firstName} */}
                              </div>
                            </div>
                          </Card.Title>
                          <Card.Subtitle className="blogTitle">
                            {post.title}
                          </Card.Subtitle>
                          <Card.Text className="blogContent">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: post.content,
                              }}
                              className="card-text"
                            ></p>
                          </Card.Text>
                          <Card.Footer className="d-flex">
                            <div className="mt-2">
                              <AiFillLike
                                onClick={() =>
                                  post.whoClicked.find(
                                    (element) =>
                                      element ==
                                      JSON.parse(localStorage.getItem("user"))
                                        ._id
                                  )
                                    ? ""
                                    : increaseLikes(post._id)
                                }
                                className="likeButton"
                              />
                            </div>
                            <div className="likesNumber ">
                              &nbsp;{post.likes}{" "}
                            </div>
                          </Card.Footer>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
