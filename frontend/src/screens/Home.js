import React, { useState } from "react";
import "./Home.css";
import { Button, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import InfoIcon from "@material-ui/icons/Info";
import Message from "../components/Message";

const Home = ({ history }) => {
  const [user, setUser] = useState("[select user]");
  const [message, setMessage] = useState(null);

  const signInHandler = (user) => {
    if (user != "[select user]") {
      history.push(`/${user}/login`);
    } else {
      setMessage(null);
      setMessage("select an user");
    }
  };

  const signUpHandler = (user) => {
    if (user != "[select user]") {
      history.push(`/${user}/signup`);
    } else {
      setMessage(null);
      setMessage("select an user");
    }
  };

  return (
    <FormContainer>
      <div className="card ml-3 px-3 py-3 overflow my_card mt-4 home_card">
        {message != null && (
          <Message variant="info">
            <InfoIcon />
            <span>{message}</span>
          </Message>
        )}
        <h1 className="text-primary text-center ">
          <span className="text-info">Smart Grace Mark Calculator</span>
        </h1>
        <Form>
          <Form.Group controlId="user">
            <Form.Label
              style={{ color: "black", fontWeight: "bold" }}
            ></Form.Label>
            <Form.Control
              as="select"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            >
              <option>[select user]</option>
              <option>student</option>
              <option>faculty</option>
              <option>admin</option>
            </Form.Control>
          </Form.Group>
          <Row>
            <Button
              variant="info"
              className="mt-3 admin_button ml-auto mr-auto"
              style={{ width: "218px" }}
              onClick={() => signInHandler(user)}
            >
              Sign In
            </Button>
          </Row>
          <Row>
            {user != "admin" && user != "faculty" && (
              <Button
                variant="success"
                className="mt-3 admin_button ml-auto mr-auto"
                style={{ width: "218px" }}
                onClick={() => signUpHandler(user)}
              >
                Create an account
              </Button>
            )}
          </Row>
        </Form>
      </div>
    </FormContainer>
  );
};

export default Home;
