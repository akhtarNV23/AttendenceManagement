import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const LogOutModal = (props) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
    props.onClose();
  };

  return (
    <Modal open={props.onOpen} onClose={props.onClose} style={{ width: "30%" }}>
      <Modal.Header>
        Logout Attendance Management
        <div
          onClick={props.onClose}
          style={{ float: "right", cursor: "pointer" }}
        >
          <Icon disabled name="close" />
        </div>
      </Modal.Header>
      <Modal.Content>
        <p>Are you sure you want logout your account.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={props.onClose}>
          CANCEL
        </Button>
        <Button color="green" onClick={logOut}>
          LOGOUT
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default LogOutModal;
