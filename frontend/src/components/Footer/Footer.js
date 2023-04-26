import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: "0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1E1E1E",
        color: "#FFF",
        padding: "20px",
      }}
    >
      <Container>
        <Row>
          <Col xs={12} md={6} className='text-left'>
            <p style={{ margin: 0 }}>
              &copy; {new Date().getFullYear()} Notosphere. All rights reserved.
            </p>
          </Col>
          <Col xs={12} md={6} className='text-right'>
            <a
              href='https://github.com/ashwin-2309/Notosphere'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: "#FFF",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <FaGithub style={{ marginRight: "5px" }} />
              GitHub Repo
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
