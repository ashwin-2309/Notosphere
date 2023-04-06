import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#1E1E1E",
        color: "#FFF",
        padding: "20px 0",
      }}
    >
      <Container>
        <Row>
          <Col className='text-center'>
            <p style={{ margin: 0 }}>
              Copyright © {new Date().getFullYear()} Notosphere. All rights
              reserved.
            </p>
            <a
              href='https://github.com/ashwin-2309/Notosphere'
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: "#FFF", textDecoration: "none" }}
            >
              GitHub Repo
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
