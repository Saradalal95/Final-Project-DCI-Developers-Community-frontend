import React, { useEffect, useRef, useState } from "react";

import { Col, Row } from "react-bootstrap";
import ProfileImage from "@daym3l/react-profile-image";
import { Link } from "react-router-dom";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const axios = require("axios").default;

const UserProfile = (props) => {
  const [user, setUser] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [dailyAgenda, setDailyAgenda] = useState([]);
  const [agendaByDate, setAgendaByDate] = useState([]);
  const [value, onChange] = useState(new Date());

  const userLocal = JSON.parse(localStorage.getItem("user"));
  let userId = "";

  if (userLocal) {
    userId = userLocal._id;
  }
  console.log(userId);

  const inputRef = useRef();
  console.log(inputRef);

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getUserBlogs();
  }, []);
  useEffect(() => {
    getUserQuestions();
  }, []);
  useEffect(() => {
    getAgenda();
  }, []);
  useEffect(() => {
    getDailyAgenda();
  }, []);
  useEffect(() => {
    getAgendaByDate();
  }, [value]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://dcidevs-backend.herokuapp.com/users/${userId}`
      );
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserBlogs = async () => {
    try {
      const resp = await axios.get(
        `https://dcidevs-backend.herokuapp.com/profile/blog/${userId}`
      );
      setUserBlogs(resp.data);
      console.log(userBlogs);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserQuestions = async () => {
    try {
      const resp = await axios.get(
        `https://dcidevs-backend.herokuapp.com/profile/question/${userId}`
      );
      setUserQuestions(resp.data);
      console.log(userQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  const getImages = async (base64Image, fileImage) => {
    // Do something with the selected image)
    try {
      await axios
        .put(`https://dcidevs-backend.herokuapp.com/users/${userId}`, {
          image: base64Image,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => props.sendUserGetRequest());
      window.location.reload();
      console.log(user.image);
    } catch (error) {
      console.log(error);
    }
    console.log(base64Image);
    console.log(fileImage);
  };

  function formatDateAsDD_MM_YYYY(date) {
    const regex = /\d{2}\.\d{2}\.\d{4}/;
    if (regex.test(date)) {
      return date;
    }
    date = new Date(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return day + "." + month + "." + year;
  }
  const today = new Date();
  const formatted = formatDateAsDD_MM_YYYY(today);
  console.log("today:", today, ":", formatted);
  const moonLanding = "1969-07-20";
  const moonFormat = formatDateAsDD_MM_YYYY(moonLanding);
  console.log("moonLanding:", moonLanding, ":", moonFormat);
  const getAgenda = async () => {
    try {
      const response = await axios.get(
        "https://dcidevs-backend.herokuapp.com/agenda"
      );
      console.log(response);
      setAgenda(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(agenda);

  const getDailyAgenda = async () => {
    try {
      const response = await axios.get(
        `https://dcidevs-backend.herokuapp.com/agenda/${formatDateAsDD_MM_YYYY(
          value
        )}`
      );
      console.log(response);
      setDailyAgenda(response.data[0]);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(dailyAgenda);

  const getAgendaByDate = async () => {
    try {
      const response = await axios.get(
        `https://dcidevs-backend.herokuapp.com/agenda/${formatDateAsDD_MM_YYYY(
          value
        )}`
      );
      console.log(response);
      setAgendaByDate(response.data[0]);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <div className="first-clip"></div>
        <div className="second-clip"></div>
        <div className="third-clip"></div>
      </div>
      <div className="profile-container">
        <div className="h1-bg">
          <h1 className="text-center">Welcome back {user.firstName}!</h1>
        </div>
        <Row>
          <Col>
            <div className="user-info-container">
              <div className="user-image-container">
                {user.image ? (
                  <div>
                    <img src={user.image} alt="User Profile"></img>
                    {/* <Button>Change Photo</Button> */}
                  </div>
                ) : (
                  <div>
                    <ProfileImage
                      className="mt-5 mx-auto"
                      camera
                      returnImage={getImages}
                      uploadBtnProps={{ variant: "contained", label: "Up" }}
                    />
                  </div>
                )}
              </div>
              <div className="info-container mt-3">
                {user ? (
                  <div>
                    <div className="mt-3 profile-user-name">
                      <div>{user.userName}</div>
                    </div>
                    <div className="mt-3">First Name: {user.firstName}</div>
                    <div>Last Name: {user.lastName}</div>
                    <div>Class: {user.className}</div>
                    <div>{user.email}</div>
                  </div>
                ) : null}
              </div>
            </div>
          </Col>

          <Col>
            <div className="search-container">
              <h2 className="text-center mt-5">
                Agenda <span>{formatDateAsDD_MM_YYYY(value)}</span>
              </h2>

              <div>
                <div className="calendar">
                  <Calendar
                    width={200}
                    height={200}
                    format="DD/MM/YYYY"
                    onClickDay={getAgendaByDate}
                    onChange={onChange}
                    value={value}
                    computableFormat={"DD.MM.YYYY"}
                  />
                </div>
              </div>

              {console.log(value)}
              <div>
                {!agendaByDate ? (
                  <h2 className="text-center mt-5">
                    There is no info for this day!
                  </h2>
                ) : null}
                {agendaByDate &&
                agendaByDate.topics &&
                agendaByDate.topics.length !== 0 ? (
                  <h2 className="text-center mt-5">Topics</h2>
                ) : null}

                <ol>
                  {agendaByDate && agendaByDate.topics
                    ? agendaByDate.topics.map((topic) => (
                        <li className="mt-3 ml-5">
                          {" "}
                          &nbsp;&nbsp;&nbsp;{topic}
                        </li>
                      ))
                    : null}
                </ol>
                {agendaByDate &&
                agendaByDate.resources &&
                agendaByDate.resources.length !== 0 ? (
                  <h2 className="text-center mt-5">Resources</h2>
                ) : null}

                <ol>
                  {agendaByDate && agendaByDate.resources
                    ? agendaByDate.resources.map((resource) => (
                        <li className="mt-2 ml-5">
                          {" "}
                          <a href={resource} rel="noreferrer" target="_blank">
                            {resource}
                          </a>
                        </li>
                      ))
                    : null}
                </ol>
                {agendaByDate &&
                agendaByDate.exercises &&
                agendaByDate.exercises.length !== 0 ? (
                  <h2 className="text-center mt-5">Exercises</h2>
                ) : null}

                <ol>
                  {agendaByDate && agendaByDate.exercises
                    ? agendaByDate.exercises.map((exercise) => (
                        <li className="mt-2 ml-5">
                          {" "}
                          &nbsp;&nbsp;&nbsp;{exercise}
                        </li>
                      ))
                    : null}
                </ol>
                {agendaByDate &&
                agendaByDate.questions &&
                agendaByDate.questions.length !== 0 ? (
                  <h2 className="text-center mt-5">Questions</h2>
                ) : null}

                <ol>
                  {agendaByDate && agendaByDate.questions
                    ? agendaByDate.questions.map((question) => (
                        <li className="mt-2 ml-5">
                          {" "}
                          &nbsp;&nbsp;&nbsp;{question}
                        </li>
                      ))
                    : null}
                </ol>
                {agendaByDate && agendaByDate.recording ? (
                  <h2 className="text-center mt-5">Meeting Recording</h2>
                ) : null}
                <ol>
                  {agendaByDate && agendaByDate.recording ? (
                    <div>
                      <ul>
                        <li>
                          Link:{" "}
                          <a href={agendaByDate.recording.link}>
                            {agendaByDate.recording.link}
                          </a>
                        </li>
                        <li>Passcode: {agendaByDate.recording.passcode}</li>
                      </ul>
                    </div>
                  ) : null}
                </ol>
              </div>
            </div>
          </Col>

          <Col>
            <div className="my-stuff-container">
              <div className="myQuestions-container d-flex flex-column justify-content-between">
                <div>
                  <h2 className="text-center mt-5">My Questions</h2>

                  <div className="mt-5 links">
                    {userQuestions.length !== 0 ? (
                      userQuestions.map((question, idx) => (
                        <div>
                          <span>{idx + 1 + "." + " "}</span>
                          <Link to={`/myQuestion/${question._id}`}>
                            <span>{question.title}</span>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <h3 className="text-center mt-5">
                        You didn't ask any questions yet!
                      </h3>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end mx-auto">
                  {localStorage.getItem("token") ? (
                    <Link to="/addQuestions">
                      <button type="button" className="askQuestion-btn mb-3">
                        Ask Question
                      </button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <button type="button" className="askQuestion-btn mb-3">
                        Ask Question
                      </button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="myBlogs-container d-flex flex-column justify-content-between">
                <div>
                  <h2 className="text-center mt-5">My Blogs</h2>
                  <div className="mt-5 links">
                    {userBlogs.length !== 0 ? (
                      userBlogs.map((blog, idx) => (
                        <div>
                          <span>{idx + 1 + "." + " "}</span>
                          <Link to={`/myBlog/${blog._id}`}>
                            <span>{blog.title}</span>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <h3 className="text-center mt-5">
                        You don't have any blogs yet!
                      </h3>
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-end mx-auto">
                  {localStorage.getItem("token") ? (
                    <Link to="/addPosts">
                      <button type="button" className="askQuestion-btn mb-3">
                        Add Blog
                      </button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <button type="button" className="askQuestion-btn mb-3">
                        Add Blog
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserProfile;
