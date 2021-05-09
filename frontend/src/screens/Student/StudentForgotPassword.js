import React, { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import "./Student.css";
const StudentForgotPassword = ({ location, history }) => {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`/student/resetpassword`, { email })
      .then((response) => {
        console.log(response);
        setMessage(null);
        setMessage("Check your email");
      })
      .catch((err) => {
        console.log(err);
        setMessage(null);
        setMessage("Cannot reset password now");
      });
  };

  return (
    <>
      {message === "Check your email" ? (
        <>
          <Link to="/" className="goback">
            <Button variant="light">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <h3>Student password reset</h3>
          <Message variant="success">
            Check your email to reset password
          </Message>
        </>
      ) : (
        <>
          <Link to="/" className="goback">
            <Button variant="light">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <FormContainer>
            <h1 className="text-info">Student password reset</h1>
            {message && <Message variant="danger">{message}</Message>}
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
              <Button type="submit" variant="primary">
                Reset password
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default StudentForgotPassword;
