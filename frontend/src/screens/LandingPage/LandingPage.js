import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  // const navigate = useNavigate();
  // useEffect hook to redirect to mynotes page if user is already logged in
  // useEffect(() => {
  //   document.title = "NotoSphere";
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     navigate("/mynotes");
  //   }
  // }, [navigate]);
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
                <Link to='/login'>
                  <Button size='lg' className='landingbutton'>
                    Login
                  </Button>
                </Link>
                <Link to='/register'>
                  <Button
                    size='lg'
                    className='landingbutton'
                    variant='outline-primary'
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
