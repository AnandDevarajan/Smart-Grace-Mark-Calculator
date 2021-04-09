import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from "@material-ui/icons/Home";
import PublishIcon from "@material-ui/icons/Publish";
import CloseIcon from "@material-ui/icons/Close";
import { Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";

const AdminProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");
  const [value, onChange] = useState(new Date());

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

  const publishResult = () => {
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };
    axios
      .get("/admin/publish/result", config)
      .then((response) => {
        setStatus("Published");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetPublish = () => {
    const config = {
      headers: { Authorization: `Bearer ${adminInfo.token}` },
    };
    axios
      .get("/admin/reset/publish", config)
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("changed", status);

  console.log(message);
  return (
    <div className="ml-5">
      <h3 className="btn  btn-primary">Welcome to Admin Profile</h3>
      <Row className="mt-5">
        <Col md={7} style={{ backgroundColor: "#2B2E4A" }}>
          <ListGroup variant="flush" className="mt-4 ml-2">
            <ListGroup.Item>
              <h4 style={{ textTransform: "capitalize" }}>
                <PersonIcon />
                :&nbsp;&nbsp;&nbsp;
                {name}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: "lowercase" }}>
                <EmailIcon />
                :&nbsp;&nbsp;&nbsp;{email}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>
                <PhoneIcon />
                :&nbsp;&nbsp;&nbsp;
                {phone}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: "capitalize" }}>
                <HomeIcon />
                :&nbsp;&nbsp;&nbsp;{address}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4 style={{ textTransform: "capitalize" }}>
                <PublishIcon />
                :&nbsp;&nbsp;&nbsp;
                {status === "Not Published" && (
                  <button
                    className="btn btn-sm btn-success "
                    onClick={publishResult}
                  >
                    Publish Results
                  </button>
                )}
                {status === "Published" && (
                  <>
                    <button
                      className="btn btn-sm btn-warning mr-5"
                      onClick={publishResult}
                    >
                      Results Published
                    </button>
                    <CloseIcon
                      className="icon"
                      style={{ color: "red" }}
                      onClick={resetPublish}
                    />
                  </>
                )}
              </h4>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col style={{ backgroundColor: "#343f56" }}>
          <div className="mt-4 ml-5 mb-5">
            <Calendar onChange={onChange} value={value} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminProfile;
