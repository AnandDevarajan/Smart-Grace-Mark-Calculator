import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { updateCoursemark } from "../../actions/courseActions";
import { COURSE_MARK_UPDATE_RESET } from "../../constants/courseConstants";
import axios from "axios";

const CourseMarkEdit = ({ match, history }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const [cid, setCid] = useState(facultyInfo.result.CourseID);

  const courseDetails = useSelector((state) => state.courseDetails);
  const { error } = courseDetails;

  const coursemarkUpdate = useSelector((state) => state.coursemarkUpdate);
  const { error: errorUpdate, success: successUpdate } = coursemarkUpdate;

  const [internals, setInternals] = useState("");
  const [marks, setMarks] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: COURSE_MARK_UPDATE_RESET,
      });

      history.push(`/faculty/students/${facultyInfo.result.Department}`);
    } else {
      if (facultyInfo) {
        axios
          .get(`/course/mark/edit/${id}-${cid}`)
          .then((response) => {
            console.log(response);
            setInternals(response.data.markList[0].Internals);
            setMarks(response.data.markList[0].Marks);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        history.push("/faculty/login");
      }
    }
  }, [successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (internals > 50 || marks > 50) {
      setMessage("");
      setMessage("Invalid details");
    } else if (internals !== "" && marks !== "") {
      setMessage("");
      dispatch(updateCoursemark(id, cid, internals, marks));
    } else {
      setMessage("Enter all details");
    }
  };

  return (
    <>
      <Link
        to={`/faculty/students/${facultyInfo.result.Department}`}
        className="btn btn-light my-3 goback"
      >
        Go Back
      </Link>

      <FormContainer>
        <div className="card ml-5 px-3 py-3 overflow my_card ">
          <h1 className="text-info">EDIT MARK {cid} </h1>
          <p>Roll Number : {id}</p>
          {message && <Message variant="danger">{message}</Message>}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Internals</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter  Description"
                  value={internals}
                  onChange={(e) => setInternals(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Marks</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </div>
      </FormContainer>
    </>
  );
};

export default CourseMarkEdit;
