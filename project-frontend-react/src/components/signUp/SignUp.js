import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap";
import axios from "axios";
import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";

function SignUp(props) {
  const [validate, setIsInvalid] = useState("rounded signup-card-input-text");
  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    city: "",
    password: "",
  });

  let history = useHistory();

  const onChangeForm = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClickSignUp = async (e) => {
    let userResponse = await axios.post(
      "http://127.0.0.1:8000/api/b_users",
      user
    );

    if (!userResponse["data"].success) {
      setIsError(true);
      setIsInvalid("rounded signup-card-input-text is-invalid");
      setError(userResponse["data"].errors);
    } else {
      setIsError(false);
      setIsInvalid("rounded signup-card-input-text");
      setUser({
        name: "",
        email: "",
        city: "",
        password: "",
      });

      history.push("/signin");
    }
  };

  // const onClickSignUp = async (e) => {
  //   let userResponse = await axios.post(
  //     "http://127.0.0.1:8000/api/b_user",
  //     user
  //   );
  //   console.log(userResponse["data"].success);
  //   if (userResponse["data"].success) {
  //     setIsError(true);
  //     setError(userResponse["data"].errors);
  //     setIsInvalid("rounded signup-card-input-text is-invalid");
  //     console.log("errors: ", userResponse["data"].errors);
  //   } else {
  //     setIsError(true);
  //     console.log("success: ", userResponse["data"].success);
  //   }

  //   setError({
  //     city: "The city field is required.",
  //     email: "The email field is required.",
  //     name: "The name field is required.",
  //     password: "The password field is required.",
  //   });
  //   // console.log(userResponse);
  //   // console.log(userResponse["data"]);
  //   // console.log(userResponse["data"].success);
  //   //console.log(userResponse["data"].errors);
  //   // console.log(userResponse["data"].errors.city[0]);
  //   //console.log(userResponse);
  // };

  useEffect(() => {
    console.log("from component ", isError, validate);
  });

  return (
    <div className="signup-background mt-3 container">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="signup-card myDiv">
            <Card.Header>
              <h3 className="text-center text-muted"> Sign Up</h3>
            </Card.Header>
            <Card.Body className="signup-card-body-text">
              <Row>
                <Col md={{ span: 4 }}>
                  <h4 className="px-5">Name</h4>
                </Col>
                <Col md={{ span: 8 }}>
                  <InputGroup className="mb-3" hasValidation>
                    <Form.Control
                      value={user.name}
                      onChange={onChangeForm}
                      name="name"
                      className={validate}
                      type="text"
                      required
                      autoComplete="off"
                    />
                    {isError && (
                      <Form.Control.Feedback type="invalid">
                        {error.name}
                      </Form.Control.Feedback>
                    )}
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col md={{ span: 4 }}>
                  <h4 className="px-5">City</h4>
                </Col>
                <Col md={{ span: 8 }}>
                  <InputGroup className="mb-3" hasValidation>
                    <Form.Control
                      value={user.city}
                      onChange={onChangeForm}
                      name="city"
                      className={validate}
                      type="text"
                      required
                      autoComplete="off"
                    />
                    {isError && (
                      <Form.Control.Feedback type="invalid">
                        {error.city}
                      </Form.Control.Feedback>
                    )}
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 4 }}>
                  <h4 className="px-5">Email</h4>
                </Col>
                <Col md={{ span: 8 }}>
                  <InputGroup className="mb-3" hasValidation>
                    <Form.Control
                      value={user.email}
                      onChange={onChangeForm}
                      name="email"
                      className={validate}
                      type="email"
                      required
                      autoComplete="off"
                    />
                    {isError && (
                      <Form.Control.Feedback type="invalid">
                        {error.email}
                      </Form.Control.Feedback>
                    )}
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 4 }}>
                  <h4 className="px-5">Password</h4>
                </Col>
                <Col md={{ span: 8 }}>
                  <InputGroup className="mb-3" hasValidation>
                    <Form.Control
                      value={user.password}
                      onChange={onChangeForm}
                      name="password"
                      className={validate}
                      type="password"
                      required
                      autoComplete="off"
                    />
                    {isError && (
                      <Form.Control.Feedback type="invalid">
                        {error.password}
                      </Form.Control.Feedback>
                    )}
                  </InputGroup>
                </Col>
              </Row>
              <Button onClick={onClickSignUp} variant="outline-success mx-5">
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  );
}

export default SignUp;
