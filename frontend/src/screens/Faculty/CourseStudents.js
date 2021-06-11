import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { courseStudentMark } from "../../actions/studentActions";
import { updateCoursemark } from "../../actions/courseActions";
import { Link, Redirect } from "react-router-dom";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "../Home.css";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import DoneAllIcon from "@material-ui/icons/DoneAll";
const CourseStudents = ({ history, match }) => {
  const [message, setMessage] = useState(null);
  const [internals, setInternals] = useState("");
  const [marks, setMarks] = useState("");
  const [edit, setEdit] = useState(false);
  const [O, setO] = useState("");
  const [Ap, setAp] = useState("");
  const [A, setA] = useState("");
  const [Bp, setBp] = useState("");
  const [B, setB] = useState("");
  const [C, setC] = useState("");
  const [P, setP] = useState("");
  const [F, setF] = useState("");
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch("");

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const courseStudentMarkList = useSelector(
    (state) => state.courseStudentMarkList
  );
  const { students } = courseStudentMarkList;

  const [cid, setCid] = useState(facultyInfo.result.CourseID);

  useEffect(() => {
    if (facultyInfo) {
      dispatch(courseStudentMark(cid));
      axios
        .all([
          axios.get(`/course/range/details/${cid}`),
          axios.get(`/course/graderange/${cid}`),
        ])
        .then(
          axios.spread((response, response1) => {
            setO(response.data.range[0].O);
            setAp(response.data.range[0].Ap);
            setA(response.data.range[0].A);
            setBp(response.data.range[0].Bp);
            setB(response.data.range[0].B);
            setC(response.data.range[0].C);
            setP(response.data.range[0].P);
            setF(response.data.range[0].F);
            setStatus(response1.data.grade[0].status);
          })
        );
    } else {
      history.push("/");
    }
  }, [dispatch, history, facultyInfo, edit, O, Ap, A, Bp, B, C, P, F]);
  console.log("count", count);

  const submitMarks = (id, internals, marks) => {
    if (internals === "" || marks === "") {
      setMessage("");
      setMessage("Enter all the details");
    } else if (internals > 50 || marks > 50) {
      setMessage("");
      setMessage("Invalid details");
    } else {
      dispatch(updateCoursemark(id, cid, internals, marks));
      history.push(`/faculty/students/${facultyInfo.result.Department}`);
    }
  };
  console.log("Students", students);

  const calculateGrade = (id, total, O, Ap, A, Bp, B, C, P, F) => {
    axios
      .put(`/course/update/grade/${cid}`, {
        id,
        total,
        O,
        Ap,
        A,
        Bp,
        B,
        C,
        P,
        F,
      })
      .then((response) => {
        if (response.data) {
          <Redirect
            to={`/faculty/students/${facultyInfo.result.Department}`}
          />;
        }
      });
  };

  console.log("message", message);
  return (
    <>
      <div
        className="ml-5 align-items-center alllist_div"
        style={{ backgroundColor: "white" }}
      >
        <Link to="/faculty/profile" className="goback">
          <Button variant="light">
            <ArrowBackIcon /> Go Back
          </Button>
        </Link>
        <div className="card ml-5 px-3 overflow my_card">
          <Row className="align-items-center">
            <Col>
              <h1 className="list_heading text-info">
                STUDENT LIST - {facultyInfo.result.CourseID}
              </h1>
            </Col>
            <Col className="text-right">
              <Link to={`/admin/set/grade/${facultyInfo.result.CourseID}`}>
                <Button className="btn btn-sm">View Grade Ranges</Button>
              </Link>
            </Col>
          </Row>
          {message && <Message variant="info">{message}</Message>}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr style={{ color: "black" }}>
                <th>Roll No</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Batch</th>
                <th>Internals</th>
                <th>Marks</th>
                <th>Total </th>
                <th></th>
                <th>Grade</th>
                <th>Set Grade</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.RollNum}>
                  <td>{student.RollNum}</td>
                  <td>{student.Name}</td>
                  <td>{student.Branch}</td>
                  <td>{student.Batch}</td>
                  <td>
                    {student.Internals === "N/P" ? (
                      <input
                        onChange={(e) => setInternals(e.target.value)}
                        style={{ marginLeft: "5px", width: "40px" }}
                      />
                    ) : (
                      <td>{student.Internals}</td>
                    )}
                  </td>
                  <td>
                    {student.Marks === "N/P" ? (
                      <input
                        onChange={(e) => setMarks(e.target.value)}
                        style={{ marginLeft: "5px", width: "40px" }}
                      />
                    ) : (
                      <td>{student.Marks}</td>
                    )}
                  </td>
                  <td>
                    <td>{student.Total}</td>
                  </td>
                  {student.Total === "N/P" ? (
                    <td>
                      <CheckBoxIcon
                        className="icon"
                        style={{ color: "green" }}
                        onClick={() => {
                          submitMarks(student.RollNum, internals, marks);
                        }}
                      />
                    </td>
                  ) : (
                    <td>
                      {" "}
                      <LinkContainer
                        to={`/faculty/course/mark/edit/${student.RollNum}`}
                      >
                        <EditIcon className="icon" />
                      </LinkContainer>
                    </td>
                  )}
                  <td>
                    <td>
                      {" "}
                      {student.Grade === "O" && (
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
                      {student.Grade === "A+" && (
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
                      {student.Grade === "A" && (
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
                      {student.Grade === "B+" && (
                        <Button
                          className="btn btn-sm btn-success"
                          style={{ width: "30px", padding: "2px" }}
                        >
                          B+
                        </Button>
                      )}
                      {student.Grade === "B" && (
                        <Button
                          className="btn btn-sm btn-success"
                          style={{ width: "30px", padding: "2px" }}
                        >
                          B
                        </Button>
                      )}
                      {student.Grade === "C" && (
                        <Button
                          className="btn btn-sm btn-warning"
                          style={{ width: "30px", padding: "2px" }}
                        >
                          C
                        </Button>
                      )}
                      {student.Grade === "P" && (
                        <Button
                          className="btn btn-sm btn-danger"
                          style={{ width: "30px", padding: "2px" }}
                        >
                          P
                        </Button>
                      )}
                      {student.Grade === "F" && (
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
                  </td>
                  <td>
                    {/* &&
                    status === "P" */}
                    {student.Grade === "N/P" &&
                    student.Total != "N/P" &&
                    status === "P" ? (
                      <td>
                        <DoneAllIcon
                          className="icon"
                          style={{ color: "green" }}
                          onClick={() =>
                            calculateGrade(
                              student.RollNum,
                              student.Total,
                              O,
                              Ap,
                              A,
                              Bp,
                              B,
                              C,
                              P,
                              F
                            )
                          }
                        />
                      </td>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CourseStudents;
