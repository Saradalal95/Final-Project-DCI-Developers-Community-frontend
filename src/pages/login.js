import React, { useRef } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const axios = require("axios").default;

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const loginUser = async () => {
    console.log(emailRef.current.value);
    try {
      axios
        .post(`https://dcidevs-backend.herokuapp.com/users/login`, {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((resp) => {
          console.log("ok", resp);
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("user", JSON.stringify(resp.data.user));
          window.location.replace("/userprofile");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="login-clip"></div>
      <Container>
        <div className="login-container">
          <Row>
            <Col xs={0} sm={6} md={6} lg={6} id="login-img"></Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <h2 className="text-center mt-5">Welcome Back!</h2>

              <Form className="login-form">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="m-3">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    ref={emailRef}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="m-3">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your Password"
                    ref={passwordRef}
                  />
                </Form.Group>
                <div className="text-center">
                  <button
                    type="button"
                    className="m-3 login-btn"
                    onClick={loginUser}
                  >
                    Login
                  </button>
                </div>
              </Form>
              <h3 className="text-center m-5">Don't have an account?</h3>
              <div className="text-center">
                <Link to={"/register"}>
                  <button type="button" className="mb-5 register-btn">
                    Register
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Login;
