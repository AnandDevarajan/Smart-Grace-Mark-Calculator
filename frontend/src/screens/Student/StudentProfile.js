import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import ClassIcon from "@material-ui/icons/Class";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SchoolIcon from "@material-ui/icons/School";
import CloseIcon from "@material-ui/icons/Close";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SendIcon from "@material-ui/icons/Send";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import { Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import Message from "../../components/Message";

const StudentProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roll, setRoll] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
  const [grace, setGrace] = useState("");
  const [batch, setBatch] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const [value, onChange] = useState(new Date());

  const studentSignin = useSelector((state) => state.studentSignin);
  const { studentInfo } = studentSignin;

  useEffect(() => {
    if (!studentInfo) {
      history.push("/");
    }

    axios
      .all([
        axios.get(`/student/${studentInfo.result.RollNum}`),
        axios.get(`/admin/status`),
      ])
      .then(
        axios.spread((response1, response2) => {
          console.log(response1);
          setName(response1.data.student.Name);
          setRoll(response1.data.student.RollNum);
          setEmail(response1.data.student.EmailID);
          setDegree(response1.data.student.Degree);
          setBranch(response1.data.student.Branch);
          setBatch(response1.data.student.Batch);
          setPhone(response1.data.student.PhoneNum);
          setAddress(response1.data.student.Address);
          setGrace(response1.data.student.GraceDesc);
          setStatus(response1.data.student.Requested);
          setResult(response2.data.status);
        })
      );
  }, [status]);

  const cancelRequest = (roll) => {
    axios.put(`/student/cancel/request/${roll}`).then((response) => {
      window.location.pathname = "/";
    });
  };

  const deleteMyAccount = (roll) => {
    if (window.confirm("Do you want to delete this account ?")) {
      axios.delete(`/student/delete/account/${roll}`);
    } else {
      return (window.location.pathname = "/student/profile");
    }
    localStorage.removeItem("studentInfo");
    window.location.pathname = "/";
  };

  console.log(status);
  return (
    <div
      className="ml-5  align-items-center alllist_div"
      style={{ backgroundColor: "white" }}
    >
      <div className="card ml-5 px-3 overflow my_card profile_card">
        <div>
          {result === "Published" && (
            <Message variant="success">
              <NotificationsIcon /> Results published
            </Message>
          )}
          <h1 className="text-success">Student Profile</h1>
          <p className="lead mt-2">
            <AccountBoxIcon style={{ color: "#2196f3" }} /> Welcome{" "}
            <strong className="text-info"> {name}</strong>
          </p>
          <Row className="mt-4">
            <Col>
              <Link
                to={`/student/edit/profile/${studentInfo.result.RollNum}`}
                style={{ textDecoration: "None" }}
              >
                <EditTwoToneIcon />{" "}
                <Button className="btn btn-sm btn-primary apply">
                  Edit Profile
                </Button>
              </Link>
            </Col>
            <Col>
              {(status === "N/A" || status === "rejected") &&
                result != "Published" && (
                  <Link
                    to="/student/request"
                    style={{ textDecoration: "None" }}
                  >
                    <SendIcon />{" "}
                    <Button className="btn btn-sm btn-info apply">
                      Request for Grace Mark
                    </Button>
                  </Link>
                )}
            </Col>
            <Col>
              <DeleteForeverIcon
                className="icon"
                onClick={() => deleteMyAccount(roll)}
              />{" "}
              <Button
                className="btn btn-sm btn-danger apply"
                onClick={() => deleteMyAccount(roll)}
              >
                Delete My Account
              </Button>
            </Col>
          </Row>
          <h2 className="mt-4" style={{ textTransform: "Capitalize" }}>
            <PersonIcon style={{ color: "#2196f3" }} /> Student Details
          </h2>
          <Table hover responsive className="table table-sm">
            <thead>
              <tr>
                <th>
                  <FormatListNumberedIcon /> <span>Roll Number</span>
                </th>
                <th className="hide-sm np">
                  <SchoolIcon />
                  <span>Branch</span>
                </th>
                <th className="hide-sm">
                  <ClassIcon />
                  <span>Batch</span>
                </th>
                <th>
                  <BeenhereIcon />
                  <span>Grace Mark</span>
                </th>
                <th>
                  <EqualizerIcon />
                  <span>status</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="365px">{roll}</td>
                <td width="365px" className="np">
                  {degree} {branch}
                </td>
                <td width="365px" className="">
                  {batch}
                </td>
                <td width="365px">
                  {grace === "N/A" ? (
                    <CloseIcon style={{ color: "red" }} />
                  ) : (
                    grace
                  )}
                </td>
                {status === "pending" && (
                  <td width="365px">
                    <AutorenewIcon />{" "}
                    <span className="badge badge-pill badge-warning">
                      Pending
                    </span>
                  </td>
                )}
                {status === "pending" && (
                  <td
                    width="365px"
                    onClick={() => cancelRequest(roll)}
                    className="icon"
                  >
                    <CloseIcon style={{ color: "red" }} />
                    Cancel
                  </td>
                )}
                {status === "accepted" && (
                  <td width="365px">
                    <DoneAllIcon />{" "}
                    <span className="badge badge-pill badge-success">
                      {" "}
                      Accepted
                    </span>
                  </td>
                )}
                {status === "rejected" && (
                  <td width="365px">
                    <CloseIcon style={{ color: "red" }} />
                    <span className="badge badge-pill badge-danger">
                      {" "}
                      rejected
                    </span>
                  </td>
                )}
              </tr>
            </tbody>
          </Table>
          <h2 className="mt-4" style={{ textTransform: "Capitalize" }}>
            <ContactSupportIcon style={{ color: "#2196f3" }} /> Contact Details
          </h2>
          <Table hover responsive className="table table-sm">
            <thead>
              <tr>
                <th>
                  {" "}
                  <EmailIcon /> <span>Email</span>
                </th>
                <th className="hide-sm">
                  <PhoneIcon />
                  <span>Phone Number</span>
                </th>
                <th className="hide-sm np">
                  <HomeIcon /> <span>Address</span>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="365px">{email}</td>
                <td width="365px">+91 {phone}</td>
                <td width="365px" className="np">
                  {address}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
