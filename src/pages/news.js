import React, { useEffect, useState } from "react";
import { Button, Card, Container, Navbar, Nav } from "react-bootstrap";
const axios = require("axios");

const News = () => {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState("1");

  const updateNews = (pageNumber) => {
    setPage(pageNumber);
    // getArticles();
  };
  const getArticles = async () => {
    await axios
      .get(`https://dcidevs-backend.herokuapp.com/news/${page}`)
      .then(function (response) {
        setNews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getArticles();
  }, [page]);
  console.log(news);

  return (
    <Container id="top" className="news-container">
      <div className="news-header-container">
        <h1>ARTICLES</h1>
      </div>
      <Navbar bg="light" variant="light">
        <Container className="navbar-container">
          {/* <Nav className="me-auto> */}
          <Navbar.Brand href="#home">News</Navbar.Brand>
          <Button
            className="navbtn-news"
            onClick={() => {
              updateNews(1);
            }}
          >
            1
          </Button>
          <Button
            className="navbtn-news"
            onClick={() => {
              updateNews(2);
            }}
          >
            2
          </Button>
          <Button
            className="navbtn-news"
            onClick={() => {
              updateNews(3);
            }}
          >
            3
          </Button>
          <Button
            className="navbtn-news"
            onClick={() => {
              updateNews(4);
            }}
          >
            4
          </Button>
          <Button
            className="navbtn-news"
            onClick={() => {
              updateNews(5);
            }}
          >
            5
          </Button>
          <Button
            className="navbtn-news"
            onClick={() => {
              updateNews(6);
            }}
          >
            6
          </Button>
          {/* </Nav> */}
        </Container>
      </Navbar>
      {news.map((article, idx) => (
        <Card key={idx} className="article-card mb-4">
          <Card.Body>
            {article.cover_image ? (
              <Card.Img className="article-image" src={article.cover_image} />
            ) : (
              <Card.Img className="article-image" src="../images/laptop.jpeg" />
            )}

            <Card.Title className="mt-4">
              <h3>{article.title}</h3>
            </Card.Title>
            <Card.Text className="mt-4">{article.description}</Card.Text>
            <Button
              className="mt-4"
              size="lg"
              variant="primary"
              target="_blank"
              href={article.url}
            >
              read more
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted ">
            Created at {article.readable_publish_date}
          </Card.Footer>
        </Card>
      ))}

      <div className="d-grid gap-2 mt-4">
        <Button href="#top" className="backBtn" size="lg">
          Back to top
        </Button>
      </div>
    </Container>
  );
};

export default News;
