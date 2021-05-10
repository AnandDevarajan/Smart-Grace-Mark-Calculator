import React, { useEffect, useState } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../Home.css";
import axios from "axios";

const ViewCourseMarks = ({ history, match }) => {
  const str = match.params.id;
  let n = str.length;
  let rollnum = str.substring(0, n - 6);
  const [marks, setMarks] = useState([]);
  const [graceAccepted, setGraceAccepted] = useState("");
  const [grace, setGrace] = useState([]);
  const [finalStatus, setFinalStatus] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [finalcgpa, setFinalCgpa] = useState("");
  const [cgpaStatus, setCgpaStatus] = useState("");
  const [gm, setGm] = useState("");

  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.studentList);
  const { error } = studentList;

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
            console.log(response1);
            setMarks(response1.data.markList);
            setGraceAccepted(response2.data.student.Requested);
            setCgpa(response2.data.student.cgpa);
            setFinalCgpa(response2.data.student.final_cgpa);
            setCgpaStatus(response2.data.student.final_status);
            setFinalStatus(response1.data.markList[0].final_status);
            setGm(response2.data.student.GraceMark);
            setGrace(response3.data.GraceInfo);
          })
        );
    } else {
      history.push("/");
    }
  }, [dispatch, history, adminInfo]);

  const calculateNewGrade = (grace) => {
    axios
      .put(`/student/caluclate/new/grade/${rollnum}`, { grace, gm })
      .then((response) => {});
    window.location.pathname = `/student/view/marklist/${str}`;
  };
  console.log(cgpa);
  const calculateCGPA = (marks) => {
    axios
      .put(`/student/caluclate/cgpa/${rollnum}`, { marks })
      .then((response) => {});
    window.location.pathname = `/student/view/marklist/${str}`;
  };

  const studentGet = useSelector((state) => state.studentGet);
  const { student } = studentGet;
  return (
    <div className="ml-5 mt-3 align-items-center alllist_div">
      {adminInfo ? (
        <Row>
          <Col>
            <Link to="/admin/students" className="goback">
              <Button variant="light">
                <ArrowBackIcon /> Go Back
              </Button>
            </Link>
          </Col>

          <Col className="text-right">
            {cgpaStatus === "N/P" ||
              (cgpa == "NaN" && (
                <Button variant="success" onClick={() => calculateCGPA(marks)}>
                  Calculate CGPA
                </Button>
              ))}
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Link
              to={`/faculty/adviser/students/${facultyInfo.result.Batch}`}
              className="goback"
            >
              <Button variant="light">
                <ArrowBackIcon /> Go Back
              </Button>
            </Link>
          </Col>
          {graceAccepted === "accepted" && finalStatus === "N/P" && (
            <Col className="text-right">
              <Button variant="info" onClick={() => calculateNewGrade(grace)}>
                Calculate Grace Mark
              </Button>
            </Col>
          )}
        </Row>
      )}
      <div className="card ml-5 px-3 overflow my_card">
        <h1 className="py-3 text-center text-info">Mark List</h1>
        <Row>
          <Col>
            <h4>{rollnum}</h4>
          </Col>
        </Row>
        {finalcgpa === cgpa ? (
          <Row>
            <Col>
              <Button>cgpa {cgpa}</Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <Button className="btn-warning">cgpa {cgpa}</Button>
            </Col>
            <Col>
              <Button className=""> Final cgpa {finalcgpa}</Button>
            </Col>
            <Col className="np"></Col>
            <Col className="np"></Col>
            <Col className="np"></Col>
          </Row>
        )}

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
                {graceAccepted === "accepted" && <th>Final Grade</th>}
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

                  {graceAccepted === "accepted" && mark.final_status === "P" && (
                    <td>
                      {" "}
                      {mark.Final_Grade === "O" && (
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
                      {mark.Final_Grade === "A+" && (
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
                      {mark.Final_Grade === "A" && (
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
                      {mark.Final_Grade === "B+" && (
                        <Button
                          className="btn btn-sm btn-success"
                          style={{ width: "30px", padding: "2px" }}
                        >
                          B+
                        </Button>
                      )}
                      {mark.Final_Grade === "B" && (
                        <Button
                          className="btn btn-sm btn-success"
                          style={{ width: "30px", padding: "2px" }}
                        >
                          B
                        </Button>
                      )}
                      {mark.Final_Grade === "C" && (
                        <Button
                          className="btn btn-sm btn-warning"
                          style={{ width: "30px", padding: "2px" }}
                        >
                          C
                        </Button>
                      )}
                      {mark.Final_Grade === "P" && (
                        <Button
                          className="btn btn-sm btn-danger"
                          style={{ width: "30px", padding: "2px" }}
                        >
                          P
                        </Button>
                      )}
                      {mark.Final_Grade === "F" && (
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
                  )}
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
