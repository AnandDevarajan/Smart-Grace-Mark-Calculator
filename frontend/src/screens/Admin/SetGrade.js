import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { updateGradeRange } from "../../actions/courseActions";
import { GRADE_RANGE_UPDATE_RESET } from "../../constants/courseConstants";
import { Table, Button, Row, Col } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import axios from "axios";

const SetGrade = ({ match }) => {
  let id = match.params.id;
  let cid = id.substring(0, 8);
  let cname = id.substring(9, id.length);
  const [maxMark, setMaxMark] = useState("");
  const [minMark, setMinMark] = useState("");
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState("");
  const [grs, setGrs] = useState([]);

  const [O, setO] = useState("");
  const [Ap, setAp] = useState("");
  const [A, setA] = useState("");
  const [Bp, setBp] = useState("");
  const [B, setB] = useState("");
  const [C, setC] = useState("");
  const [P, setP] = useState("");
  const [F, setF] = useState("");

  const dispatch = useDispatch();

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  const facultySignin = useSelector((state) => state.facultySignin);
  const { facultyInfo } = facultySignin;

  const gradeRangeUpdate = useSelector((state) => state.gradeRangeUpdate);
  const { error, success } = gradeRangeUpdate;

  useEffect(() => {
    if (success) {
      dispatch({
        type: GRADE_RANGE_UPDATE_RESET,
      });
    } else if (adminInfo || facultyInfo) {
      axios
        .all([
          axios.get(`/course/graderange/${cid}`),
          axios.get(`/course/get/report/${cid}`),
        ])
        .then(
          axios.spread((response1, response2) => {
            setGrs(response1.data.grade);
            setO(response1.data.grade[0].O);
            setAp(response1.data.grade[0].Ap);
            setA(response1.data.grade[0].A);
            setBp(response1.data.grade[0].Bp);
            setB(response1.data.grade[0].B);
            setC(response1.data.grade[0].C);
            setP(response1.data.grade[0].P);
            setF(response1.data.grade[0].F);
            setStatus(response1.data.grade[0].status);
            setMaxMark(response2.data.report[0].Max);
            setMinMark(response2.data.report[0].Min);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    }
  }, [adminInfo, minMark, maxMark]);

  const setGradeRange = (max) => {
    dispatch(updateGradeRange(cid, max));
    window.location.pathname = `/admin/set/grade/${id}`;
  };

  const EditGradeRange = (O, Ap, A, Bp, B, C, P, F, cid) => {
    axios
      .put(`/course/edit/graderange/${cid}`, { O, Ap, A, Bp, B, C, P, F })
      .then((window.location.pathname = `/admin/set/grade/${id}`));
  };

  console.log(O, Ap, A, B, Bp, C, P, F);
  return (
    <>
      {adminInfo && (
        <div className="ml-5 align-items-center alllist_div">
          <Link to="/admin/course/report" className="goback">
            <Button variant="light">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <div className="card ml-5 overflow my_card">
            <h2 className="text-center list_heading text-info py-4">
              Grade Range
            </h2>
            <Row className="align-items-center ">
              <Col className="text-left">
                <Button style={{ width: "100%" }}>
                  {cid} - {cname}
                </Button>
              </Col>
            </Row>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>
                    <Button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#289672", width: "46px" }}
                    >
                      O
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#29bb89", width: "46px" }}
                    >
                      A+
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#29bb89", width: "46px" }}
                    >
                      A
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm btn-success"
                      style={{ width: "46px" }}
                    >
                      B+
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm btn-success"
                      style={{ width: "46px" }}
                    >
                      B
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm btn-warning"
                      style={{ width: "46px" }}
                    >
                      C
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm btn-danger"
                      style={{ width: "46px" }}
                    >
                      P
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#be0000", width: "46px" }}
                    >
                      F
                    </Button>
                  </th>
                  <th>Edit</th>
                  <th>Set Grade</th>
                </tr>
              </thead>
              <tbody>
                {grs.map((gr) => (
                  <tr>
                    {edit === false ? (
                      <>
                        <td>{cid}</td>
                        <td>{gr.O}</td>
                        <td>{gr.Ap}</td>
                        <td>{gr.A}</td>
                        <td>{gr.Bp}</td>
                        <td>{gr.B}</td>
                        <td>{gr.C}</td>
                        <td>{gr.P}</td>
                        <td>{gr.F}</td>
                      </>
                    ) : (
                      <>
                        <td>{cid}</td>
                        <td>
                          <input
                            defaultValue={gr.O}
                            onChange={(e) => setO(e.target.value)}
                            style={{ marginLeft: "5px", width: "50px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            defaultValue={gr.Ap}
                            onChange={(e) => setAp(e.target.value)}
                            style={{ marginLeft: "5px", width: "50px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            defaultValue={gr.A}
                            onChange={(e) => setA(e.target.value)}
                            style={{ marginLeft: "5px", width: "50px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            defaultValue={gr.Bp}
                            onChange={(e) => setBp(e.target.value)}
                            style={{ marginLeft: "5px", width: "50px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            defaultValue={gr.B}
                            onChange={(e) => setB(e.target.value)}
                            style={{ marginLeft: "5px", width: "50px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            defaultValue={gr.C}
                            onChange={(e) => setC(e.target.value)}
                            style={{ marginLeft: "5px", width: "50px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            defaultValue={gr.P}
                            onChange={(e) => setP(e.target.value)}
                            style={{ marginLeft: "5px", width: "50px" }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            defaultValue={gr.F}
                            onChange={(e) => setF(e.target.value)}
                            style={{ marginLeft: "5px", width: "50px" }}
                          />
                        </td>
                      </>
                    )}

                    <td>
                      {edit === false ? (
                        <EditIcon
                          className="icon"
                          style={{ color: "black" }}
                          onClick={() => setEdit(true)}
                        />
                      ) : (
                        <CheckIcon
                          className="icon"
                          style={{ color: "green" }}
                          onClick={() =>
                            EditGradeRange(O, Ap, A, Bp, B, C, P, F, cid)
                          }
                        />
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => {
                          setGradeRange(maxMark);
                        }}
                      >
                        GENERATE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {facultyInfo && status === "P" && (
        <div>
          <Link to={`/faculty/students/CSE`} className="goback">
            <Button variant="light">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <div className="card ml-5 overflow my_card">
            <h2 className="text-center list_heading text-info py-4">
              Grade Range
            </h2>
            <Row className="align-items-center ">
              <Col className="text-left">
                <Button style={{ width: "100%" }}>{cid}</Button>
              </Col>
            </Row>

            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>
                    <Button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#289672", width: "46px" }}
                    >
                      O
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#29bb89", width: "46px" }}
                    >
                      A+
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#29bb89", width: "46px" }}
                    >
                      A
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm btn-success"
                      style={{ width: "46px" }}
                    >
                      B+
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm btn-success"
                      style={{ width: "46px" }}
                    >
                      B
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm btn-warning"
                      style={{ width: "46px" }}
                    >
                      C
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm btn-danger"
                      style={{ width: "46px" }}
                    >
                      P
                    </Button>
                  </th>
                  <th>
                    {" "}
                    <Button
                      className="btn btn-sm"
                      style={{ backgroundColor: "#be0000", width: "46px" }}
                    >
                      F
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {grs.map((gr) => (
                  <tr>
                    <td>{cid}</td>
                    <td>{gr.O}</td>
                    <td>{gr.Ap}</td>
                    <td>{gr.A}</td>
                    <td>{gr.Bp}</td>
                    <td>{gr.B}</td>
                    <td>{gr.C}</td>
                    <td>{gr.P}</td>
                    <td>{gr.F}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
      {facultyInfo && status === "N/P" && (
        <div>
          <Link to={`/faculty/student/CSE`} className="goback">
            <Button variant="light">
              <ArrowBackIcon /> Go Back
            </Button>
          </Link>
          <h4 className="text-center text-info">GRADE RANGES NOT SET</h4>
        </div>
      )}
    </>
  );
};

export default SetGrade;
