import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const axios = require("axios").default;

const MyBlog = (props) => {
  const { id } = useParams();

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    try {
      const response = await axios.get(
        `https://dcidevs-backend.herokuapp.com/blogs/${id}`
      );
      console.log(response.data);
      setBlog(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(blog);

  const deleteBlog = async () => {
    try {
      await axios
        .delete(`https://dcidevs-backend.herokuapp.com/blogs/${id}`, {
          data: { _id: id },
        })
        .then((resp) => {
          props.sendQuestionsGetRequest();
        });
    } catch (error) {
      console.log(error);
    }
    window.location.replace("/userprofile");
  };
  return (
    <>
      <div className="my-clip1"></div>
      <Container>
        <Col sm={12} md={12} lg={8} className="question-container">
          {blog ? (
            <div>
              <div className="question-section">
                <h1 className=" text-center">{blog.title}</h1>

                <div
                  className="mt-5 text-center"
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
                  }}
                ></div>
              </div>
              <div className="float-right mt-2">
                {blog && blog.likes ? blog.likes : 0} likes
              </div>
            </div>
          ) : null}

          <div className="d-flex justify-content-around justify-content-center btn-container">
            <Link to={`/updateMyBlog/${id}`}>
              <Button className="register-btn">Update</Button>
            </Link>

            <Button className="register-btn" onClick={deleteBlog}>
              Delete
            </Button>
          </div>
        </Col>
      </Container>
    </>
  );
};

export default MyBlog;
