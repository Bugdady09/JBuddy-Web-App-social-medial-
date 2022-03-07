import React, { useEffect, useState, useContext } from "react";
import "./SignIn.css";
import { Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../context/UseContext";
import { useHistory } from "react-router-dom";
import Footer from "../footer/Footer";

function SignIn(props) {
  const { isLogin, setIslogin } = useContext(UserContext);
  const [validate, setIsInvalid] = useState("rounded signup-card-input-text");
  const [user, setUser] = useState({
    email: "",

    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({
    email: "",

    password: "",
  });

  let history = useHistory();

  const onChangeForm = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onClickSignUp = async (e) => {
    let userResponse = await axios.post(
      "http://127.0.0.1:8000/api/login",
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
        email: "",

        password: "",
      });

      //return console.log(userResponse["data"].userinfo);
      localStorage.setItem(
        "userinfo",
        JSON.stringify(userResponse["data"].userinfo)
      );
      //set context islog variable true
      setIslogin(true);
      history.push("/profile");
    }
  };

  useEffect(() => {
    console.log("from component ", isError, validate);
  });

  return (
    <div className="signup-background mt-3 container">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="signup-card myDiv">
            <Card.Header>
              <h3 className="text-center text-muted"> Sign In</h3>
            </Card.Header>
            <Card.Body className="signup-card-body-text">
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
                Sign In
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Footer></Footer>
    </div>
  );
}

export default SignIn;
