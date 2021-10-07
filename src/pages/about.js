import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <div className="row about1strow">
        <div className="col-lg-6 col-md-6 col-sm-12 aboutCol about-Text">
          <h1 className="fw-bold">About Us</h1>
          <h2 className="mt-4 mb-3">Who We Are?</h2>
          <p className="mt-5 mb-5">
            We are WebDevelopment students in DCI , working together in the
            final project . Our project idea is to help DCI students to have all
            the information about this course in one webpage
          </p>
          <p>
            The idea was coming after we sow our needs and we want to help the
            next students to have more structured information in the same place.
          </p>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 about1strowImg1">
          <div className="row d-flex justify-content-between pt-3">
            <div className="col-lg-6 col-md-6 col-sm-12 pictures">
              <div id="mariana"></div>
              <div>
                <h5>Mariana</h5>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 pictures">
              <div id="kinjal"></div>
              <div>
                <h5>Kinjal</h5>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 pictures">
              <div id="sara"></div>
              <div>
                <h5>Sara</h5>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-evenly pt-5">
            <div className="col-lg-6 col-md-6 col-sm-12 pictures">
              <div id="heriberto"></div>
              <div>
                <h5>Heriberto</h5>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 pictures">
              <div id="florin"></div>
              <div className="text-center">
                <h5>Florin</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row about2strow">
        <div className="col-lg-6 col-md-6 col-sm-12 about1strowImg2">
          <div className="row d-flex">
            <div id="webdev-gif" className="col-lg-6 col-md-6 col-sm-12"></div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 aboutCol about-Text">
          <h2 className="mt-4 mb-3">What we offer?</h2>
          <p className="mt-5 mb-5">
            We are coming with a structured platform where all the students
            which are registered can have access to value information about web
            development as follows:
          </p>
          <li>
            in Forum page ,they can ask questions and receive answers about
            different topics related to web development; 
          </li>
          <li>
            inside Blog Page , they can see , write and like posts from the
            other users;
          </li>
          <li>News Page is offering information about programming world;</li>
          <li>
            in Resources Page the students are able to find websites from where
            they can learn how to code;
          </li>
          <li>
            Jobs page is offering information about jobs which are available in
            this domain.
          </li>
        </div>
      </div>
    </Container>
  );
};

export default About;
