import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { facultyLogin } from "../../actions/facultyActions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const FacultyLogin = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const facultySignin = useSelector((state) => state.facultySignin);
  const { error, facultyInfo } = facultySignin;

  // const redirect = location.search
  //   ? location.search.split('=')[1]
  //   : '/faculty/profile';

  const redirect = "/faculty/profile";
  useEffect(() => {
    if (facultyInfo) {
      history.push(redirect);
    }
  }, [history, facultyInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(facultyLogin(email, password));
  };

  return (
    <>
      {!facultyInfo && (
        <>
          <Link to="/" className="goback">
            <Button variant="light">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <FormContainer>
            <div className="card ml-5 px-3 overflow my_card mt-5">
              <h2 className="text-info">Faculty Login</h2>
              {error && <Message variant="danger">{error}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="info">
                  Sign In
                </Button>
              </Form>
              <Row className="py-3">
                <Col>
                  <Link to="/faculty/forgotpassword">Forgot Password</Link>
                </Col>
              </Row>
            </div>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default FacultyLogin;
