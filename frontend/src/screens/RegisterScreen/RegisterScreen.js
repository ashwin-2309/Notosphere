import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // }, [history, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/users/register",
          {
            name,
            email,
            password,
            pic,
          },
          config
        );
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));

        // put the userinfo in the cookie
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  const postDetails = (pics) => {
    setPicMessage(null);
    if (!pics) {
      return setPicMessage("Please select an image");
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      // basic HTML
      data.append("file", pics);
      data.append("upload_preset", "Notosphere");
      // https://api.cloudinary.com/v1_1/ashwin-2309
      data.append("cloud_name", "ashwin-2309");
      fetch("https://api.cloudinary.com/v1_1/ashwin-2309/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an image file (png or jpeg)");
    }
  };
  return (
    <>
      <MainScreen title='REGISTER'>
        <div className='loginContainer'>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                placeholder='Enter Name'
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                value={email}
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 10,
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 10,
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </Form.Group>
            {picMessage && (
              <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
            )}
            {/* <Form.Group controlId='pic'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.File
                id='custom-file'
                type='image/png'
                label='Upload Profile Picture'
                custom
                onChange={(e) => postDetails(e.target.files[0])}
              ></Form.File>
            </Form.Group> */}

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Have an Account?? <Link to='/login'>Login</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default RegisterScreen;
