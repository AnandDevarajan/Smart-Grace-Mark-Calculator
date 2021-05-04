import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { getAStudent } from "../../actions/studentActions";
import { Link } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../Home.css";
import axios from "axios";

const ViewCourseMarks = ({ history, match }) => {
  const str = match.params.id;
  let n = str.length;
  let rollnum = str.substring(0, n - 6);
  let branch = str.substring(n - 5, n - 2);
  let batch = str.substring(n - 1, n);
  const [marks, setMarks] = useState([]);
  const [graceAccepted, setGraceAccepted] = useState("");
  const [grace, setGrace] = useState([]);

  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.studentList);
  const { error, students } = studentList;

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  useEffect(() => {
    if (adminInfo || facultyInfo || studentInfo) {
      axios
        .all([
          axios.get(`/course/student/marks/${rollnum}`),
          axios.get(`/student/${rollnum}`),
          axios.get(`/student/grace/info/${rollnum}`),
        ])
        .then(
          axios.spread((response1, response2, response3) => {
            console.log(response1, response2, response3);
            setMarks(response1.data.markList);
            setGraceAccepted(response2.data.student.Requested);
            setGrace(response3.data.GraceInfo);
          })
        );
    } else {
      history.push("/");
    }
  }, [dispatch, history, adminInfo]);

  const calculateNewGrade = (grace) => {
    axios
      .put(`/student/caluclate/new/grade/${rollnum}`, { grace })
      .then((response) => {});
  };

  const studentGet = useSelector((state) => state.studentGet);
  const { student } = studentGet;

  return (
    <div className="ml-5 mt-3 align-items-center">
      {adminInfo ? (
        <Link to="/admin/students">
          <Button variant="light">
            <ArrowBackIcon /> Go Back
          </Button>
        </Link>
      ) : (
        <Row>
          <Col>
            <Link to={`/faculty/adviser/students/${facultyInfo.result.Batch}`}>
              <Button variant="light">
                <ArrowBackIcon /> Go Back
              </Button>
            </Link>
          </Col>
          {graceAccepted === "accepted" && (
            <Col className="text-right">
              <Button variant="info" onClick={() => calculateNewGrade(grace)}>
                Calculate Grade Mark
              </Button>
            </Col>
          )}
        </Row>
      )}
      <div className="card ml-5 px-3 overflow my_card">
        <h1 className="py-3 text-center">Mark List</h1>
        <h4>
          {rollnum} - {branch} {batch}
        </h4>
        <h4></h4>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Internals</th>
                <th>Marks</th>
                <th>Total</th>
                <th>Grade</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark) => (
                <tr>
                  <td>{mark.CourseID}</td>
                  <td> {mark.CourseName}</td>
                  <td>{mark.Internals}</td>
                  <td>{mark.Marks}</td>
                  <td>{mark.Total}</td>
                  <td>
                    {" "}
                    {mark.Grade === "O" && (
                      <Button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#289672",
                          width: "30px",
                          padding: "2px",
                        }}
                      >
                        O
                      </Button>
                    )}
                    {mark.Grade === "A+" && (
                      <Button
                        className="btn btn-sm text-center"
                        style={{
                          backgroundColor: "#29bb89",
                          width: "30px",
                          padding: "2px",
                        }}
                      >
                        A+
                      </Button>
                    )}
                    {mark.Grade === "A" && (
                      <Button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#29bb89",
                          width: "30px",
                          padding: "2px",
                        }}
                      >
                        A
                      </Button>
                    )}
                    {mark.Grade === "B+" && (
                      <Button
                        className="btn btn-sm btn-success"
                        style={{ width: "30px", padding: "2px" }}
                      >
                        B+
                      </Button>
                    )}
                    {mark.Grade === "B" && (
                      <Button
                        className="btn btn-sm btn-success"
                        style={{ width: "30px", padding: "2px" }}
                      >
                        B
                      </Button>
                    )}
                    {mark.Grade === "C" && (
                      <Button
                        className="btn btn-sm btn-warning"
                        style={{ width: "30px", padding: "2px" }}
                      >
                        C
                      </Button>
                    )}
                    {mark.Grade === "P" && (
                      <Button
                        className="btn btn-sm btn-danger"
                        style={{ width: "30px", padding: "2px" }}
                      >
                        P
                      </Button>
                    )}
                    {mark.Grade === "F" && (
                      <Button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#be0000",
                          width: "30px",
                          padding: "2px",
                        }}
                      >
                        F
                      </Button>
                    )}
                  </td>
                  <td>{mark.credits}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ViewCourseMarks;
