import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Channelling.css";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import backgroundImage from "../assets/background.png";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Channelling = () => {
  const [description, setDescription] = useState("");
  const user = useSelector((state) => state.user);
  const [data, setData] = useState();

  useEffect(() => {
    async function getChannelDetails() {
      const res = await axios.get(`http://localhost:8080/channel/${user._id}`);
      console.log("res::", res);
      setData(res.data);
    }
    getChannelDetails();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let body = {
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      description: description,
    };

    const res = await axios.post(`http://localhost:8080/channel/create`, body);
    console.log("description:::", description);
    setDescription("");
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        height: "fit-content",
      }}
    >
      <div className="title">
        You can add your Skincare/Haircare Problems Here
      </div>
      <div className="sub-title">Doctors will respond to you</div>

      <div className="form-card-container">
        <Form
          style={{ width: "100%", padding: "15px" }}
          onSubmit={handleSubmit}
        >
          {/* {isSuccess && <Alert variant="success">Product created with succcess</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>} */}

          <Form.Group>
            <div className="answer">
              Ask your problem here{" "}
            </div>
            <Form.Control
              as="textarea"
              style={{ height: "fit-content", margin:'20px 0px' }}
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="ask-button" type="submit">
              Ask
            </button>
          </Form.Group>
        </Form>
      </div>
      <div>
        <div className="bottom-title">RECENTLY ADDED QUESTIONS</div>
        
        {data &&
          data.map((channel) => (
        <div className="card-container">
          <Form
            style={{ width: "100%", padding: "15px" }}
            onSubmit={handleSubmit}
          >
            <div className="channeling-details-row">
              <RxAvatar  style={{ fontSize: "25px" }}/>
              <div className="row-name">Name:</div>{channel.userName}
            </div>
            <div className="channeling-details-row">
              <MdOutlineEmail  style={{ fontSize: "25px" }}/>
              <div className="row-name">Email:</div> {channel.userEmail}
            </div>
            <div>
              <div className="que-card">
              {channel.description}{" "}
              </div>
            </div>
                {channel.answer && <div>
                  <div>
                    <b>Answer</b> <i>(Dr. {channel.doctorName})</i>
                  </div>
                  <div className="answer-card">
                    {channel && channel?.answer}{" "}
                  </div>
                </div>}
          </Form>
        </div>
          ))}
      </div>
    </div>
  );
};

export default Channelling;
