import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";

const AdminChangePassword = ({ history, match }) => {
  const id = match.params.id;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const adminSignin = useSelector((state) => state.adminSignin);
  const { error, adminInfo } = adminSignin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      setMessage("Enter all the details");
    } else if (password != confirmPassword) {
      setMessage("Password does not match");
    } else {
      axios
        .put(`/admin/changepassword/${id}`, { password })
        .then((response) => {
          history.push("/admin/profile/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Link to={`/admin/edit/profile/${adminInfo.result.adminID}`}>
        <Button variant="light">
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <FormContainer>
        <div className="card ml-5 px-3 py-3 overflow my_card">
          <Form onSubmit={submitHandler}>
            <h1 className="text-info">Change Password</h1>
            {message && <Message variant="warning">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <Form.Group controlId="password">
              <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                New Password
              </Form.Label>
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
              Save Changes
            </Button>
          </Form>
        </div>
      </FormContainer>
    </>
  );
};

export default AdminChangePassword;
