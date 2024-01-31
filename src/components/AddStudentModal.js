import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Form, Icon, Modal } from "semantic-ui-react";
import { fetchStudentList } from "../Redux/Action";

class AddStudentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      newStudentName: "",
      newStudentEmail: "",
      newStudentClass: "",
    };
  }

  // ----- Add student start -----//

  handleInputChange = (e) => {
    this.setState({ newStudentName: e.target.value });
  };
  handleEmailChange = (e) => {
    this.setState({ newStudentEmail: e.target.value });
  };
  handleClassChange = (e, data) => {
    const trimmedValue = data.value ? data.value.trim() : '';
    // this.setState({ newStudentClass: e.target.value });
    this.setState({ newStudentClass: trimmedValue });
 
  };

  addStudent = () => {
    const { newStudentName, newStudentEmail, newStudentClass } = this.state;
    if (
      newStudentName.trim() === "" ||
      newStudentEmail.trim() === "" ||
      newStudentClass.trim() === ""
    ) {
      this.setState({ InValidUser: "Please enter a valid student name." });
      return;
    }

    const newStudent = {
      name: newStudentName,
      email: newStudentEmail,
      class: newStudentClass,
      present: false,
    };
    const baseUrl = process.env.REACT_APP_BASE_URL;
    fetch(baseUrl + `Students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((addedStudent) =>
        this.setState((prevState) => {
          const updatedStudents = Array.isArray(prevState.students)
            ? [...prevState.students, addedStudent]
            : [addedStudent];
          return {
            students: updatedStudents,
            newStudentName: "",
            newStudentEmail: "",
            newStudentClass: "",
          };
        })
      )
      .catch((error) => console.error("Error adding student:", error));
    this.props.onClose();
    this.props.loaduserdata();
  };

  componentDidMount() {
    this.props.loaduserdata();
  }

  // ----- Add student end -----//

  render() {
    const options = [
      { key: "9", text: "9th", value: "9" },
      { key: "10", text: "10th", value: "10" },
      { key: "11", text: "11th", value: "11" },
      { key: "12", text: "12th", value: "12" },
    ];
    const { onOpen, onClose } = this.props;
    const { newStudentName, newStudentEmail, InValidUser, newStudentClass } =
      this.state;

    return (
      <>
        <Modal open={onOpen} onClose={onClose} style={{ width: "45%" }}>
          <Modal.Header>
            Add Student
            <div
              onClick={onClose}
              style={{ float: "right", cursor: "pointer" }}
            >
              <Icon disabled name="close" />
            </div>
          </Modal.Header>
          <Modal.Content>
            <p> Please fill the Student details</p>
          </Modal.Content>
          <div style={{ marginBottom: "30px", marginLeft: "20px" }}>
            <Form>
              <Form.Group>
                <Form.Input
                  placeholder="Enter student name..."
                  value={newStudentName}
                  onChange={this.handleInputChange}
                />
                <Form.Input
                  placeholder="Enter student email..."
                  value={newStudentEmail}
                  onChange={this.handleEmailChange}
                />
                <Dropdown
                  placeholder="Select student class..."
                  fluid
                  selection
                  options={options}
                  value={newStudentClass}
                  onChange={this.handleClassChange}
                  style={{ width: '200px' }}
                />
              </Form.Group>
              <div style={{ color: "red" }}> {InValidUser} </div> {""}
            </Form>
          </div>
          <Modal.Actions>
            <Button basic color="red" onClick={onClose}>
              CANCEL
            </Button>
            <Button color="green" inverted onClick={this.addStudent}>
              ADD STUDENT
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loaduserdata: () => dispatch(fetchStudentList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddStudentModal);
