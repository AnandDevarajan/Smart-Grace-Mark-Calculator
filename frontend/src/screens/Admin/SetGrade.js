import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const SetGrade = ({ match, history }) => {
  const id = match.params.id;
  const cid = id.substring(0, 8);
  const cname = id.substring(9, id.length);
  const [maxMark, setMaxMark] = useState("");
  const [minMark, setMinMark] = useState("");
  const [grs, setGrs] = useState([]);

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (!adminInfo) {
      history.push("/");
    }
    axios
      .all([
        axios.get(`/course/graderange/${cid}`),
        axios.get(`/course/get/report/${cid}`),
        // axios.get(`/course/grade/status`),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log(response1.data, response2.data);
          setGrs(response1.data.grade);
          setMaxMark(response2.data.report[0].Max);
          setMinMark(response2.data.report[0].Min);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setGradeRange = () => {};

  return (
    <div>
      <Link to="/admin/course/report">
        <Button variant="light">
          <ArrowBackIcon /> Go Back
        </Button>
      </Link>
      <h3 style={{ textTransform: "capitalize" }}>
        Grade Range - <span>{cname}</span>
      </h3>
      <p className="text-center">
         The marks in each grade represents the lower range
      </p>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Course ID</th>

            <th>O</th>
            <th>A+</th>
            <th>A</th>
            <th>B+</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>F</th>
            <th>Set Grade</th>
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
              <td>{gr.D}</td>
              <td>{gr.F}</td>
              <td>
                <button
                  className="btn btn-sm btn-success"
                  onClick={setGradeRange}
                >
                  Generate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SetGrade;
