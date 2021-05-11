import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PhoneIcon from "@material-ui/icons/Phone";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EventIcon from "@material-ui/icons/Event";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HomeIcon from "@material-ui/icons/Home";
import PublishIcon from "@material-ui/icons/Publish";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import Message from "../../components/Message";
import { Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import "./Admin.css";

const AdminProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");
  const [calcStatus, setCalcStatus] = useState("");
  const [cgpaStatus, setCgpaStatus] = useState("");
  const [graceStatus, setGraceStatus] = useState("");
  const [pending, setPending] = useState("");
  const gracemarkCreate = useSelector((state) => state.gracemarkCreate);
  const { success, error } = gracemarkCreate;

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  useEffect(() => {
    if (!adminInfo) {
      history.push("/");
    }
    axios
      .all([
        axios.get(`/admin/${adminInfo.result.adminID}`),
        axios.get(`/admin/status`),
        axios.get(`/faculty/status/`),
        axios.get(`/student/cgpa/count/`),
        axios.get(`/student/grace/status`),
        axios.get(`/student/pending/count`),
      ])
      .then(
        axios.spread(
          (
            response1,
            response2,
            response3,
            response4,
            response5,
            response6
          ) => {
            console.log(response1);
            setName(response1.data.admin.Name);
            setEmail(response1.data.admin.EmailID);
            setPhone(response1.data.admin.PhoneNum);
            setAddress(response1.data.admin.Address);
            setStatus(response2.data.status);
            setCalcStatus(response3.data.calcStatus);
            setCgpaStatus(response4.data.cgpaStatus);
            setGraceStatus(response5.data.graceStatus);
            setPending(response6.data.pending);
          }
        )
      );
  }, [adminInfo, name, email, address, phone.replace, status, message]);
  console.log(pending);
  console.log(calcStatus, cgpaStatus);

  const publishResult = () => {
    if (calcStatus === "P" && cgpaStatus === "P" && graceStatus === "P") {
      const config = {
        headers: { Authorization: `Bearer ${adminInfo.token}` },
      };
      axios
        .get("/admin/publish/result", config)
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setStatus("Not Published");
      setMessage(
        "Unable to Publish Results now. Mark allocation is yet to be completed"
      );
    }
  };

  const resetPublish = () => {
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };
    axios
      .get("/admin/reset/publish", config)
      .then((response) => {
        setMessage(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("stat", status);
  console.log("msg", message);

  const deleteMyAccount = (id) => {
    if (window.confirm("Do you want to delete this account ?")) {
      axios.delete(`/admin/delete/account/${id}`);
    } else {
      return (window.location.pathname = "/admin/profile");
    }
    localStorage.removeItem("adminInfo");
    window.location.pathname = "/";
  };
  console.log(calcStatus, cgpaStatus, graceStatus);
  return (
    <div
      className="ml-5 mt-3 align-items-center  alllist_div profile_card"
      style={{ backgroundColor: "white" }}
    >
      <div className="card ml-5 px-3 overflow my_card">
        <div className="overflow">
          {status === "Not Published" &&
            message ===
              "Unable to Publish Results now. Mark allocation is yet to be completed" && (
              <Message variant="danger">
                <NotificationsIcon /> Unable to Publish Results now. Grade
                allocation is yet to be completed
              </Message>
            )}
          {status === "Published" && (
            <Message variant="success">
              <NotificationsIcon /> Results published
            </Message>
          )}
          <h1 className="text-success">Admin Profile</h1>
          <p className="lead mt-2">
            <AccountBoxIcon style={{ color: "#2196f3" }} /> Welcome{" "}
            <strong className="text-info"> {name}</strong>
          </p>
          <Row className="mt-4">
            <Col>
              <Link
                to={`/admin/edit/profile/${adminInfo.result.adminID}`}
                style={{ textDecoration: "None" }}
              >
                <EditTwoToneIcon />{" "}
                <Button className="btn btn-sm apply">Edit Profile</Button>
              </Link>
            </Col>
            <Col>
              {status === "Not Published" && (
                <Link onClick={publishResult}>
                  <PublishIcon className="mr-2" />
                  <button
                    className="btn btn-sm btn-info apply"
                    style={{ width: "120px" }}
                  >
                    Publish Results
                  </button>
                </Link>
              )}

              {status === "Published" && (
                <>
                  <PublishIcon className="mr-2" />
                  <button
                    className="btn btn-sm btn-warning mr-5 apply"
                    onClick={publishResult}
                    style={{ width: "120px" }}
                  >
                    Published
                  </button>
                  <CloseIcon
                    className="icon"
                    style={{ color: "red" }}
                    onClick={resetPublish}
                  />
                </>
              )}
            </Col>
            <Col>
              <DeleteForeverIcon
                className="icon"
                onClick={() => deleteMyAccount(adminInfo.result.adminID)}
              />{" "}
              <Button
                className="btn btn-sm btn-danger apply"
                onClick={() => deleteMyAccount(adminInfo.result.adminID)}
              >
                Delete My Account
              </Button>
            </Col>
          </Row>
          <h2 className="mt-4" style={{ textTransform: "Capitalize" }}>
            <PersonIcon style={{ color: "#2196f3" }} /> Admin Details
          </h2>
          <Table hover responsive className="table table-sm">
            <thead>
              <tr>
                <th>
                  <FormatListNumberedIcon />
                  <span>Admin ID</span>
                </th>

                <th>
                  <EventIcon />
                  <span>DOB</span>
                </th>
                <th>
                  <NotificationsIcon />
                  <span>Status</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="365px">ID {adminInfo.result.adminID}</td>
                <td width="365px">{adminInfo.result.DOB.substring(0, 10)}</td>
                {pending > 0 && (
                  <td className="badge badge-warning">{pending} Request</td>
                )}
                {calcStatus === "P" &&
                  cgpaStatus === "N/P" &&
                  pending === 0 && (
                    <td className="badge badge-info">Calculate Cgpa</td>
                  )}
                {calcStatus === "P" &&
                  cgpaStatus === "P" &&
                  graceStatus === "P" &&
                  pending === 0 && (
                    <td className="badge badge-success">completed</td>
                  )}
                {(calcStatus === "N/P" && cgpaStatus === "N/P") ||
                  (graceStatus === "N/P" && pending === 0 && (
                    <td className="badge badge-warning">waiting</td>
                  ))}
                {calcStatus === "N/P" &&
                  cgpaStatus === "N/P" &&
                  graceStatus === "P" &&
                  pending === 0 && (
                    <td className="badge badge-warning">waiting</td>
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
                  <EmailIcon />
                  <span>Email</span>
                </th>
                <th className="hide-sm">
                  <PhoneIcon /> <span>Phone Number</span>
                </th>
                <th className="hide-sm np">
                  <HomeIcon />
                  <span>Address</span>
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

export default AdminProfile;
