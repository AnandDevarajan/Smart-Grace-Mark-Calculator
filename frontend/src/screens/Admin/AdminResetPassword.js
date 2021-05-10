import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";

const AdminResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { token } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      axios
        .post(`/admin/newpassword`, { password, token })
        .then((response) => {
          console.log(response);
          setMessage(null);
          setMessage(response.data.message);
        })
        .catch((err) => {
          console.log(err);
          setMessage(null);
          setMessage("Cannot reset password now");
        });
    } else {
      setMessage("");
      setMessage("Password does not match");
    }
  };
  return (
    <>
      {message === "Password updated successfully" ? (
        <>
          <Message variant="success">
            Password updated successfully{" "}
            <Link to="/admin/login" className="goback">
              click here to login
            </Link>
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
            <h2>CREATE NEW PASSWORD</h2>
            {message && <Message variant="danger">{message}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update password
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </>
  );
};

export default AdminResetPassword;
