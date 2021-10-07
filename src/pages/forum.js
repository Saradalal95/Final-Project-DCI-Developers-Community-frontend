import React from "react";
import { Container } from "react-bootstrap";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Link } from "react-router-dom";

const axios = require("axios").default;

const Forum = (props) => {
  let contentHTML = null;
  console.log(props.show);

  return (
    <>
      <div>
        <div className="forum-clip1"></div>
        <div className="forum-clip2"></div>
        <div className="forum-clip3"></div>
        <div className="forum-clip4"></div>
      </div>

      <Container className="mt-5">
        <div className="text-center pt-5 pb-3">
          {localStorage.getItem("token") ? (
            <Link to="/addQuestions">
              <button type="button" className="askQuestion-btn">
                Ask Question
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button type="button" className="askQuestion-btn">
                Ask Question
              </button>
            </Link>
          )}
        </div>
        <div className="container question-cards-container">
          {props.show.map((question, index) => (
            <div key={index} class="card mt-5 question-cards">
              <div className="card-header pl-5 question-user d-flex">
                <div className="align-self-center">
                  {question.image ? (
                    <img src={question.image} width={50} />
                  ) : null}
                </div>
                <div className="ml-3 align-self-center">
                  {question.user ? question.user.firstName : null}
                </div>
              </div>
              <div className="card-body">
                <blockquote class="blockquote mb-0 question-title">
                  {localStorage.getItem("user") ? (
                    <Link
                      to={`/showQuestion/${question._id}`}
                      className="question-link"
                    >
                      <p className="p-4">{question.title}</p>
                    </Link>
                  ) : (
                    <Link to="/login" className="question-link">
                      <p className="p-4">{question.title}</p>
                    </Link>
                  )}

                  <footer className="p-4">
                    <div className="float-left topic">
                      <p className="text-center">{question.topic}</p>
                    </div>
                    <div className="float-right">
                      <p>
                        {" "}
                        {question && question.answer
                          ? question.answer.length
                          : 0}{" "}
                        {question.answer.length > 1 ? "answers" : "answer"}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="blog-container d-flex flex-wrap justify-content-center ">
        {props.questions ? (
          props.questions.reverse().map((element) => {
            const converter = new QuillDeltaToHtmlConverter(
              element.content.ops,
              {}
            );
            contentHTML = converter.convert();
            return (
              <div className="post-box mt-5 col-lg-5 card d-flex">
                <h3 class="card-header">{element.title}</h3>
                <div class="card-body">
                  <p class="card-text">
                    <div
                      className="post-content"
                      dangerouslySetInnerHTML={{
                        __html: contentHTML,
                      }}
                    ></div>
                  </p>
                  <p className="pacifico-font">posted by: {element.user}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loader">LOADING...</div>
        )}
      </div> */}
      </Container>
    </>
  );
};

export default Forum;
