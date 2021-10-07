import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useHistory } from "react-router-dom";

const axios = require("axios").default;
const AddPosts = (props) => {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState("");

  let history = useHistory();

  const inputTitleRef = useRef();
  const inputContentRef = useRef();

  const handleBody = (e) => {
    console.log(e);
    inputContentRef.current.value = e;
  };

  const userLocal = JSON.parse(localStorage.getItem("user"));
  let userImage = userLocal.image;

  const addPost = async () => {
    try {
      const response = await axios.post(
        "https://dcidevs-backend.herokuapp.com/blogs",
        {
          title: inputTitleRef.current.value,
          content: inputContentRef.current.value,
          clicked: false,
          likes: 0,
          whoClicked: [],
          image: userImage,
        },
        {
          headers: {
            auth: localStorage.getItem("token"),
          },
        }
      );
      console.log(localStorage.getItem("token"));
      await props.sendGetRequest();
      setTitle("");
      history.push("/blog");
      console.log("response is :" + JSON.stringify(response));
    } catch (error) {
      console.log("U need to sign in" + error);
      if (!localStorage.getItem("token")) {
        alert("Please sign in to write post");
        window.location.replace("/");
      }
    }
  };

  console.log("user" + localStorage.getItem("user"));

  return (
    <section className="writeBlogSection">
      <div>
        <div className="clip-post"></div>
      </div>

      <div className="container">
        <div className="row">
          <h1 className="welcomePost text-center">
            Welcome{" "}
            {localStorage.getItem("user") &&
              JSON.parse(localStorage.getItem("user")).firstName}!
          </h1>

          <div className="blog-container">
            <form>
              <h1 className="welcomeAddPost pt-5 text-center">
                You can post your blogs here!
              </h1>
              <div className="form-group mt-5">
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
              <div className="form-group">
                <label htmlFor="inputContent">Content</label>
                <ReactQuill
                  className="border border-dark"
                  placeholder="write something amazing..."
                  modules={AddPosts.modules}
                  formats={AddPosts.formats}
                  onChange={handleBody}
                  id="inputContent"
                  ref={inputContentRef}
                />
              </div>
              <button
                onClick={() => addPost()}
                type="button"
                className="btn mt-5 postButton"
              >
                <h3>Save</h3>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

AddPosts.modules = {
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
AddPosts.formats = [
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

export default AddPosts;
