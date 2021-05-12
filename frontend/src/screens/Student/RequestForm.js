import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { listGracemarks } from "../../actions/gracemarkActions";
import { studentRequestGM, studentLogin } from "../../actions/studentActions";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";

const RequestForm = ({ location, history }) => {
  const [request, setRequest] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const studentSignin = useSelector((state) => state.studentSignin);
  const { error, studentInfo } = studentSignin;

  const gracemarkList = useSelector((state) => state.gracemarkList);
  const { gracemarks } = gracemarkList;

  const studentRequest = useSelector((state) => state.studentRequest);
  const { success, studentInfo: updatedStudent } = studentRequest;

  const redirect = "/student/login";

  useEffect(() => {
    if (success) {
      history.push("/student/profile");
    } else {
      dispatch(listGracemarks());
      axios.get(`/student/${studentInfo.result.RollNum}`).then((response) => {
        setStatus(response.data.student.Requested);
      });
    }
  }, [history, redirect, success, updatedStudent]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (request === "" || request === "select") {
      setMessage("Select an option");
    } else {
      setMessage("");
      dispatch(studentRequestGM(request));
      window.location.pathname = "/student/profile";
    }
  };

  return (
    <>
      <Link to="/student/profile" className="goback">
        <Button variant="light">
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      {status === "pending" ? (
        <FormContainer>
          <Message variant="warning">
            Already requested for grace Mark{" "}
            <Link to="/student/profile"> Go to profile</Link>
          </Message>
        </FormContainer>
      ) : (
        <FormContainer>
          <div className="card ml-5 px-3 py-3 overflow my_card signup_card">
            <h1 className="text-info">Request for Grace mark</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="gracemarkId">
                <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                  Grace mark
                </Form.Label>
                <Form.Control
                  as="select"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                >
                  <option>select</option>
                  {gracemarks.map((gracemark) => (
                    <option key={gracemark.GraceMarkID}>
                      {gracemark.Description}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="success">
                Request
              </Button>
            </Form>
          </div>
        </FormContainer>
      )}
    </>
  );
};

export default RequestForm;
