import React, { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";
const LandingPage = () => {
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     history.push("/mynotes");
  //   }
  // }, [history]);
  return (
    <div className='main'>
      <Container>
        <Row>
          <div className='intro-text'>
            <div>
              <h1 className='title'>Welcome to NotoSphere</h1>
              <p className='subtitle'>
                A place to share your notes and learn from others
              </p>
              <div className='buttonContainer'>
                <Button href='/login' size='lg' className='landingbutton'>
                  Login
                </Button>

                <Button
                  href='/register'
                  size='lg'
                  className='landingbutton'
                  variant='outline-primary'
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
