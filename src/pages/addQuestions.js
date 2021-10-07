import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useHistory } from "react-router-dom";

const axios = require("axios").default;

const AddQuestions = (props) => {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  let history = useHistory();

  const inputTitleRef = useRef();
  const inputContentRef = useRef();
  const inputTopicRef = useRef();

  const handleBody = (e) => {
    console.log(e);
    inputContentRef.current.value = e;
  };

  const userLocal = JSON.parse(localStorage.getItem("user"));
  let userImage = userLocal.image;
  console.log(userImage);

  const addQuestion = async () => {
    try {
      const response = await axios.post(
        "https://dcidevs-backend.herokuapp.com/forum",
        {
          topic: inputTopicRef.current.value,
          title: inputTitleRef.current.value,
          content: inputContentRef.current.value,
          user: JSON.parse(localStorage.getItem("user"))._id,
          image: userImage,
        },
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );

      await props.sendQuestionsGetRequest();
      setTopic("");
      setTitle("");
      history.push("/forum");
      console.log("response is :" + JSON.stringify(response));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  /* const AddQuestionsOnClick = async () => {
    // console.log(inputContentRef.current);
    try {
      await addQuestion(
        inputTopicRef.current.value,
        inputTitleRef.current.value,
        inputContentRef.current.value,
        userImage
      );
      setTopic("");
      setTitle("");
      history.push("/forum");
    } catch (error) {
      console.log("error");
    }
  };
 */
  return (
    <section className="writeQuestionSection">

      <div>
        <div className="first-clip-ask-question"></div>
        <div className="second-clip-ask-question"></div>
        <div className="third-clip-ask-question"></div>
      </div>

      <div>
        <div className="clip-add-question"></div>
      </div>
      <div className="container write-container">
        <h1 className="text-center">
          Welcome{" "}
          {localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user")).firstName}
          !
        </h1>
        <div className=" blog-container">
          <form>
            <h1 className="pt-5 m-5">Feel free to ask your questions here!</h1>

            <div className="form-group mt-4 pl-5 pr-5">
              <label htmlFor="inputTopic">Topic</label>
              <input
                ref={inputTopicRef}
                type="text"
                className="form-control border border-dark"
                id="inputTopic"
                border
                border-dark
              />
            </div>
            <div className="form-group pl-5 pr-5">
              <label htmlFor="inputTitle">Title</label>
              <input
                ref={inputTitleRef}
                type="text"
                className="form-control border border-dark"
                id="inputTitle"
                border
                border-dark
              />
            </div>
            <div className="form-group pl-5 pr-5">
              <label htmlFor="inputContent">Content</label>
              <ReactQuill
                className="border border-dark"
                placeholder="write something amazing..."
                modules={AddQuestions.modules}
                formats={AddQuestions.formats}
                onChange={handleBody}
                id="inputContent"
                ref={inputContentRef}
              />
            </div>
            <Link to="/forum" className="pl-5">
              <button
                onClick={() => addQuestion()}
                type="button"
                className="btn mt-3 postButton"
              >
                <h3>Ask</h3>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

AddQuestions.modules = {
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
AddQuestions.formats = [
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

export default AddQuestions;
