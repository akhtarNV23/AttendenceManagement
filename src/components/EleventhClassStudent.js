import React, { Component } from "react";
import { Container, Table, Button } from "semantic-ui-react";
import AddStudentModal from "./AddStudentModal";
import { connect } from "react-redux";
import { fetchStudentList } from "../Redux/Action";
import DeleteStudentModal from "./DeleteStudentModal";

class EleventhClassStudent extends Component {
  state = {
    students: [],
    newStudentName: "",
    newStudentEmail: "",
    isModal: false,
    isDelete: false,
    studentId: null,
  };

  handleAddClick = () => {
    this.setState({ isModal: true });
  };
  handleAddModalClose = () => {
    this.setState({ isModal: false });
  };

  handleDeleteModalClick = (id) => {
    this.setState({ isDelete: true, studentId: id  });
  };
  handleDeleteModalClose = () => {
    this.setState({ isDelete: false });
  };

  // -------- Get All student start ------- //
  componentDidMount() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    fetch(baseUrl + `Students`)
      .then((response) => response.json())
      .then((students) => this.setState({ students }))
      .catch((error) => console.error("Error fetching students:", error));
  }
  // -------- Get All student end ------- //

  toggleAttendance = (id, currentStatus) => {
    const newStatus = !currentStatus;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    fetch(baseUrl + `Students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedStudent) => {
        console.log("Attendance toggled successfully:", updatedStudent);
        this.setState((prevState) => ({
          students: prevState.students.map((student) =>
            student.id === id ? updatedStudent : student
          ),
        }));
        this.props.loaduserdata();
      })
      .catch((error) => {
        console.error("Error toggling attendance:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        }
      });
  };

  // ----- Present Absent API call end -----//

  render() {
    const { isModal, isDelete, studentId } = this.state;
    const { student } = this.props;

    return (
      <div>
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              float: "right",
              marginRight: "100px",
              marginBottom: "20px",
            }}
          >
            <Button
              primary
              style={{ borderRadius: "0" }}
              onClick={this.handleAddClick}
            >
              {" "}
              ADD STUDENT
            </Button>
          </div>
          <AddStudentModal
            onOpen={isModal}
            onClose={this.handleAddModalClose}
          />
          <Container style={{ marginTop: "2em", width:"90%" }}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Student E-mail</Table.HeaderCell>
                  <Table.HeaderCell>Class</Table.HeaderCell>
                  <Table.HeaderCell>Present</Table.HeaderCell>
                  <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {student?.studentlist?.map((student) => (
                <Table.Body>
                  {student.class === 11 ? (
                    <Table.Row key={student?.id}>
                      <Table.Cell>{student?.id}</Table.Cell>
                      <Table.Cell>{student?.name}</Table.Cell>
                      <Table.Cell>{student?.email}</Table.Cell>
                      <Table.Cell>{student?.class}</Table.Cell>
                      <Table.Cell>
                        <Button
                          color={student.present ? "green" : "red"}
                          onClick={() =>
                            this.toggleAttendance(student.id, student.present)
                          }
                        >
                          {student.present ? "Present" : "Absent"}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                      <Button
                          color="red"
                          data={student?.id}
                          onClick={() => this.handleDeleteModalClick(student?.id)}
                        >
                          Delete
                        </Button>
                        <DeleteStudentModal
                          onOpenDelete={isDelete}
                          onCloseDelete={ this.handleDeleteModalClose}
                         data={studentId}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    <div></div>
                  )}
                </Table.Body>
              ))}
            </Table>
          </Container>
        </div>
      </div>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EleventhClassStudent);
