import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const SetGrade = ({ match }) => {
  const id = match.params.id;
  const cid = id.substring(0, 8);
  const [maxMark, setMaxMark] = useState("");
  const cname = id.substring(9, id.length);

  useEffect(() => {
    if (!adminInfo) {
      history.push("/");
    }
    axios
      .all([
        axios.get(`/course/get/report/${cid}`),
        axios.get(`/course/grade/status`),
        axios.get(`/course/graderange/${cid}`),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log(response2.data.status);
          setName(response1.data.admin.Name);
          setEmail(response1.data.admin.EmailID);
          setPhone(response1.data.admin.PhoneNum);
          setAddress(response1.data.admin.Address);

          setStatus(response2.data.status);
        })
      );

    axios
      .get()
      .then((response) => {
        console.log(response);
        setReports(response.data.report);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!adminInfo) {
      history.push("/");
    }
    axios
      .all([
        axios.get(`/admin/${adminInfo.result.adminID}`),
        axios.get(`/admin/status`),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log(response2.data.status);
          setName(response1.data.admin.Name);
          setEmail(response1.data.admin.EmailID);
          setPhone(response1.data.admin.PhoneNum);
          setAddress(response1.data.admin.Address);

          setStatus(response2.data.status);
        })
      );
  }, [adminInfo, name, email, address, phone, status]);

  return (
    <div>
      <h1>Grade Range for {cid}</h1>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Min </th>
            <th>Max</th>
            <th>Average</th>
            <th>Number of Students</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr>
              <td>{report.CourseID}</td>
              <td>{report.CourseName}</td>
              <td>{report.Min}</td>
              <td>{report.Max}</td>
              <td>
                {Number.isInteger(report.Average)
                  ? report.Average
                  : report.Average.toFixed(2)}
              </td>
              <td>{report.Num}</td>
              <td>
                <Link
                  className="btn btn-sm btn-success"
                  to={`/admin/set/grade/${report.CourseID}-${report.CourseName}`}
                >
                  Set Grade
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SetGrade;
