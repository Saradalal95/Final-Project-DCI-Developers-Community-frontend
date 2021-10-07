import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useParams } from "react-router-dom";

const axios = require("axios").default;

const ShowQuestion = (props) => {
  console.log(props);

  const { id } = useParams();

  const [answer, setAnswer] = useState("");

  const inputContentRef = useRef();

  const foundQuestion = props.showQuestionDetails.find(
    (question) => id == question._id
  );

  const userLocal = JSON.parse(localStorage.getItem("user"));
  let userName = userLocal.firstName;
  let userImage = userLocal.image;
  console.log(foundQuestion);

  const handleBody = (e) => {
    console.log(e);
    inputContentRef.current.value = e;
    setAnswer(e);
  };

  const addAnswers = async (answer, userName, userImage) => {
    let myAnswer = { content: answer, user: userName, image: userImage };
    let tempArray = [...foundQuestion.answer, myAnswer];

    var data = { answer };
    try {
      axios
        .put(`https://dcidevs-backend.herokuapp.com/forum/${id}`, {
          answer: tempArray,
        })
        .then((response) => {
          props.sendQuestionsGetRequest();
        });
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  console.log(answer);

  return (
    <div className="container showQuestionDetails-container">
      {foundQuestion ? (
        <>
          <div className="card showQuestionDetails-cards p-3">
            <div className="card-header showQuestionDetails-header pt-2 pb-2">
              <span>
                {foundQuestion.user ? foundQuestion.user.firstName : ""}
              </span>
              <span className="float-right topic">{foundQuestion.topic}</span>
            </div>
            <div className="card-body">
              <h5 className="card-title showQuestionDetails-title">
                {foundQuestion.title}
              </h5>
              <p
                className="card-text showQuestionDetails-content"
                dangerouslySetInnerHTML={{
                  __html: foundQuestion.content,
                }}
              ></p>
            </div>
          </div>
        </>
      ) : (
        "Question content not found"
      )}

      {foundQuestion
        ? foundQuestion.answer.map((ans) => (
            <div class="card showQuestionDetails-cards p-3">
              <div class="card-header showQuestionDetails-header d-flex">
                <div className="align-self-center">
                  {ans.image ? <img src={ans.image} width={50} /> : null}
                </div>
                <div className="ml-4 align-self-center">
                  Answered by {ans.user}
                </div>
              </div>
              <div class="card-body">
                <p>{console.log(ans)}</p>
                <p
                  className="card-text showAnswerDetails"
                  dangerouslySetInnerHTML={{
                    __html: ans.content,
                  }}
                ></p>
              </div>
            </div>
          ))
        : ""}

      <h1 className="mb-5">Your Answer</h1>
      <form className="form-container">
        <div className="form-group">
          <ReactQuill
            className="border border-dark"
            placeholder="write something amazing..."
            modules={ShowQuestion.modules}
            formats={ShowQuestion.formats}
            onChange={handleBody}
            ref={inputContentRef}
          />
        </div>
      </form>
      <Link to="/forum">
        <button
          onClick={() => addAnswers(answer, userName, userImage)}
          type="button"
          className="btn btn-warning p-3 submit-button"
        >
          Submit
        </button>{" "}
      </Link>
    </div>
  );
};

ShowQuestion.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
ShowQuestion.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

/*
 * PropType validation
 */

export default ShowQuestion;
