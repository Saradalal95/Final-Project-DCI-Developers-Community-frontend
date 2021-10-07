import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const axios = require("axios").default;

const MyQuestion = (props) => {
  const { id } = useParams();

  const [question, setQuestion] = useState({});

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    try {
      const response = await axios.get(
        `https://dcidevs-backend.herokuapp.com/forum/${id}`
      );
      console.log(typeof response.data);
      setQuestion(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(question);

  const deleteQuestion = async () => {
    try {
      await axios
        .delete(`https://dcidevs-backend.herokuapp.com/forum/${id}`, {
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
      <div className="my-clip2"></div>
      <Container>
        <Col sm={12} md={12} lg={8} className="question-container">
          {question ? (
            <div>
              <div className=" float-left topic">{question.topic}</div>
              <div className="question-section">
                <h1 className=" text-center">{question.title}</h1>

                <div
                  className="mt-5 text-center"
                  dangerouslySetInnerHTML={{
                    __html: question.content,
                  }}
                ></div>
                <div className="answers-section">
                  <h2 className="mt-5 text-center">Answers</h2>
                  <ul>
                    {question.answer && question.answer.length !== 0
                      ? question.answer.map((element, idx) => (
                          <div>
                            <h2 className="mt-3 text-primary">
                              Answered by {element.user}
                            </h2>
                            <div
                              className="mt-3 text-center"
                              dangerouslySetInnerHTML={{
                                __html: element.content,
                              }}
                            ></div>
                          </div>
                        ))
                      : null}
                  </ul>
                </div>
              </div>
              <div className="float-right mt-2">
                {question && question.answer && question.answer.length !== 0
                  ? question.answer.length
                  : 0}{" "}
                answers
              </div>
            </div>
          ) : null}

          <div className="d-flex justify-content-around justify-content-center btn-container">
            <Link to={`/updateMyQuestion/${id}`}>
              <Button className="register-btn">Update</Button>
            </Link>

            <Button className="register-btn" onClick={deleteQuestion}>
              Delete
            </Button>
          </div>
        </Col>
      </Container>
    </>
  );
};

export default MyQuestion;
